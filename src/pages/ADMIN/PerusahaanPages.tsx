import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { listed } from "@/constant/listed";
import fotoDepan from "../../assets/fotodepansmk.jpeg";
import companyStore from "@/store/company.store";

    const PerusahaanPage = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState<"lofi" | "night">("lofi");

    const toggleTheme = () => {
    setTheme(prev => (prev === "lofi" ? "night" : "lofi"));
};

    const { showAll, company } = companyStore();

    const payload = `paginate=true&limit=10`
useEffect(() => {
    showAll(payload);

}, []);

    return (
    <div data-theme={theme} className="min-h-screen bg-base-200">

      {/* NAVBAR */}
    <Navbar toggleTheme={toggleTheme} theme={theme} />

      {/* HEADER */}
    <div className="relative h-56 overflow-hidden">
        <img src={fotoDepan} alt="Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold tracking-widest"> PERUSAHAAN </h1>
        </div>
    </div>

      {/* CONTENT */}
    <div className="max-w-6xl mx-auto px-6 py-8">

        {/* BACK BUTTON */}
    <button onClick={() => navigate(listed.dashboard)} className="mb-5 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline">
        <ArrowLeft size={18} /> Kembali
    </button>

        {/* ACTION BUTTON */}
    <div className="flex gap-3 mb-6 justify-end">
        <button onClick={() => navigate(listed.AddPerusahaan)} className="btn btn-success btn-sm">ADD NEW COMPANY</button>
    </div>

        {/* LIST */}
    <div className="bg-base-100 rounded-xl shadow">
        {company?.map(item => (
            <div key={item.id} className="flex items-center gap-4 px-5 py-4 border-b last:border-none hover:bg-base-200 transition">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <img src={item.logo || undefined}alt={item.name}className="w-10 h-10 object-contain"/>

            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-base-content/60">
                {item.description || "No description available."}
                </p>
            </div>
            <div>
                <button onClick={() => {
                    navigate(`${listed.RequestPage}?id=${item.id}`)
                }}>
                    Show detail
                </button>
            </div>
            <div>
                <button onClick={() => {
                    navigate(`${listed.EditPerusahaan}?id=${item.id}`)
                }}>
                    Edit
                </button>
            </div>
            <div>
                <button onClick={() => {
                    //delete function
                }}>
                    Delete
                </button>
            </div>
            </div>
        ))}
        </div>

    </div>
    </div>
);
};

export default PerusahaanPage;
