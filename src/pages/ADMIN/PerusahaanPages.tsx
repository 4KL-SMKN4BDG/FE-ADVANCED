import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Building2,
  Trash2,
  Edit2,
  Send,
  ChevronRight,
  Loader2,
  Search,
} from "lucide-react";
import { listed } from "@/constant/listed";
import { motion, AnimatePresence } from "framer-motion";
import companyStore from "@/store/company.store";
import useAuthStore from "@/store/auth.store";

const PerusahaanPage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"lofi" | "night">("lofi");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));

  const { user } = useAuthStore();
  const role = user?.roles?.[0]?.code === "ADMIN" ? "ADMIN" : "STUDENT";
  const { showAll, company, deleteCompany, apply, isLoading } = companyStore();

  const isNight = theme === "night";

  const styles = {
    bg: isNight ? "bg-[#0a0a0a]" : "bg-[#f8fafc]",
    card: isNight
      ? "bg-[#171717] border-white/5"
      : "bg-white border-slate-200 shadow-sm",
    textMain: isNight ? "text-slate-100" : "text-slate-900",
    textSub: isNight ? "text-slate-400" : "text-slate-500",
    accent: "text-blue-600 dark:text-blue-500",
    accentBg: "bg-blue-600 hover:bg-blue-700 text-white transition-colors",
  };

  useEffect(() => {
    showAll(`paginate=true&limit=10`);
  }, [showAll]);

  const handleDelete = async (id: string, name: string) => {
    if (
      confirm(
        `Are you sure you want to delete ${name}? This action cannot be undone.`
      )
    ) {
      await deleteCompany(id);
      showAll(`paginate=true&limit=10`);
    }
  };

  const handleApply = async (id: string, name: string) => {
    if (confirm(`Send internship application to ${name}?`)) {
      await apply(id);
      alert("Application sent successfully!");
    }
  };

  return (
    <div
      className={`min-h-screen ${styles.bg} ${styles.textMain} transition-colors duration-300 font-sans text-left pb-20`}
    >
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <button
              onClick={() => navigate(listed.dashboard)}
              className={`flex items-center gap-2 text-sm font-medium ${styles.textSub} hover:${styles.textMain} transition-colors mb-4`}
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold tracking-tight">
              Partner Companies
            </h1>
            <p className={`text-sm mt-1 ${styles.textSub}`}>
              Directory of industrial partners and internship placements.
            </p>
          </div>

          {role === "ADMIN" && (
            <button
              onClick={() => navigate(listed.AddPerusahaan)}
              className={`h-10 px-5 rounded-lg text-sm font-medium flex items-center gap-2 ${styles.accentBg} shadow-sm`}
            >
              <Plus size={16} /> Add Company
            </button>
          )}
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
                  Loading company data...
                </span>
              </div>
            ) : company?.length === 0 ? (
              <div
                className={`py-20 rounded-xl border ${styles.card} flex flex-col items-center justify-center text-center`}
              >
                <Building2
                  size={32}
                  className={`mb-3 ${styles.textSub} opacity-50`}
                />
                <h3 className="text-base font-medium">
                  No companies registered
                </h3>
                <p className={`text-sm mt-1 ${styles.textSub}`}>
                  Currently there are no partner companies in the system.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {company?.map((item: any) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`group p-5 rounded-xl border ${styles.card} flex flex-col md:flex-row md:items-center gap-5 transition-all hover:border-blue-500/30`}
                  >
                    <div className="flex items-start md:items-center gap-5 flex-1">
                      {/* Company Logo */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0 border ${isNight ? "border-white/5 bg-slate-800" : "border-slate-100 bg-white"}`}
                      >
                        {item?.logo ? (
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <Building2 size={24} className={styles.textSub} />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold leading-tight mb-1">
                          {item.name}
                        </h2>
                        <p
                          className={`text-sm ${styles.textSub} line-clamp-2 max-w-2xl`}
                        >
                          {item.description ||
                            "No description provided for this company."}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:border-l md:pl-5 md:ml-auto border-slate-200 dark:border-white/10 pt-4 md:pt-0 border-t md:border-t-0 mt-4 md:mt-0">
                      <button
                        onClick={() =>
                          navigate(`${listed.RequestPage}?id=${item.id}`)
                        }
                        className={`px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${styles.textSub} hover:${styles.textMain} text-sm font-medium flex items-center gap-1`}
                      >
                        Details <ChevronRight size={16} />
                      </button>

                      {role === "ADMIN" && (
                        <>
                          <button
                            onClick={() =>
                              navigate(`${listed.AddPerusahaan}?id=${item.id}`)
                            }
                            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-500"
                            title="Edit Company"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                            title="Delete Company"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}

                      {role === "STUDENT" && (
                        <button
                          onClick={() => handleApply(item.id, item.name)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 transition-colors`}
                        >
                          <Send size={14} /> Apply
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PerusahaanPage;
