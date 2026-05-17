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
import React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RouteSignIn } from "@/helpers/RouteName.js";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast.js";
import { getEnv } from "@/helpers/getEnv.js";
import GoogleLogin from "@/components/GoogleLogin.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const formSchema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(5, "Password must be at least 5 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/auth/register`,
        {
          method: "POST",
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
      navigate(RouteSignIn);
    } catch (error) {
      showToast(error.message || "Something went wrong.", "error");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
        <h1 className="text-2xl font-bold text-center mb-5">
          Create Your Account!
        </h1>

        <div>
          <GoogleLogin />
          <div className="border-2 border-gray-300 mt-4">
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
              Or continue with
            </span>
          </div>
        </div>

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

            {/* Password */}
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            <div className="mb-3">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>

              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Already have account?</p>
                <Link
                  className="text-blue-500 hover:underline"
                  to={RouteSignIn}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
