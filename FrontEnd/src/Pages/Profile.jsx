import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEnv } from "@/helpers/getEnv.js";
import { showToast } from "@/helpers/showToast";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaCamera } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteProfile } from "@/helpers/RouteName";
import { Card, CardContent } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/user/user.slice";

const Profile = () => {
  const [filePreview, setPreview] = useState();
  const [file, setfile] = useState();
  const { user } = useSelector((state) => state.user);

  const userId = user?.id;

  const {
    data: data,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/user/get-user/${userId}`,
    {
      method: "get",
      credentials: "include",
    },
    [userId],
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string(),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (data && data.success) {
      form.reset({
        name: data.user.name || "",
        email: data.user.email || "",
        bio: data.user.bio || "",
      });
    }
  }, [data, form]);

  // handler
  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(values));
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/user/update-user/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        },
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        return showToast(data.message || "Login failed!", "error");
      }
      showToast(data.message || "Login successful!", "success");
      dispatch(setUser(data.user));
      // navigate(RouteIndex);
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

  //loading
  if (loading) return <Loading />;
  return (
    <Card className="max-w-screen-md mx-auto mb-10">
      <CardContent>
        <div className="flex justify-center items-center my-5">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-24 h-24 z-99 group relative">
                  <AvatarImage
                    src={
                      filePreview
                        ? filePreview
                        : data?.user?.avatar || "https://github.com/shadcn.png"
                    }
                  />
                  <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black/20 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer">
                    <FaCamera className="text-blue-500" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your bio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <input placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
