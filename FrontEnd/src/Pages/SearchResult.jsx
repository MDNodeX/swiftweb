import BlogCard from "@/components/BlogCard";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const { data: blogData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/blog/search?q=${q}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <section className="px-10 py-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-2xl font-bold border-b text-violet-500 pb-3 mb-5">
          <h2>Search Result For : {q}</h2>
        </div>

        <div className="grid grid-cols-3 gap-10">
          {blogData?.data?.length > 0 ? (
            blogData.data.map((blog) => <BlogCard key={blog.id} props={blog} />)
          ) : (
            <div>No results found.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResult;
