import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  MapPin,
  Briefcase,
  Camera,
  Calendar,
  Mail,
  Users,
  Hash,
  Save,
  Loader2,
} from "lucide-react";
import { listed } from "@/constant/listed";
import useAuthStore from "@/store/auth.store";
import userStore from "@/store/user.store";

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUserSession } = useAuthStore();
  const { update, isLoading } = userStore();
  const [theme, setTheme] = useState<"lofi" | "night">("night"); // Default Dark Mode
  const isNight = theme === "night";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthPlace: "",
    birthDate: "",
    address: "",
    major: "",
    organizationDesc: "",
    experienceDesc: "",
    profilePhoto: null as File | null,
    preview: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        birthPlace: user.birthPlace || "",
        birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
        address: user.address || "",
        major: user.major || "",
        organizationDesc: user.organizationDesc || "",
        experienceDesc: user.experienceDesc || "",
        preview: user.profilePhoto || "",
      }));
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!user?.id) return;
    const data = new FormData();

    if (formData.name) data.append("name", formData.name);
    if (formData.email) data.append("email", formData.email);
    if (formData.birthPlace) data.append("birthPlace", formData.birthPlace);
    if (formData.birthDate) data.append("birthDate", formData.birthDate);
    if (formData.address) data.append("address", formData.address);
    if (formData.major) data.append("major", formData.major);
    if (formData.organizationDesc)
      data.append("organizationDesc", formData.organizationDesc);
    if (formData.experienceDesc)
      data.append("experienceDesc", formData.experienceDesc);
    if (formData.profilePhoto)
      data.append("profilePhoto", formData.profilePhoto);

    try {
      await update(user.id, data);

      updateUserSession({
        name: formData.name,
        email: formData.email,
        birthPlace: formData.birthPlace,
        birthDate: formData.birthDate,
        address: formData.address,
        major: formData.major,
        organizationDesc: formData.organizationDesc,
        experienceDesc: formData.experienceDesc,
      });

      alert("Profile updated successfully.");
      navigate(listed.dashboard);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile data.");
    }
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
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className={`text-sm mt-1 ${styles.textSub}`}>
              Manage your personal information, contact details, and resume.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Photo & Basic */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div
              className={`p-6 rounded-2xl border ${styles.card} flex flex-col items-center text-center`}
            >
              <div className="relative group w-32 h-32 mb-4">
                <div
                  className={`w-full h-full rounded-full border-4 ${isNight ? "border-[#2a2a2a]" : "border-slate-100"} overflow-hidden bg-slate-100 dark:bg-slate-800`}
                >
                  {formData.preview ? (
                    <img
                      src={formData.preview}
                      className="w-full h-full object-cover"
                      alt="Profile"
                    />
                  ) : (
                    <User
                      size={48}
                      className={`w-full h-full p-6 ${styles.textSub}`}
                    />
                  )}
                </div>
                <label className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
                  <Camera size={20} className="text-white mb-1" />
                  <span className="text-[10px] font-medium text-white">
                    Change
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f)
                        setFormData({
                          ...formData,
                          profilePhoto: f,
                          preview: URL.createObjectURL(f),
                        });
                    }}
                  />
                </label>
              </div>
              <h3 className="font-semibold text-lg">
                {formData.name || "User"}
              </h3>
              <p className={`text-sm ${styles.textSub}`}>
                {user?.roles?.[0]?.code || "ROLE"}
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${styles.card} space-y-4`}>
              <div className="space-y-1.5">
                <label
                  className={`text-xs font-medium flex items-center gap-2 ${styles.textSub}`}
                >
                  <User size={14} /> Full Name
                </label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full p-2 text-sm rounded-lg border ${styles.input} outline-none`}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  className={`text-xs font-medium flex items-center gap-2 ${styles.textSub}`}
                >
                  <Mail size={14} /> Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full p-2 text-sm rounded-lg border ${styles.input} outline-none`}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  className={`text-xs font-medium flex items-center gap-2 ${styles.textSub}`}
                >
                  <Hash size={14} /> Identification Number
                </label>
                <input
                  value={user?.nomorInduk || "Unset"}
                  disabled
                  className={`w-full p-2 text-sm font-mono rounded-lg border ${styles.input} outline-none opacity-60 cursor-not-allowed`}
                />
              </div>
              <div className="space-y-1.5">
                <label
                  className={`text-xs font-medium flex items-center gap-2 ${styles.textSub}`}
                >
                  <Briefcase size={14} /> Major / Department
                </label>
                <select
                  value={formData.major}
                  onChange={(e) =>
                    setFormData({ ...formData, major: e.target.value })
                  }
                  className={`w-full p-2 text-sm rounded-lg border ${styles.input} outline-none cursor-pointer`}
                >
                  <option
                    value=""
                    disabled
                    className={isNight ? "bg-[#0a0a0a]" : "bg-white"}
                  >
                    Select Major
                  </option>
                  <option
                    value="RPL"
                    className={isNight ? "bg-[#171717]" : "bg-white"}
                  >
                    RPL
                  </option>
                  <option
                    value="TITL"
                    className={isNight ? "bg-[#171717]" : "bg-white"}
                  >
                    TITL
                  </option>
                  <option
                    value="DKV"
                    className={isNight ? "bg-[#171717]" : "bg-white"}
                  >
                    DKV
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className={`p-6 rounded-2xl border ${styles.card}`}>
              <h3 className="text-base font-semibold mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    className={`text-xs font-medium flex items-center gap-2 ${styles.textSub}`}
                  >
                    <MapPin size={14} /> Birth Place
                  </label>
                  <input
                    value={formData.birthPlace}
                    onChange={(e) =>
                      setFormData({ ...formData, birthPlace: e.target.value })
                    }
                    className={`w-full p-2 text-sm rounded-lg border ${styles.input} outline-none`}
                    placeholder="City of birth"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    className={`text-xs font-medium flex items-center gap-2 ${styles.textSub}`}
                  >
                    <Calendar size={14} /> Birth Date
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                    className={`w-full p-2 text-sm rounded-lg border ${styles.input} outline-none`}
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label
                    className={`text-xs font-medium flex items-center gap-2 ${styles.textSub}`}
                  >
                    <MapPin size={14} /> Full Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className={`w-full p-3 text-sm rounded-lg border ${styles.input} outline-none min-h-[80px] resize-none`}
                    placeholder="Your complete residential address..."
                  />
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${styles.card}`}>
              <h3 className="text-base font-semibold mb-4">
                Experience & Background
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label
                    className={`text-xs font-medium flex items-center gap-2 ${styles.textSub}`}
                  >
                    <Users size={14} /> Organization Experience
                  </label>
                  <textarea
                    value={formData.organizationDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organizationDesc: e.target.value,
                      })
                    }
                    className={`w-full p-3 text-sm rounded-lg border ${styles.input} outline-none h-[220px] resize-none`}
                    placeholder="Detail your organizational involvement..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    className={`text-xs font-medium flex items-center gap-2 ${styles.textSub}`}
                  >
                    <Briefcase size={14} /> Work / Project Experience
                  </label>
                  <textarea
                    value={formData.experienceDesc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceDesc: e.target.value,
                      })
                    }
                    className={`w-full p-3 text-sm rounded-lg border ${styles.input} outline-none h-[220px] resize-none`}
                    placeholder="Detail your projects, skills, or work history..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
