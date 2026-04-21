import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import userStore from "@/store/user.store";
import { listed } from "@/constant/listed";

const ViewPerusahaan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { create, isLoading } = userStore();
  const [theme, setTheme] = useState<"lofi" | "night">("night");

  const [reviewData, setReviewData] = useState<any>(null);
  const isNight = theme === "night";

  const styles = {
    bg: isNight ? "bg-[#0a0a0a]" : "bg-[#f8fafc]",
    card: isNight
      ? "bg-[#171717] border-white/10"
      : "bg-white border-slate-200 shadow-sm",
    textMain: isNight ? "text-slate-100" : "text-slate-900",
    textSub: isNight ? "text-slate-400" : "text-slate-500",
  };

  useEffect(() => {
    if (location.state?.reviewData) setReviewData(location.state.reviewData);
  }, [location.state]);

  const handleRemoveItem = (index: number) => {
    if (!reviewData) return;
    const updatedUsers = reviewData.newUsers.filter(
      (_: any, i: number) => i !== index
    );
    setReviewData({ ...reviewData, newUsers: updatedUsers });
  };

  const handleConfirmAll = async () => {
    if (!reviewData || reviewData.newUsers.length === 0) return;
    try {
      await create(reviewData);
      navigate(`${listed.UserPage}?role=${reviewData.role.toLowerCase()}`);
    } catch (error) {
      console.error("Gagal simpan:", error);
    }
  };

  return (
    <div
      className={`min-h-screen ${styles.bg} ${styles.textMain} transition-colors duration-300 overflow-x-hidden text-left pb-20`}
    >
      <Navbar
        toggleTheme={() => setTheme((p) => (p === "lofi" ? "night" : "lofi"))}
        theme={theme}
      />

      <div className="max-w-5xl mx-auto px-6 pt-12">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-sm font-medium ${styles.textSub} hover:${styles.textMain} transition-colors mb-6`}
        >
          <ArrowLeft size={16} /> Edit Input Data
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Review Registration
          </h1>
          <p className={`text-sm ${styles.textSub}`}>
            Verify the data below before saving to the database.
          </p>
        </div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`rounded-xl border ${styles.card} overflow-hidden`}
        >
          <div
            className={`grid grid-cols-[50px_1fr_1fr_100px_80px] gap-4 px-6 py-3 text-xs font-semibold ${isNight ? "bg-[#1a1a1a] border-b border-white/10" : "bg-slate-50 border-b border-slate-200"} ${styles.textSub}`}
          >
            <div>#</div>
            <div>Full Name</div>
            <div>ID Number</div>
            <div>Role</div>
            <div>Action</div>
          </div>

          <div className="divide-y divide-white/5 dark:divide-white/10">
            <AnimatePresence>
              {!reviewData || reviewData.newUsers.length === 0 ? (
                <div className="py-12 text-center text-sm text-slate-500">
                  No data to review. Please go back and input data.
                </div>
              ) : (
                reviewData.newUsers.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="grid grid-cols-[50px_1fr_1fr_100px_80px] gap-4 px-6 py-4 items-center text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className={styles.textSub}>{index + 1}</div>
                    <div className="font-medium truncate pr-4">{item.name}</div>
                    <div className="font-mono text-xs">{item.nomorInduk}</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${isNight ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}
                      >
                        {reviewData.role}
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {reviewData && reviewData.newUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex items-center justify-between"
          >
            <span className={`text-sm ${styles.textSub}`}>
              Total entries: {reviewData.newUsers.length}
            </span>
            <button
              onClick={handleConfirmAll}
              disabled={isLoading}
              className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <CheckCircle2 size={16} />
              )}
              {isLoading ? "Saving..." : "Confirm Registration"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ViewPerusahaan;
