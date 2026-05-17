import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import Comment from "@/components/Comment";
import CommentList from "@/components/CommentList";
import moment from "moment";
import CommentCount from "@/components/CommentCount";
import LikeCount from "@/components/LikeCount";
import RelatedBlog from "@/components/RelatedBlog";

const SingleBlogDetails = () => {
  const { id } = useParams();

  // const userId = "user_id";

  const [comments, setComments] = useState([]);

  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/blog/getsingleblog/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const categoryId = data?.data?.category_id;

  console.log("category", categoryId);

  // fetch comments only once
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/backend/comment/get/${id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await res.json();
        setComments(data.comments || []);
      } catch (error) {
        console.error(error);
      }
    };

    getComments();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="md:flex-nowrap flex-wrap flex justify-between gap-10 w-full max-w-7xl mx-auto space-y-6 lg:px-0 md:px-10 px-6 py-10 ">
      {data?.data && (
        <>
          <div className="border rounded lg:w-[70%] p-4">
            <h2 className="text-2xl font-bold mb-4">{data.data.title}</h2>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={data.data.author_avatar} />
                </Avatar>
                <div>
                  <p>{data.data.author_name}</p>
                  <p>
                    Date: {moment(data.data.created_at).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <LikeCount blogId={data.data.id} />
                {/* userId={userId} */}
                <CommentCount blogId={data.data.id} />
              </div>
            </div>

            <div className="my-4">
              <img className="rounded" src={data.data.featured_image} alt="" />
            </div>

            <div
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: data.data.content }}
            />

            <div className="border-t mt-4 pt-4">
              <Comment
                blogId={data.data.id}
                comments={comments}
                setComments={setComments}
              />
            </div>

            <div className="border-t mt-4 pt-4">
              <CommentList comments={comments} />
            </div>
          </div>
        </>
      )}

      <div className="border rounded lg:w-[30%] w-full p-4">
        <RelatedBlog categoryId={categoryId} />
      </div>
    </div>
  );
};

export default SingleBlogDetails;
