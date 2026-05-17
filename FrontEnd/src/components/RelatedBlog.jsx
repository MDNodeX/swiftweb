// import { getEnv } from "@/helpers/getEnv";
// import { useFetch } from "@/hooks/useFetch";
// import React from "react";

// const RelatedBlog = ({ categoryId }) => {
//   const { data, loading } = useFetch(
//     `${getEnv("VITE_API_BASE_URL")}/backend/blog/get-related-blog/${categoryId}`,
//     {
//       method: "GET",
//       credentials: "include",
//     },
//   );

//   console.log(data);

//   return (
//     <div>
//       <h2 className="text-2xl font-blod">Related Blogs</h2>
//       <div className="flex items-center gap-2">
//         <img src="" alt="" />
//         <h4></h4>
//       </div>
//     </div>
//   );
// };

// export default RelatedBlog;

import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Link } from "react-router-dom";

const RelatedBlog = ({ categoryId }) => {
  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/blog/get-related-blog/${categoryId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold border-b pb-2">Related Blogs</h2>

      {data?.data?.map((blog) => (
        <Link
          to={`/blog/${blog.id}`}
          key={blog.id}
          className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded"
        >
          <img
            src={blog.featured_image}
            className="w-15 h-13 object-cover rounded"
          />
          <h4 className="text-sm font-bold">{blog.title}</h4>
        </Link>
      ))}
    </div>
  );
};

export default RelatedBlog;
