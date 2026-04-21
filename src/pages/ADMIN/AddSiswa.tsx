import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ClipboardList, UserPlus, Database } from "lucide-react";
import { motion } from "framer-motion";
import { listed } from "@/constant/listed";
import fotoDepan from "../../assets/fotodepansmk.jpeg";

const AddSiswa = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [theme, setTheme] = useState<"lofi" | "night">("night");

  const [nameInput, setNameInput] = useState("");
  const [nisInput, setNisInput] = useState("");

  const roleSearch =
    searchParams.get("role") === "teacher" ? "Teacher" : "Student";
  const isNight = theme === "night";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const names = nameInput
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n !== "");
    const ids = nisInput
      .split("\n")
      .map((id) => id.trim())
      .filter((id) => id !== "");

    if (names.length === 0 || ids.length === 0) {
      alert("Please input data before proceeding.");
      return;
    }

    if (names.length !== ids.length) {
      alert(`Data mismatch! Names: ${names.length}, IDs: ${ids.length}`);
      return;
    }

    const payload = {
      role: roleSearch.toUpperCase(),
      newUsers: names.map((name, index) => ({ name, nomorInduk: ids[index] })),
    };

    navigate(listed.View, { state: { reviewData: payload } });
  };

  const styles = {
    bg: isNight ? "bg-[#0a0a0a]" : "bg-[#f8fafc]",
    card: isNight
      ? "bg-[#171717] border-white/10"
      : "bg-white border-slate-200",
    textMain: isNight ? "text-slate-100" : "text-slate-900",
    textSub: isNight ? "text-slate-400" : "text-slate-500",
    input: isNight
      ? "bg-[#0a0a0a] border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      : "bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
  };

  return (
    <div
      className={`min-h-screen ${styles.bg} ${styles.textMain} transition-colors duration-300 font-sans text-left pb-20`}
    >
      <Navbar
        toggleTheme={() => setTheme((p) => (p === "lofi" ? "night" : "lofi"))}
        theme={theme}
      />

      <div className="max-w-5xl mx-auto px-6 pt-12">
        <button
          onClick={() =>
            navigate(`${listed.UserPage}?role=${roleSearch.toLowerCase()}`)
          }
          className={`flex items-center gap-2 text-sm font-medium ${styles.textSub} hover:${styles.textMain} transition-colors mb-6`}
        >
          <ArrowLeft size={16} /> Back to Directory
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Add {roleSearch}s
          </h1>
          <p className={`text-sm ${styles.textSub}`}>
            Enter names and identification numbers line by line. Ensure both
            lists match in length.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Input Nama */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`p-6 rounded-xl border ${styles.card}`}
            >
              <div className="flex items-center gap-2 mb-4 font-semibold">
                <UserPlus size={18} className="text-blue-500" />
                <span>Full Names</span>
              </div>
              <textarea
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g.&#10;John Doe&#10;Jane Smith"
                className={`w-full h-72 p-4 text-sm rounded-lg border ${styles.input} resize-none outline-none transition-all leading-relaxed`}
                required
              />
              <div
                className={`mt-3 text-xs font-medium ${styles.textSub} flex justify-between`}
              >
                <span>Format: 1 name per line</span>
                <span>
                  Rows: {nameInput.split("\n").filter((x) => x.trim()).length}
                </span>
              </div>
            </motion.div>

            {/* Input ID */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`p-6 rounded-xl border ${styles.card}`}
            >
              <div className="flex items-center gap-2 mb-4 font-semibold">
                <ClipboardList size={18} className="text-blue-500" />
                <span>{roleSearch === "Teacher" ? "NIP" : "NIS"} Numbers</span>
              </div>
              <textarea
                value={nisInput}
                onChange={(e) => setNisInput(e.target.value)}
                placeholder="e.g.&#10;10001&#10;10002"
                className={`w-full h-72 p-4 text-sm font-mono rounded-lg border ${styles.input} resize-none outline-none transition-all leading-relaxed`}
                required
              />
              <div
                className={`mt-3 text-xs font-medium ${styles.textSub} flex justify-between`}
              >
                <span>Format: 1 ID per line</span>
                <span>
                  Rows: {nisInput.split("\n").filter((x) => x.trim()).length}
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              type="submit"
              className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
              <Database size={16} />
              Review Data
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default AddSiswa;
