import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { listed } from "@/constant/listed";
import { UserShowAllAPI, User } from "@/restApi/user.api"; // Sesuaikan path ini
import fotoDepan from "../../assets/fotodepansmk.jpeg";

const Siswa = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"lofi" | "night">("lofi");
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
  };

  // Fungsi Fetch Data
  const loadStudents = async () => {
    setLoading(true);
    try {
      const response = await UserShowAllAPI("limit=50&page=1");
      if (response.status) {
        setStudents(response.data.items);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div data-theme={theme} className="min-h-screen bg-base-200">
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <div className="relative h-56 overflow-hidden">
        <img
          src={fotoDepan}
          alt="Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold tracking-widest">
            {" "}
            DATA SISWA{" "}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline"
        >
          <ArrowLeft size={18} /> Kembali
        </button>

        <div className="flex gap-3 mb-6 justify-end">
          <button
            onClick={() => navigate(listed.AddUser)}
            className="btn btn-success btn-sm"
          >
            ADD
          </button>
          <button className="btn btn-info btn-sm">EDIT</button>
          <button className="btn btn-error btn-sm">DELETE</button>
        </div>

        <div className="bg-base-100 rounded-xl shadow min-h-[200px]">
          {loading ? (
            <div className="p-10 text-center">Memuat data...</div>
          ) : students.length > 0 ? (
            students.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 px-5 py-4 border-b last:border-none hover:bg-base-200 transition"
              >
                <input type="checkbox" className="checkbox checkbox-sm" />
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {item.profilePhoto ? (
                    <img
                      src={item.profilePhoto}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold">
                      {item.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-base-content/60">
                    {item.nomorInduk}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-400">
              Belum ada data siswa.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Siswa;
