import { AvatarImage, Avatar } from "@/components/ui/avatar";
import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div className="mt-4">
      <h4 className="text-2xl font-bold">{comments?.length || 0} Comments</h4>

      <div className="mt-5 space-y-4">
        {comments?.length > 0 ? (
          comments.map((comment, index) => {
            if (!comment) return null;

            return (
              <div key={comment.id || index} className="flex gap-4 items-start">
                <Avatar>
                  <AvatarImage
                    src={comment?.user_avatar || "../assets/images/user.png"}
                    alt={comment?.user_name || "Anonymous"}
                  />
                </Avatar>

                <div>
                  <p className="font-semibold">
                    {comment?.user_name || "Anonymous"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {comment?.created_at
                      ? new Date(comment.created_at).toLocaleString()
                      : ""}
                  </p>

                  <div className="pt-1">{comment?.content}</div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentList;
