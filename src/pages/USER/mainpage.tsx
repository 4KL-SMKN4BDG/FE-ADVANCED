import React, { useState } from "react";
import Navbar from "@/components/Navbar";

/* ================= INTERFACE ================= */
interface Course {
  id: number;
  title: string;
  subtitle: string;
  logo: string;
}

/* ================= DATA ================= */
const courses: Course[] = [
  {
    id: 1,
    title: "Eflow Baraya Multika",
    subtitle: "Eflow Baraya Multika",
    logo: "src/assets/logoEflow.jpeg",
  },
  {
    id: 2,
    title: "Curaweda Palangan Inotech",
    subtitle: "Curaweda Palangan Inotech",
    logo: "src/assets/logosmkn4.png",
  },
  {
    id: 3,
    title: "Eflow Braja Mustika",
    subtitle: "Eflow Baraya Multika",
    logo: "src/assets/logoEflow.jpeg",
  },
  {
    id: 4,
    title: "Eflow Baraya Multika",
    subtitle: "Eflow Baraya Multika",
    logo: "src/assets/logosmkn4.png",
  },
  {
    id: 5,
    title: "Curaweda Palangan Inotech",
    subtitle: "Curaweda Palangan Inotech",
    logo: "src/assets/logosmkn4.png",
  },
  {
    id: 6,
    title: "Eflow Baraya Multika",
    subtitle: "Eflow Baraya Multika",
    logo: "src/assets/logoEflow.jpeg",
  },
];

/* ================= COMPONENT ================= */
const MainPage: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  const [theme, setTheme] = useState<"lofi" | "night">("lofi");
  

  const [form, setForm] = useState({
    nama: "",
    ttl: "",
    alamat: "",
    kelurahan: "",
    kecamatan: "",
    organisasi: "",
    pengalaman: "",
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    alert("Data berhasil dikirim");
    setShowForm(false);
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      {/* ================= MODAL FORM ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/45 flex justify-center items-center z-[9999]">
          <div className="w-[750px] max-w-[95%] bg-white rounded-[20px] px-9 py-8 relative">
            <h3 className="text-center mb-6 text-xl font-bold">
              FORMULIR DATA DIRI
            </h3>

            <div className="flex gap-3 mb-3.5">
              <input
                className="flex-1 px-4 py-3.5 rounded-[10px] border border-gray-300 text-[15px]"
                placeholder="NAMA LENGKAP"
                name="nama"
                onChange={handleChange}
              />
              <input
                className="flex-1 px-4 py-3.5 rounded-[10px] border border-gray-300 text-[15px]"
                placeholder="TEMPAT, TANGGAL LAHIR"
                name="ttl"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 mb-3.5">
              <input
                className="px-4 py-3.5 rounded-[10px] border border-gray-300 text-[15px]"
                placeholder="ALAMAT LENGKAP"
                name="alamat"
                onChange={handleChange}
              />
              <input
                className="px-4 py-3.5 rounded-[10px] border border-gray-300 text-[15px]"
                placeholder="KELURAHAN"
                name="kelurahan"
                onChange={handleChange}
              />
              <input
                className="px-4 py-3.5 rounded-[10px] border border-gray-300 text-[15px]"
                placeholder="KECAMATAN"
                name="kecamatan"
                onChange={handleChange}
              />
            </div>

            <textarea
              className="w-full h-[120px] px-4 py-3.5 rounded-[10px] border border-gray-300 text-[15px] mb-3.5 resize-none"
              placeholder="ORGANISASI YANG PERNAH ANDA IKUTI"
              name="organisasi"
              onChange={handleChange}
            />

            <textarea
              className="w-full h-[120px] px-4 py-3.5 rounded-[10px] border border-gray-300 text-[15px] mb-3.5 resize-none"
              placeholder="PENGALAMAN"
              name="pengalaman"
              onChange={handleChange}
            />

            <button
              className="float-right bg-blue-600 text-white border-none w-12 h-12 rounded-full text-xl cursor-pointer hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              ➜
            </button>
          </div>
        </div>
      )}

      {/* ================= NAVBAR ================= */}
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      {/* ================= BANNER ================= */}
<section className="px-8 pt-6">
  <div
    className="relative h-[200px] bg-cover bg-center flex justify-center items-center rounded-1xl overflow-hidden"
    style={{ backgroundImage: "url('src/assets/fotodepansmk.jpeg')" }}
  >
    <div className="absolute inset-0 bg-black/50"></div>
    <h1 className="font-kameron relative text-white text-5xl font-bold tracking-wide">
      SELAMAT DATANG
    </h1>
  </div>
</section>

      {/* ================= COURSE ================= */}
      <section className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-base-200 p-6 rounded-xl text-center shadow-md hover:shadow-xl transition"
          >
            <div className="h-40 flex items-center justify-center mb-4">
              <img
                src={course.logo}
                className="w-[120px] h-[120px] object-contain"
                alt={course.title}
              />
            </div>
            <h4 className="text-lg font-bold text-base-content mb-2">
              {course.title}
            </h4>
            <p className="text-sm text-gray-500 mb-4">{course.subtitle}</p>
            <button className="btn btn-primary w-max mx-auto">View</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MainPage;