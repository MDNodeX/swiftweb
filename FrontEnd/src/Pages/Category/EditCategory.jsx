import React, { useEffect } from "react";
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
import { useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";

const EditCategory = () => {
  const { category_id } = useParams();
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/category/show/${category_id}`,
    {
      method: "get",
      credentials: "include",
    },
    [category_id],
  );

  // if (loading) return <Loading />;
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    slug: z.string().min(3, "slug must be at least 3 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  const categoryName = form.watch("name");

  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue("slug", slug);
    }
  }, [categoryName]);

  useEffect(() => {
    if (data) {
      form.setValue("name", data.category.name);
      form.setValue("slug", data.category.slug);
    }
  }, [data]);

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/category/update/${category_id}`,
        {
          method: "put",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast(data.message || "Registration failed!", "error");
      }
      showToast(data.message || "Registration successful!", "success");
    } catch (error) {
      showToast(error.message || "Something went wrong.", "error");
    }
  }
  return (
    <div>
      <Card className="pt-5 max-w-screen-md mx-auto">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <input placeholder="Enter your name" {...field} />
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

export default EditCategory;
