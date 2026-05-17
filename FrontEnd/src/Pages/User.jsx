import React, { useEffect, useState } from "react";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import { Card } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import { Trash2, Users, UserCheck, Shield, Calendar, Mail } from "lucide-react";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { motion, AnimatePresence } from "framer-motion";

function User() {
  const [users, setUsers] = useState([]);
  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/user/get-all-user`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  useEffect(() => {
    if (data?.users) {
      setUsers(data.users);
    }
  }, [data]);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    const success = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/backend/user/delete/${id}`,
    );
    if (success) {
      showToast("User deleted successfully");

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      showToast("Failed to delete user", "error");
    }
  };

  const getRoleBadgeColor = (role) => {
    const r = role?.toLowerCase();
    if (r === "admin") return "bg-red-50 text-red-600 border-red-100";
    if (r === "editor") return "bg-orange-50 text-orange-600 border-orange-100";
    if (r === "author") return "bg-blue-50 text-blue-600 border-blue-100";
    return "bg-emerald-50 text-emerald-600 border-emerald-100";
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-6 py-10 ">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:px-0 px-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">
            <UserCheck className="w-4 h-4" />
            User Management
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900">
            Users & Roles
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Total Users:
            <span className="font-bold text-slate-900 ml-1">
              {users.length}
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white border rounded-2xl px-5 py-3 text-center shadow-sm min-w-[100px]">
            <p className="text-[10px] uppercase font-bold text-gray-400">
              Users
            </p>

            <h3 className="text-xl font-bold text-slate-900">{users.length}</h3>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-3 text-center shadow-sm min-w-[100px]">
            <p className="text-[10px] uppercase font-bold text-indigo-400">
              Staff
            </p>

            <h3 className="text-xl font-bold text-indigo-600">
              {users.filter((u) => u.role !== "user").length}
            </h3>
          </div>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <Card className="hidden lg:block overflow-hidden lg:px-10">
        {/* HEADER */}
        <div className="grid grid-cols-[80px_1.2fr_1.5fr_1fr_1fr_80px] px-6 py-4 bg-gray-50 border-b text-xs font-bold uppercase text-gray-500">
          <div>Avatar</div>
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Date</div>
          <div>Action</div>
        </div>

        {/* BODY */}
        <div>
          <AnimatePresence>
            {users.length > 0 ? (
              users.map((user) => (
                <motion.div
                  key={user.id}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-[80px_1.2fr_1.5fr_1fr_1fr_80px] px-6 py-5 border-b items-center hover:bg-gray-50 transition"
                >
                  {/* AVATAR */}
                  <div>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-2xl object-cover border shadow-sm"
                    />
                  </div>

                  {/* NAME */}
                  <div className="font-bold text-slate-900 truncate pr-3">
                    {user.name}
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 truncate pr-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {user.email}
                  </div>

                  {/* ROLE */}
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase border ${getRoleBadgeColor(
                        user.role,
                      )}`}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role}
                    </span>
                  </div>

                  {/* DATE */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>

                  {/* DELETE */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 rounded-xl border hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-16 text-center text-gray-400">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
                No Users Found
              </div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* MOBILE CARDS */}
      <div className="grid grid-cols-1 gap-4 lg:hidden px-6">
        <AnimatePresence>
          {users.length > 0 ? (
            users.map((user) => (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="p-5 space-y-5 shadow-sm">
                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-14 h-14 rounded-2xl object-cover border shadow-sm shrink-0"
                      />

                      <div className="min-w-0">
                        <h2 className="font-bold text-slate-900 truncate">
                          {user.name}
                        </h2>

                        <p className="text-xs text-gray-500 truncate mt-1 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 rounded-xl border hover:bg-red-50 hover:text-red-600 transition shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* BOTTOM */}
                  <div className="flex items-center justify-between gap-3 border-t pt-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase border ${getRoleBadgeColor(
                        user.role,
                      )}`}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role}
                    </span>

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="p-12 text-center text-gray-400">
              No Users Found
            </Card>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default User;
