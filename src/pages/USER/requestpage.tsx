import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import companyStore from "@/store/company.store";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { listed } from "@/constant/listed";

const statusColor = (status: string | null) => {
  if (!status) status = "PENDING";
  const color = status === "PENDING" ? "bg-orange-100 text-orange-600" : status === "ACCEPTED" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600";
  return color;
}

const RequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"lofi" | "night">("lofi");
  const { user } = useAuthStore();
  const role = user?.roles[0].code === "ADMIN" ? "ADMIN" : "STUDENT";
  const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
  };
  
  const [searchParams] = useSearchParams();
  const idCompany = searchParams.get('id');
  const { oneCompany, showOne, apply } = companyStore();
  useEffect(() => {
  if (idCompany) showOne(idCompany);
  }, [])
  if (!oneCompany) {
    //company not found handle
  }
  console.log(oneCompany?.address)

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <div className="max-w-7xl mx-auto p-8">

  {/* BACK */}
  <button
    onClick={() => navigate(listed.PerusahaanPage)}
    className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline"
  >
    <ArrowLeft size={18} /> Kembali
  </button>

  {/* GRID UTAMA */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

    {/* ================= ROW 1 LEFT (LOGO) ================= */}
    <div className="h-80 rounded-2xl overflow-hidden shadow bg-white flex items-center justify-center">
      {oneCompany?.logo ? (
        <img
          src={oneCompany.logo}
          alt="Logo"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-400">No Image</span>
      )}
    </div>

    {/* ================= ROW 1 RIGHT (TITLE) ================= */}
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-base-content">
        {oneCompany?.name}
      </h1>

      <p className="mt-4 text-sm text-base-content/70 leading-relaxed">
        <span className="font-semibold">Deskripsi:</span>
        <br />
        {oneCompany?.description}
      </p>
    </div>

    {/* ================= ROW 2 LEFT (MAP) ================= */}
    <div className="h-80 rounded-2xl overflow-hidden shadow">
      <iframe
        title="map"
        className="w-full h-full"
        src={oneCompany?.address || ""}
      />
    </div>

    {/* ================= ROW 2 RIGHT (TABLE + BUTTON) ================= */}
    <div className="flex flex-col gap-6">

      {/* TABLE */}
      <div className="border border-blue-300 rounded-2xl overflow-hidden bg-base-100 shadow">
        <table className="w-full text-sm">
          <thead className="bg-blue-200 text-gray-800">
            <tr>
              <th className="p-4 text-left">Nama</th>
              <th className="p-4 text-center">Kelas</th>
              <th className="p-4 text-center">NIS</th>
              <th className="p-4 text-center">Jurusan</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {oneCompany?.students?.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-base-200 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C1C8FF]" />
                  <span>{item.name}</span>
                </td>

                <td className="p-4 text-center">{item.class}</td>
                <td className="p-4 text-center">{item.nomorInduk}</td>
                <td className="p-4 text-center">{item.major}</td>

                <td className="p-4 text-center">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold capitalize ${statusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BUTTON */}
      {role === "STUDENT" && (
        <button
          className="px-10 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition w-fit"
          onClick={() => {
            if (oneCompany?.id) apply(oneCompany.id);
          }}
        >
          APPLY
        </button>
      )}
    </div>
  </div>
</div>
    </div>
  );
};

export default RequestPage;
