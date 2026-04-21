import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import fotoDepan from "../../assets/fotodepansmk.jpeg";
import { listed } from "@/constant/listed";

const EditPerusahaan = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<"lofi" | "night">("lofi");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
  };

  const [namaPerusahaan, setNamaPerusahaan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kapasitas, setKapasitas] = useState(10);

  const [preview, setPreview] = useState<string | null>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-base-200">
      {/* NAVBAR */}
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      {/* HEADER */}
      <div className="relative h-56 overflow-hidden">
        <img src={fotoDepan} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold tracking-widest">
            PERUSAHAAN
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline mb-6"
        >
          <ArrowLeft size={18} /> Kembali
        </button>

        {/* CARD */}
        <div className="bg-base-100 rounded-xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-4">
            {/* FOTO */}
            <div className="w-48 h-48 rounded-xl overflow-hidden shadow bg-base-200 flex items-center justify-center mx-auto">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">Logo Perusahaan</span>
              )}
            </div>

            <input
              type="file"
              onChange={handleFotoChange}
              className="file-input file-input-bordered file-input-sm"
            />

            {/* ALAMAT */}
            <div>
              <label className="text-sm font-semibold">Alamat / Link</label>

              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* KAPASITAS */}
            <div>
              <label className="text-sm font-semibold">Kapasitas</label>

              <input
                type="number"
                value={kapasitas}
                onChange={(e) => setKapasitas(Number(e.target.value))}
                className="input input-bordered w-full mt-1"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* NAMA */}
            <div>
              <label className="text-sm font-semibold">Nama Perusahaan</label>

              <input
                type="text"
                value={namaPerusahaan}
                onChange={(e) => setNamaPerusahaan(e.target.value)}
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* DESKRIPSI */}
            <div>
              <label className="text-sm font-semibold">Deskripsi</label>

              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="textarea textarea-bordered w-full mt-1 h-28"
              />
            </div>

            {/* TABLE SISWA */}
            <div className="bg-base-200 rounded-lg shadow">
              <div className="bg-primary text-white px-4 py-2 flex gap-10 text-sm font-semibold">
                <span>Nama</span>
                <span>Kelas</span>
                <span>NIS</span>
                <span>Jurusan</span>
                <span>Status</span>
              </div>

              <div className="p-4 text-gray-400 text-sm">
                Belum ada data siswa
              </div>
            </div>

            {/* VIEW BUTTON */}
            <button
              onClick={() => navigate(listed.View)}
              className="btn btn-success w-32"
            >
              VIEW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPerusahaan;
