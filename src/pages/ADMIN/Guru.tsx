import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { listed } from "@/constant/listed";
import fotoDepan from "../../assets/fotodepansmk.jpeg";
import useAuthStore from "@/store/auth.store";
import userStore from "@/store/user.store";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

    const Guru = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [theme, setTheme] = useState<"lofi" | "night">("lofi");
    const { listUser, showAll, deleteUser } = userStore();
    const { user } = useAuthStore();
    const roleSearch = searchParams.get("role") === "teacher" ? "TEACHER" : "STUDENT"; 
    const role = user?.roles[0]?.code === "ADMIN" ? "ADMIN" : "STUDENT";
    const payload = `paginate=true&limit=30&where=roles.some.code:${roleSearch}`;

    useEffect(() => {
        showAll(payload);
    }, [])
    
    const toggleTheme = () => {
    setTheme(prev => (prev === "lofi" ? "night" : "lofi"));
};

    return (
    <div data-theme={theme} className="min-h-screen bg-base-200">

      {/* NAVBAR */}
    <Navbar toggleTheme={toggleTheme} theme={theme} />

      {/* HEADER */}
    <div className="relative h-56 overflow-hidden">
        <img src={fotoDepan} alt="Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold tracking-widest"> {roleSearch === "STUDENT" ? "SISWA RPL" : "GURU PEMBIMBING"} </h1>
        </div>
    </div>

      {/* CONTENT */}
    <div className="max-w-6xl mx-auto px-6 py-8">

        {/* BACK BUTTON */}
    <button onClick={() => navigate(listed.dashboard)} className="mb-5 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline">
        <ArrowLeft size={18} /> Kembali
    </button>

        {/* ACTION BUTTON */}
    <div className="flex justify-between items-center mb-6">
  <h2 className="text-lg font-semibold">
  </h2>

  {role === "ADMIN" && (
    <button
      className="btn btn-success btn-sm"
      onClick={() => {
        navigate(`${listed.AddUser}?role=${roleSearch.toLowerCase()}`);
      }}
    >
      + Add User
    </button>
  )}
</div>
        {/* LIST */}
    <div className="bg-base-100 rounded-xl shadow">
        {listUser?.map((item, index) => (
            <div
                key={item.id}
                className="flex items-center gap-4 px-5 py-4 border-b last:border-none hover:bg-base-200 transition"
            >
                {/* NOMOR */}
                <span className="w-6 text-center font-semibold text-gray-500">
                {index + 1}
                </span>

                {/* FOTO */}
                <img
                src={item?.profilePhoto || "default_photo.png"}
                alt={item?.name}
                className="w-10 h-10 object-contain"
                />

                {/* INFO */}
                <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-base-content/60">
                    {item?.class}
                </p>
                </div>

                {/* ACTION */}
                <div className="flex gap-3 text-sm">
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                        navigate(`${listed.RequestPage}?id=${item.id}`);
                        }}
                    >
                        Detail
                    </button>

                    {role === "ADMIN" && (
                        <button
                        className="text-yellow-600 hover:underline"
                        onClick={() => {
                            navigate(`${listed.AddGuru}?id=${item.id}`);
                        }}
                        >
                        Edit
                        </button>
                    )}

                    {role === "ADMIN" && (
                        <button
                        className="text-red-600 hover:underline"
                        onClick={() => {
                            deleteUser(item.id);
                        }}
                        >
                        Delete
                        </button>
                    )}
                </div>
            </div>
            ))}
        </div>
    </div>
    </div>
);
};

export default Guru;
