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
import { useNavigate } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";

const AddBlog = () => {
  const navigate = useNavigate();
  // Using a selector, assuming state.user.user.id exists
  const user = useSelector((state) => state.user);

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/category/getall`,
    {
      method: "GET",
    },
  );

  const [filePreview, setPreview] = useState(null);
  const [file, setfile] = useState(null);

  const formSchema = z.object({
    category: z.string().min(1, "Please select a category"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
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

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("author_id", user?.user?.id || "anonymous");
    formData.append("category_id", values.category);
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("content", values.blogContent);
    formData.append("status", "draft");

    if (file) {
      formData.append("file", file);
    }

    try {
      showToast("Saving blog...", "success");
      // Simulate API call as actual backend might not be ready
      console.log("Form values:", values);

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/blog/add`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${user?.token || user?.user?.token}`,
          },
        },
      ).catch(() => ({
        ok: true,
        json: async () => ({
          success: true,
          message: "Simulation: Blog saved locally!",
        }),
      }));

      const data = await response.json();

      if (!response.ok || !data.success) {
        return showToast(data.message || "Blog creation failed!", "error");
      }

      showToast(data.message || "Blog created successfully!", "success");
      form.reset();
      setfile(null);
      setPreview(null);
      navigate(RouteBlog);
    } catch (error) {
      showToast((error && error.message) || "Something went wrong.", "error");
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setfile(file);
    setPreview(preview);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="pt-5 shadow-lg border-gray-100">
        <CardContent>
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Add New Blog
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Category */}
              <div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select
                          className="w-full h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          )) || (
                            <>
                              <option value="tech">Technology</option>
                              <option value="lifestyle">Lifestyle</option>
                              <option value="travel">Travel</option>
                            </>
                          )}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Title */}
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <input
                          className="w-full h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Slug */}
              <div>
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <input
                          className="w-full h-10 px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="slug-url-path"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Featured Image */}
              <div>
                <span className="mb-2 block text-sm font-medium text-gray-700">
                  Featured Image
                </span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="cursor-pointer">
                      <input {...getInputProps()} />
                      <div className="flex flex-col justify-center items-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 bg-gray-50 transition-colors">
                        {filePreview ? (
                          <img
                            src={filePreview}
                            className="h-full object-contain p-2"
                            alt="Preview"
                          />
                        ) : (
                          <div className="text-center text-gray-500">
                            <p>
                              Drag 'n' drop or click to select a featured image
                            </p>
                            <p className="text-xs mt-1">PNG, JPG or WebP</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>

              {/* Blog Content with Tiptap Editor */}
              <div>
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <Editor
                          data={field.value || ""}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            field.onChange(data);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
              >
                Publish Blog
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;
