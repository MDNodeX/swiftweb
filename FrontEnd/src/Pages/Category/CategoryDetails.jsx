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
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { Plus, Tag, Layers, ArrowRight, Edit2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CategoryDetails = () => {
  const [categories, setCategories] = useState([]);

  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/category/getall`,
    {
      method: "GET",
      credentials: "include",
    },
    [],
  );

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
    }
  }, [data]);

  const handleDelete = async (id) => {
    const success = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/backend/category/delete/${id}`,
    );

    if (success) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      showToast("success", "Category deleted successfully");
    } else {
      showToast("error", "Failed to delete category");
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
                  Taxonomy Manager
                </span>

                <h1 className="mt-2 text-2xl font-bold text-slate-900">
                  Category Details
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Organize and manage your blog categories
                </p>
              </div>

              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link to={RouteAddCategory} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Category
                </Link>
              </Button>
            </CardHeader>
          </Card>

          {/* Stats */}
          <Card className="border border-slate-200 shadow-sm xl:col-span-1">
            <CardContent className="p-6">
              <span className="text-[10px] font-bold uppercase tracking-[3px] text-slate-400">
                Total Categories
              </span>

              <h2 className="mt-3 text-4xl font-bold text-slate-800">
                {categories.length}
              </h2>

              <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
                <span>Active Structure</span>

                <span className="font-bold text-indigo-500">92%</span>
              </div>
            </CardContent>
          </Card>

          {/* Categories Table */}
          <Card className="overflow-hidden border border-slate-200 shadow-sm xl:col-span-3">
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-semibold text-slate-500">
                      Category
                    </TableHead>

                    <TableHead className="font-semibold text-slate-500">
                      Slug
                    </TableHead>

                    <TableHead className="text-right font-semibold text-slate-500">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <AnimatePresence>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <motion.tr
                          key={category.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b border-slate-100 hover:bg-slate-50/50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                                <Tag className="h-4 w-4 text-indigo-600" />
                              </div>

                              <span className="font-medium text-slate-700">
                                {category.name}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-500">
                              {category.slug}
                            </code>
                          </TableCell>

                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="hover:bg-indigo-50 hover:text-indigo-600"
                              >
                                <Link to={RouteEditCategory(category.id)}>
                                  <Edit2 className="h-4 w-4" />
                                </Link>
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(category.id)}
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
                          colSpan={3}
                          className="h-32 text-center text-slate-400"
                        >
                          No categories found
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
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                          <Tag className="h-5 w-5 text-indigo-600" />
                        </div>

                        <div>
                          <h2 className="font-bold text-slate-800">
                            {category.name}
                          </h2>

                          <p className="mt-1 text-xs text-slate-400">
                            /{category.slug}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="text-xs"
                        >
                          <Link to={RouteEditCategory(category.id)}>Edit</Link>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                          className="text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          Delete
                        </Button>
                      </div>
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
                Usage Metrics
              </span>

              <div className="mt-6 flex h-32 items-center justify-center rounded-2xl bg-slate-50">
                <Layers className="h-12 w-12 text-slate-300" />
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-500">
                Well-structured categories improve SEO and make navigation
                easier for readers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CategoryDetails;
