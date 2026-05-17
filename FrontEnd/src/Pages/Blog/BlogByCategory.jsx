import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import React from "react";
import { useParams } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";

const BlogByCategory = () => {
  const { slug } = useParams();

  const { data: blogData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/blog/get-blog-by-category/${slug}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  if (loading) return <Loading />;

  return (
    <>
      <section className="lg:px-0 px-6 py-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-2xl font-bold border-b text-violet-500 pb-3 mb-5">
          <BiSolidCategoryAlt />
          <h2>{blogData?.category?.name}</h2>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {blogData?.data?.length > 0 ? (
            blogData.data.map((blog) => <BlogCard key={blog.id} props={blog} />)
          ) : (
            <div>Data Not Found!</div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogByCategory;
