import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";
import Loading from "@/components/Loading";

const EditBlog = () => {
  const { blogid } = useParams();

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { data } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/category/getall`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const { data: blogData, loading: blogLoading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/blog/getall`,
    {
      method: "GET",
      credentials: "include",
    },
    [blogid],
  );

  const [filePreview, setPreview] = useState();
  const [file, setfile] = useState();
  const formSchema = z.object({
    category: z.string().nonempty("Please select a category"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "slug must be at least 3 characters"),
    blogContent: z
      .string()
      .min(3, "Blog Content must be at least 3 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const blogTitle = form.watch("title");

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle, form]);

  useEffect(() => {
    if (blogData?.data?.length) {
      const blog = blogData.data[0]; // get the first blog from the array

      form.setValue("category", blog.category_id);
      form.setValue("title", blog.title);
      form.setValue("slug", blog.slug);
      form.setValue("blogContent", blog.content);
      setPreview(blog.featured_image);
    }
  }, [blogData, form]);
  // handler
  async function onSubmit(values) {
    const formData = new FormData();

    // Add the file only if it exists
    if (file) formData.append("file", file);

    // Add each field individually
    formData.append("author_id", user.user.id);
    formData.append("category_id", values.category);
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("content", values.blogContent);
    formData.append("status", "draft"); // or whatever status you want

    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/blog/update/${blogid}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        return showToast(data.message || "Blog update failed!", "error");
      }

      showToast(data.message || "Blog updated successfully!", "success");
      form.reset();
      setfile(null);
      setPreview(null);
      navigate(RouteBlog);
    } catch (error) {
      showToast(error.message || "Something went wrong.", "error");
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setfile(file);
    setPreview(preview);
  };

  if (blogLoading) return <Loading />;
  return (
    <div>
      <Card className="pt-5">
        <CardContent>
          <h1 className="text-2xl font-blod mb-4">Edit Blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* category */}
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Category
                          </option>

                          {data?.categories?.map((category) => (
                            <option
                              key={category.category_id || category.id}
                              value={category.category_id || category.id}
                            >
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Name */}
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <input placeholder="Enter your title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <input placeholder="Enter your Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* featured image */}
              <div className="mb-3">
                <span className="mb-2 block">Featured Image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center w-36 h-26 border-2 border-dashed rounded">
                        <img src={filePreview} />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              {/* classic editor */}
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      {/* <Editor
                        initialData={field.value}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          form.setValue("blogContent", data);
                          field.onChange(data); // ✅ Update form
                        }}
                      /> */}
                      <Editor
                        initialData={field.value}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          form.setValue("blogContent", data); // important
                          field.onChange(data);
                        }}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlog;
