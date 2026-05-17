import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Link } from "react-router-dom";
import { RouteBlogAdd, RouteBlogEdit } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import moment from "moment";
import { motion, AnimatePresence } from "motion/react";
const BlogDetails = () => {
  const [blogs, setBlogs] = useState([]);
  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/blog/getall`,
    {
      method: "GET",
      credentials: "include",
    },
    [],
  );

  useEffect(() => {
    if (data?.data) {
      setBlogs(data.data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    const success = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/backend/blog/delete/${id}`,
    );

    if (success) {
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));

      showToast("success", "Blog deleted successfully");
    } else {
      showToast("error", "Failed to delete blog");
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          {/* Header */}
          <Card className="border border-slate-200 shadow-sm xl:col-span-3">
            <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[3px] text-slate-400">
                  Management Console
                </span>

                <h1 className="mt-2 text-2xl font-bold text-slate-900">
                  Blog Details
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Showing {blogs.length} published articles
                </p>
              </div>

              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link to={RouteBlogAdd} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Blog
                </Link>
              </Button>
            </CardHeader>
          </Card>

          {/* Stats */}
          <Card className="border border-slate-200 shadow-sm xl:col-span-1">
            <CardContent className="p-6">
              <span className="text-[10px] font-bold uppercase tracking-[3px] text-slate-400">
                Published Blogs
              </span>

              <h2 className="mt-3 text-4xl font-bold text-slate-800">
                {blogs.length}
              </h2>

              <div className="mt-5 h-2 w-full rounded-full bg-slate-100">
                <div className="h-full w-[80%] rounded-full bg-indigo-500" />
              </div>
            </CardContent>
          </Card>

          {/* Table Section */}
          <Card className="overflow-hidden border border-slate-200 shadow-sm xl:col-span-3">
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-semibold text-slate-500">
                      Author
                    </TableHead>

                    <TableHead className="font-semibold text-slate-500">
                      Category
                    </TableHead>

                    <TableHead className="font-semibold text-slate-500">
                      Title
                    </TableHead>

                    <TableHead className="font-semibold text-slate-500">
                      Slug
                    </TableHead>

                    <TableHead className="font-semibold text-slate-500">
                      Date
                    </TableHead>

                    <TableHead className="text-right font-semibold text-slate-500">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <AnimatePresence>
                    {blogs.length > 0 ? (
                      blogs.map((blog) => (
                        <motion.tr
                          key={blog.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b border-slate-100 hover:bg-slate-50/50"
                        >
                          <TableCell className="font-medium text-slate-700">
                            {blog.author_name}
                          </TableCell>

                          <TableCell>
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                              {blog.category_name}
                            </span>
                          </TableCell>

                          <TableCell className="max-w-[250px] truncate">
                            {blog.title}
                          </TableCell>

                          <TableCell className="max-w-[200px] truncate text-slate-500">
                            {blog.slug}
                          </TableCell>

                          <TableCell className="text-slate-500">
                            {moment(blog.created_at).format("DD-MM-YYYY")}
                          </TableCell>

                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="hover:bg-indigo-50 hover:text-indigo-600"
                              >
                                <Link to={RouteBlogEdit(blog.id)}>
                                  <Edit2 className="h-4 w-4" />
                                </Link>
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(blog.id)}
                                className="hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-32 text-center text-slate-400"
                        >
                          No blogs found
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
              <AnimatePresence>
                {blogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase text-indigo-700">
                        {blog.category_name}
                      </span>

                      <span className="text-xs text-slate-400">
                        {moment(blog.created_at).format("DD-MM-YYYY")}
                      </span>
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-slate-800">
                      {blog.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      {blog.author_name}
                    </p>

                    <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <Link
                          to={RouteBlogEdit(blog.id)}
                          className="flex items-center justify-center gap-2"
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
                        className="flex-1 text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>

          {/* Sidebar */}
          <Card className="border border-slate-200 shadow-sm xl:col-span-1">
            <CardContent className="p-6">
              <span className="text-[10px] font-bold uppercase tracking-[3px] text-slate-400">
                Top Categories
              </span>

              <div className="mt-5 space-y-4">
                {["Technology", "Design", "Engineering", "Business"].map(
                  (cat) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-slate-600">{cat}</span>

                      <span className="font-bold text-slate-800">
                        {Math.floor(Math.random() * 50)}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
