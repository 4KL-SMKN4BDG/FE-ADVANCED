import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Search,
  ChevronLeft,
  Loader2,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { listed } from "@/constant/listed";
import useAuthStore from "@/store/auth.store";
import userStore from "@/store/user.store";

const Guru = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { listUser, pagination, showAll, deleteUser, isLoading } = userStore();
  const { user: currentUser } = useAuthStore();
  const [theme, setTheme] = useState<"lofi" | "night">("night"); // Default Dark Mode

  const role = searchParams.get("role") === "teacher" ? "teacher" : "student";
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const isNight = theme === "night";
  const isAdmin = currentUser?.roles?.[0]?.code === "ADMIN";

  const safeListUser = listUser ?? [];
  const totalPages =
    pagination?.total_pages || (pagination as any)?.totalPages || 1;
  const totalItems =
    pagination?.total_items || (pagination as any)?.totalItems || 0;

  const styles = {
    bg: isNight ? "bg-[#0a0a0a]" : "bg-[#f8fafc]",
    card: isNight
      ? "bg-[#171717] border-white/10"
      : "bg-white border-slate-200 shadow-sm",
    textMain: isNight ? "text-slate-100" : "text-slate-900",
    textSub: isNight ? "text-slate-400" : "text-slate-500",
    accent: "text-blue-500",
    accentBg: "bg-blue-600 hover:bg-blue-700 text-white transition-colors",
    input: isNight
      ? "bg-[#0a0a0a] border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      : "bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      const roleQuery = role.toUpperCase();
      let query = `paginate=true&limit=10&page=${page}&where=roles.some.code:${roleQuery}`;
      if (search) query += `&where=name:contains:${search}`;
      showAll(query);
    }, 350);
    return () => clearTimeout(debounceFetch);
  }, [role, page, search, showAll]);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      return prev;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("search", e.target.value);
      prev.set("page", "1");
      return prev;
    });
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      confirm(
        `Are you sure you want to delete ${name}? This action cannot be undone.`
      )
    ) {
      await deleteUser(id);
      showAll(
        `paginate=true&limit=10&page=${page}&where=roles.some.code:${role.toUpperCase()}`
      );
    }
  };

  const roleTitle = role === "teacher" ? "Teachers" : "Students";

  return (
    <div
      className={`min-h-screen ${styles.bg} ${styles.textMain} transition-colors duration-300 font-sans text-left pb-20`}
    >
      <Navbar
        toggleTheme={() => setTheme((p) => (p === "lofi" ? "night" : "lofi"))}
        theme={theme}
      />

      <div className="max-w-5xl mx-auto px-6 pt-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <button
              onClick={() => navigate(listed.dashboard)}
              className={`flex items-center gap-2 text-sm font-medium ${styles.textSub} hover:${styles.textMain} transition-colors mb-4`}
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold tracking-tight">
              {roleTitle} Directory
            </h1>
            <p className={`text-sm mt-1 ${styles.textSub}`}>
              Manage registered {role.toLowerCase()}s in the system workspace.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => navigate(`${listed.AddUser}?role=${role}`)}
              className={`h-10 px-5 rounded-lg text-sm font-medium flex items-center gap-2 ${styles.accentBg} shadow-sm`}
            >
              <Plus size={16} /> Add{" "}
              {role === "teacher" ? "Teacher" : "Student"}
            </button>
          )}
        </div>

        {/* SEARCH BAR */}
        <div
          className={`p-4 rounded-xl border ${styles.card} mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between`}
        >
          <div className="relative w-full sm:max-w-md">
            <Search
              size={16}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${styles.textSub}`}
            />
            <input
              value={search}
              onChange={handleSearchChange}
              className={`w-full pl-9 pr-4 py-2 rounded-md border ${styles.input} text-sm outline-none transition-all`}
              placeholder={`Search ${role.toLowerCase()}s by name identifier...`}
            />
          </div>
          <div className={`text-sm font-medium ${styles.textSub}`}>
            Total: {totalItems} records
          </div>
        </div>

        {/* DATA LIST */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2
                  className={`animate-spin ${styles.textSub}`}
                  size={24}
                />
                <span className={`text-sm ${styles.textSub}`}>
                  Loading registry data...
                </span>
              </div>
            ) : safeListUser.length ? (
              <div className="flex flex-col gap-3">
                {safeListUser.map((item: any, i: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className={`group p-4 rounded-xl border ${styles.card} flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:border-blue-500/30`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 ${isNight ? "bg-[#2a2a2a]" : "bg-slate-100"}`}
                      >
                        {item.profilePhoto ? (
                          <img
                            src={item.profilePhoto}
                            className="w-full h-full object-cover"
                            alt={item.name}
                          />
                        ) : (
                          <User size={18} className={styles.textSub} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-tight mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-3 text-xs">
                          <span className={`${styles.textSub} font-mono`}>
                            {item.nomorInduk || "No ID"}
                          </span>
                          {item.major && (
                            <span
                              className={`px-2 py-0.5 rounded-full font-medium ${isNight ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}
                            >
                              {item.major}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:border-l sm:pl-4 sm:ml-auto border-slate-200 dark:border-white/10 pt-3 sm:pt-0 border-t sm:border-t-0 mt-3 sm:mt-0">
                      {isAdmin ? (
                        <>
                          <button
                            onClick={() =>
                              navigate(`${listed.editguru}?id=${item.id}`)
                            }
                            className="p-2 rounded-md hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      ) : (
                        <span
                          className={`text-[10px] font-medium uppercase tracking-widest ${styles.textSub} opacity-50`}
                        >
                          Read Only
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div
                className={`py-20 rounded-xl border ${styles.card} flex flex-col items-center justify-center text-center`}
              >
                <Search
                  size={32}
                  className={`mb-3 ${styles.textSub} opacity-50`}
                />
                <h3 className="text-base font-medium">No records found</h3>
                <p className={`text-sm mt-1 ${styles.textSub}`}>
                  Try adjusting your search query.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* PAGINATION */}
        {!isLoading && safeListUser.length > 0 && (
          <div
            className={`mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t ${isNight ? "border-white/10" : "border-slate-200"}`}
          >
            <span className={`text-sm ${styles.textSub}`}>
              Page{" "}
              <span className="font-medium text-slate-900 dark:text-white">
                {page}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-900 dark:text-white">
                {totalPages}
              </span>
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className={`p-2 rounded-md border ${styles.card} hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors`}
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center px-2 gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${page === p ? styles.accentBg : `hover:bg-slate-100 dark:hover:bg-white/5 ${styles.textSub}`}`}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className={`p-2 rounded-md border ${styles.card} hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 transition-colors`}
              ></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guru;
