import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";
import { MdCalendarMonth } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

const BlogCard = ({ props: blog }) => {
  return (
    <Link to={RouteBlogDetails(blog.id)}>
      <Card className="pt-5">
        <CardContent>
          {/* Author Info and Admin Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={blog.author_avatar || "../assets/images/user.png"}
                  alt={blog.author_name}
                />
              </Avatar>
              <div className="flex flex-col text-sm">
                <span className="font-medium">{blog.author_name}</span>
                <span className="text-gray-500">
                  {moment(blog.created_at).fromNow()}
                </span>
              </div>
            </div>

            {blog.author_role === "admin" && (
              <Badge variant="outline" className="bg-violet-500">
                Admin
              </Badge>
            )}
          </div>

          {/* Featured Image */}
          {blog.featured_image && (
            <div className="flex justify-center w-full my-4">
              <img
                className="rounded max-w-full h-auto"
                src={blog.featured_image}
                alt={blog.title}
              />
            </div>
          )}

          {/* Blog Title and Date */}
          <div className="mt-4">
            <p className="flex items-center gap-2 mb-2 text-sm text-gray-500">
              <MdCalendarMonth />
              <span>{moment(blog.created_at).format("DD-MM-YYYY")}</span>
            </p>
            <h2 className="text-2xl font-bold line-clamp-2">{blog.title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
