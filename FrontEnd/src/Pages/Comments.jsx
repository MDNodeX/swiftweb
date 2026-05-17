// import { Button } from "@/components/ui/button";
// import { deleteData } from "@/helpers/handleDelete";
// import { showToast } from "@/helpers/showToast";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useFetch } from "@/hooks/useFetch";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { getEnv } from "@/helpers/getEnv";
// import Loading from "@/components/Loading";

// function Comments() {
//   const [comments, setComments] = useState([]);
//   const { data, loading } = useFetch(
//     `${getEnv("VITE_API_BASE_URL")}/backend/comment/get-all-comment`,
//     {
//       method: "GET",
//       credentials: "include",
//     },
//   );

//   useEffect(() => {
//     if (data?.comments) {
//       setComments(data.comments);
//     }
//   }, [data]);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this comment?",
//     );

//     if (!confirmDelete) return;

//     const success = await deleteData(
//       `${getEnv("VITE_API_BASE_URL")}/backend/comment/delete/${id}`,
//     );

//     if (success) {
//       showToast("Comment deleted successfully");

//       setComments((prev) => prev.filter((c) => c.id !== id));
//     } else {
//       showToast("error", "Failed to delete comment");
//     }
//   };

//   if (loading) return <Loading />;

//   return (
//     <div>
//       <Card>
//         <CardHeader></CardHeader>

//         <CardContent>
//           <Table>
//             <TableCaption>All Blog Comments</TableCaption>

//             <TableHeader>
//               <TableRow>
//                 <TableHead>Blog</TableHead>
//                 <TableHead>Comment By</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Comment</TableHead>
//                 <TableHead>Action</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {data?.comments?.length > 0 ? (
//                 comments.map((comment) => (
//                   <TableRow key={comment.id}>
//                     <TableCell>{comment.blog_title}</TableCell>

//                     <TableCell>{comment.user_name}</TableCell>

//                     <TableCell>
//                       {new Date(comment.created_at).toLocaleDateString()}
//                     </TableCell>

//                     <TableCell>{comment.content}</TableCell>

//                     <TableCell className="flex gap-2">
//                       <Button
//                         onClick={() => handleDelete(comment.id)}
//                         variant="outline"
//                         className="hover:bg-red-500 hover:text-white"
//                       >
//                         <RiDeleteBin5Line />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan="5">No Comments Found</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Comments;

import React, { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { Card } from "@/components/ui/card";
import { Trash2, MessageSquare, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Comments() {
  const [comments, setComments] = useState([]);

  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/comment/get-all-comment`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  useEffect(() => {
    if (data?.comments) {
      setComments(data.comments);
    }
  }, [data]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?",
    );
    if (!confirmDelete) return;

    const success = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/backend/comment/delete/${id}`,
    );

    if (success) {
      showToast("Comment deleted successfully");
      setComments((prev) => prev.filter((c) => c.id !== id));
    } else {
      showToast("Failed to delete comment", "error");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 py-8 ">
      {/* HEADER */}
      <div className="space-y-1 lg:px-10 px-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
          <MessageSquare className="w-4 h-4" />
          Comments Hub
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900">
          Comments & Discussions
        </h1>

        <p className="text-sm text-gray-500">
          Total comments:
          <span className="font-bold text-slate-900 ml-1">
            {comments.length}
          </span>
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <Card className="hidden lg:block overflow-hidden lg:px-10">
        {/* TABLE HEADER */}
        <div className="grid grid-cols-[2fr_1fr_1fr_3fr_80px] px-6 py-3 bg-gray-50 border-b text-xs font-bold text-gray-500 uppercase">
          <div>Blog</div>
          <div>User</div>
          <div>Date</div>
          <div>Comment</div>
          <div>Action</div>
        </div>

        {/* TABLE BODY */}
        <div className="max-h-[500px] overflow-auto">
          <AnimatePresence>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="grid grid-cols-[2fr_1fr_1fr_3fr_80px] px-6 py-4 border-b items-center hover:bg-gray-50 transition"
                >
                  <div className="truncate font-medium text-slate-700">
                    {comment.blog_title}
                  </div>

                  <div className="font-semibold text-slate-900">
                    {comment.user_name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </div>

                  <div className="text-sm text-gray-600 italic truncate">
                    {comment.content}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-2 rounded border hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-400">
                No comments found
              </div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* MOBILE CARDS */}
      <div className="grid grid-cols-1 gap-4 lg:hidden px-6">
        <AnimatePresence>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <motion.div
                key={comment.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="p-4 space-y-4 shadow-sm">
                  {/* TOP */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <h2 className="font-bold text-slate-900 truncate">
                        {comment.blog_title}
                      </h2>

                      <p className="text-xs text-gray-500 mt-1">
                        by {comment.user_name}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-2 rounded-lg border hover:bg-red-50 hover:text-red-600 transition shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* COMMENT */}
                  <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700 italic leading-relaxed">
                    {comment.content}
                  </div>

                  {/* DATE */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(comment.created_at).toLocaleDateString()}
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="p-10 text-center text-gray-400">
              No comments found
            </Card>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Comments;
