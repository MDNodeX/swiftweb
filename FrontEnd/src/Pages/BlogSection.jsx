import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import BlogCard from "@/components/BlogCard";
import { useFetch } from "@/hooks/useFetch";

export default function BlogSection() {
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/backend/blog/blogs`, {
    method: "GET",
    credentials: "include",
  });
  if (loading) return <Loading />;
  return (
    <>
      {/* <section
        className="relative w-full py-20 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `
                    linear-gradient(rgba(18, 63, 100, 0.7), rgba(0, 20, 73, 0.7)), url(${aboutpagehead})`,
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-black text-white flex items-center justify-center gap-2">
            Our Previous<div className="text-[#c8102e]">Projects</div>
          </h1>
          <p className="text-white/80 mt-4 text-lg">
            Build modern and scalable websites for your business.
          </p>
        </div>
      </section> */}
      {/* blog section */}
      <section className="w-full bg-[#003057] py-20">
        <h1 className="lg:text-4xl text-3xl font-extrabold text-white text-center flex items-center justify-center gap-2">
          Our Latest
          <div className="text-[#c8102e]">Blog</div>
        </h1>
        <p className="text-lg text-center md:text-1xl text-white lg:w-[500px] px-10 mx-auto mt-5">
          You don't have to struggle alone, you've got our assistance and help.
          It's just not a service, it's a relationship...
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 lg:px-20 px-5 lg:py-10 px-5 my-10">
          {blogData?.data?.length > 0 ? (
            blogData.data.map((blog) => <BlogCard key={blog.id} props={blog} />)
          ) : (
            <div>Data Not Found!</div>
          )}
        </div>
      </section>
    </>
  );
}
