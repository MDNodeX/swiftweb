import { FaComments } from "react-icons/fa";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { Button } from "./ui/button";
import { RouteSignIn } from "@/helpers/RouteName";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Comment = ({ blogId, comments, setComments }) => {
  const user = useSelector((state) => state.user);

  const formSchema = z.object({
    content: z.string().min(3, "Comment must be at least 3 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "" },
  });

  async function onSubmit(values) {
    const newValues = {
      content: values.content,
      blog_id: blogId,
      user_id: user?.user?.id,
    };

    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/comment/add`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newValues),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return showToast(data.message || "Failed to add comment!", "error");
      }

      form.reset();

      const newComment = {
        id: data?.Comment?.id || Date.now(),
        content: values.content,
        user_name: user?.user?.name,
        user_avatar: user?.user?.avatar,
        created_at: new Date().toISOString(),
      };

      setComments((prev) => [newComment, ...prev]);

      showToast(data.message || "Comment added successfully!", "success");
    } catch (error) {
      showToast(error.message || "Something went wrong.", "error");
    }
  }

  return (
    <div>
      <h4 className="flex items-center gap-2">
        <FaComments className="text-violet-500" /> Comment
      </h4>

      {user && user.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <textarea
                      className="border p-2 w-full rounded"
                      placeholder="Type your comment..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      ) : (
        <Button asChild>
          <Link to={RouteSignIn}>Please log in to comment</Link>
        </Button>
      )}
    </div>
  );
};

export default Comment;
