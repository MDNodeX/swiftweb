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
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { Link, useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";
// import { Input } from "@/components/ui/input";

//validation
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string(),
    password: z.string().min(4, "password must be at list 4 charecter"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //handler
  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/backend/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        return showToast(data.message || "Login failed!", "error");
      }
      showToast(data.message || "Login successful!", "success");
      dispatch(setUser(data.user));
      navigate(RouteIndex);
    } catch (error) {
      showToast(error.message || "Something went wrong.", "error");
    }
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w[400px] p-5">
        <h1 className="text-2xl font-blod text-center mb-5">
          Login In Your Account
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
                Sign In
              </Button>
              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Don&apos;t have account?</p>
                <Link
                  className="text-blue-500 hover:underline"
                  to={RouteSignUp}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
