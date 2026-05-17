import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const LikeCount = ({ blogId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.user);
  const userId = isLoggedIn ? user.id : "";

  const { data: blogLikeCount } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/blog-like/get-like/${blogId}/${userId}`,
    { method: "GET", credentials: "include" },
    [blogId, userId],
  );

  useEffect(() => {
    if (blogLikeCount) {
      setLikeCount(blogLikeCount.likeCount);
      setHasLiked(blogLikeCount.isUserLiked);
    }
  }, [blogLikeCount]);

  const handleLike = async () => {
    try {
      if (!isLoggedIn) return showToast("error", "Please login first");

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/blog-like/toggle`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ blog_id: blogId, user_id: userId }),
        },
      );

      const data = await response.json();

      if (!response.ok)
        return showToast("error", data.message || "Something went wrong");

      setLikeCount(data.likeCount);
      setHasLiked(data.isUserLiked);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <button
      onClick={handleLike}
      type="button"
      className="flex items-center gap-1"
    >
      {!hasLiked ? <FaRegHeart /> : <FaHeart color="red" />}
      {likeCount}
    </button>
  );
};

export default LikeCount;
