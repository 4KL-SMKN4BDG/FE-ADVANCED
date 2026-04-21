import { useState } from "react";

export default function FormDataDiri() {
  const [form, setForm] = useState({
    nama: "",
    ttl: "",
    alamat: "",
    kelurahan: "",
    kecamatan: "",
    organisasi: "",
    pengalaman: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    alert("Data berhasil dikirim");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/Sekolah.jpeg')",
        backgroundPosition: "auto",
      }}
    >
      {/* overlay gelap */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* card form */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-center">
          FORMULIR PROFIL DIRI
        </h2>

        <input
          type="text"
          name="nama"
          placeholder="NAMA LENGKAP"
          value={form.nama}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />

        <input
          type="text"
          name="ttl"
          placeholder="TEMPAT, TANGGAL LAHIR"
          value={form.ttl}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            name="alamat"
            placeholder="ALAMAT LENGKAP"
            value={form.alamat}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            name="kelurahan"
            placeholder="KELURAHAN"
            value={form.kelurahan}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            name="kecamatan"
            placeholder="KECAMATAN"
            value={form.kecamatan}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </div>

        <textarea
          name="organisasi"
          placeholder="ORGANISASI YANG PERNAH ANDA IKUTI"
          value={form.organisasi}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 h-24"
        />

        <textarea
          name="pengalaman"
          placeholder="PENGALAMAN"
          value={form.pengalaman}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 h-24"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#497EC0] text-white py-2 rounded-xl hover:bg-[#3A67A3] transition"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
