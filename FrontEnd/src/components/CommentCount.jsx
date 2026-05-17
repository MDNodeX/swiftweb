import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { FaCommentDots } from "react-icons/fa";
import { Button } from "./ui/button";

const CommentCount = ({ blogId }) => {
  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/comment/get-count/${blogId}`,
    {
      method: "GET",
      credentials: "include",
    },
    [blogId],
  );

  if (loading) return <span>0</span>;

  return (
    <button type="button" className="flex justify-between items-center gap-1">
      <FaCommentDots />
      {data?.count ?? 0}
    </button>
  );
};

export default CommentCount;
