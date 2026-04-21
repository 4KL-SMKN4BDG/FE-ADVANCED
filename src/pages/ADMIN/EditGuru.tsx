import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Hash,
  BookOpen,
  Camera,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { listed } from "@/constant/listed";
import userStore from "@/store/user.store";

const EditGuru = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idUser = searchParams.get("id");
  const { showOne, oneUser, update, isLoading } = userStore();

  const [theme, setTheme] = useState<"lofi" | "night">("night"); // Default Dark
  const isNight = theme === "night";

  const [formData, setFormData] = useState({
    name: "",
    nomorInduk: "",
    email: "",
    major: "",
    profilePhoto: null as File | null,
    preview: "",
  });

  const isStudent = oneUser?.roles?.[0]?.code === "STUDENT";
  const roleLabel = isStudent ? "Student" : "Teacher";

  useEffect(() => {
    if (idUser) showOne(idUser);
  }, [idUser]);

  useEffect(() => {
    if (oneUser && idUser) {
      setFormData({
        name: oneUser.name || "",
        nomorInduk: oneUser.nomorInduk || "",
        email: oneUser.email || "",
        major: oneUser.major || "",
        profilePhoto: null,
        preview: oneUser.profilePhoto || "",
      });
    }
  }, [oneUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idUser) return;
    const data = new FormData();
    data.append("name", formData.name);
    data.append("nomorInduk", formData.nomorInduk);
    data.append("email", formData.email);
    data.append("major", formData.major);
    if (formData.profilePhoto)
      data.append("profilePhoto", formData.profilePhoto);
    await update(idUser, data);
    navigate(`${listed.UserPage}?role=${roleLabel.toLowerCase()}`);
  };

  const styles = {
    bg: isNight ? "bg-[#0a0a0a]" : "bg-[#f8fafc]",
    card: isNight
      ? "bg-[#171717] border-white/10"
      : "bg-white border-slate-200 shadow-sm",
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

      <div className="max-w-4xl mx-auto px-6 pt-12">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-sm font-medium ${styles.textSub} hover:${styles.textMain} transition-colors mb-6`}
        >
          <ArrowLeft size={16} /> Cancel
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Edit {roleLabel}
          </h1>
          <p className={`text-sm ${styles.textSub}`}>
            Update the profile information below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`p-8 rounded-xl border ${styles.card} grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10`}
        >
          {/* FOTO UPLOAD */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Profile Photo</label>
            <div
              className={`relative w-full aspect-square rounded-2xl border-2 border-dashed ${styles.input} flex items-center justify-center overflow-hidden hover:border-blue-500 transition-colors group`}
            >
              {formData.preview ? (
                <img
                  src={formData.preview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  {isStudent ? <GraduationCap size={32} /> : <User size={32} />}
                  <span className="text-xs">Upload Photo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file)
                    setFormData({
                      ...formData,
                      profilePhoto: file,
                      preview: URL.createObjectURL(file),
                    });
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* FORM INPUTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User size={14} /> Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full p-2.5 text-sm rounded-lg border ${styles.input} outline-none`}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium flex items-center gap-2">
                <Hash size={14} /> {isStudent ? "NIS" : "NIP"} Number
              </label>
              <input
                type="text"
                value={formData.nomorInduk}
                onChange={(e) =>
                  setFormData({ ...formData, nomorInduk: e.target.value })
                }
                className={`w-full p-2.5 text-sm font-mono rounded-lg border ${styles.input} outline-none`}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full p-2.5 text-sm rounded-lg border ${styles.input} outline-none`}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <BookOpen size={14} />{" "}
                {isStudent ? "Major / Class" : "Department"}
              </label>
              <input
                type="text"
                value={formData.major}
                onChange={(e) =>
                  setFormData({ ...formData, major: e.target.value })
                }
                className={`w-full p-2.5 text-sm rounded-lg border ${styles.input} outline-none`}
              />
            </div>

            <div className="sm:col-span-2 pt-4 border-t border-slate-200 dark:border-white/10 mt-2 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
              >
                <Save size={16} />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGuru;
