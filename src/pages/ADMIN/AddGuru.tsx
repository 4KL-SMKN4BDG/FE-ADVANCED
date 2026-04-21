import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { listed } from "@/constant/listed";
import fotoDepan from "../../assets/fotodepansmk.jpeg";

const AddGuru = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<"lofi" | "night">("lofi");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
  };

  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [perusahaan, setPerusahaan] = useState("");

  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      nama,
      nip,
      perusahaan,
    });

    navigate("/admin/guru");
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-base-200">
      {/* NAVBAR */}
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      {/* HEADER */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={fotoDepan}
          alt="Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold tracking-widest">
            GURU PEMBIMBING
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* BACK */}
        <button
          onClick={() => navigate(listed.GuruPage)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-base-100 rounded-xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* FOTO */}
          {/* FOTO */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-48 h-48 rounded-xl overflow-hidden shadow bg-base-200 flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Pilih Foto Guru</span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            />
          </div>

          {/* INPUT */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <input
              type="text"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="input input-bordered w-full required"
            />

            <input
              type="text"
              placeholder="NIP"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              className="input input-bordered w-full"
              required
            />

            <select
              value={perusahaan}
              onChange={(e) => setPerusahaan(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                PERUSAHAAN
              </option>
              <option>PT Eflow Baraya Multika</option>
              <option>PT Extreme Football </option>
              <option>PT Pertamina</option>
            </select>

            <button className="btn btn-primary w-40 mt-4">INPUT</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuru;
