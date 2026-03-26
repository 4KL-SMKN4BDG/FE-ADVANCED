import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { listed } from "@/constant/listed";
import fotoDepan from "../../assets/fotodepansmk.jpeg";
import companyStore from "../../store/company.store";

const AddPerusahaan = () => {
const navigate = useNavigate();
const { create } = companyStore();
const formData = new FormData();

const [theme, setTheme] = useState<"lofi" | "night">("lofi");
const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
};

const [listPerusahaan, setListPerusahaan] = useState([
    {
    name: "",
    description: "",
    address: "",
    capacity: "",
    logo: null as File | null,
    preview: null as string | null
    },
]);

const handleFotoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const newData = [...listPerusahaan];
        newData[index].logo = file;
        newData[index].preview = URL.createObjectURL(file);
        setListPerusahaan(newData);
    }
};

const handleChange = (index: number, field: string, value: any) => {
    const newData = [...listPerusahaan];
    newData[index][field] = value;
    setListPerusahaan(newData);
};

const handleAddForm = () => {
    setListPerusahaan([
        ...listPerusahaan,
        {
        name: "",
        description: "",
        address: "",
        capacity: "",
        logo: null,
        preview: null
        },
    ]);
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // const DataCreatePerusahaan = listPerusahaan.map((item) => ({
    //     name: item.name,
    //     description: item.description,
    //     address: item.address,
    //     capacity: item.capacity,
    //     logo: item.logo,
    // }));
    
    for (let i = 0; i < listPerusahaan.length; i++) {
    const perusahaan = listPerusahaan[i];
        console.log(perusahaan.logo)
    formData.append(`name[${i}]`, perusahaan.name)
    formData.append(`description[${i}]`, perusahaan.description)
    formData.append(`address[${i}]`, perusahaan.address)
    formData.append(`capacity[${i}]`, String(perusahaan.capacity))
    if (perusahaan.logo) formData.append(`logo`, perusahaan.logo)
    }

    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(key, value.name)
        } else {
        console.log(key, value)
        }
    };

    create(formData);
    // navigate("/admin/perusahaan");
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
        <h1 className="text-white text-3xl font-bold tracking-widest">
            Perusahaan
        </h1>
        </div>
    </div>

      {/* CONTENT */}
    <div className="max-w-6xl mx-auto px-6 py-8">

            {/* BACK */}
            <button onClick={() => navigate(listed.PerusahaanPage)} className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline">
            <ArrowLeft size={18} />Kembali</button>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-base-100 rounded-xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                {listPerusahaan.map((item, index) => (
                <div key={index} className="bg-base-100 rounded-xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                        {/* FOTO */}
                  <div className="flex flex-col items-center justify-center gap-3 h-full">

                    <div className="w-48 h-48 rounded-xl overflow-hidden shadow bg-base-200 flex items-center justify-center">
                        {item.preview ? (
                            <img
                                src={item.preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-400 text-sm">
                                Pilih Foto Perusahaan
                            </span>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFotoChange(index, e)}
                        className="file-input file-input-bordered file-input-sm max-w-xs mx-auto mt-4"
                    />
                </div>

                {/* INPUT */}
                <div className="md:col-span-2 flex flex-col gap-4">

                    {/* Nama Perusahaan */}
                    <div>
                        <label className="text-sm font-semibold">
                            Nama Perusahaan
                        </label>
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                            className="input input-bordered w-full mt-1"
                            required
                        />
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="text-sm font-semibold">
                            Deskripsi
                        </label>
                        <textarea
                            value={item.description}
                            onChange={(e) => handleChange(index, "description", e.target.value)}
                            className="textarea textarea-bordered w-full mt-1 h-24"
                        />
                    </div>

                    {/* Row bawah */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* Alamat */}
                        <div>
                            <label className="text-sm font-semibold">
                                Alamat / Link
                            </label>
                            <input
                                type="text"
                                value={item.address}
                                onChange={(e) => handleChange(index, "address", e.target.value)}
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        {/* Kapasitas */}
                        <div>
                            <label className="text-sm font-semibold">
                                Kapasitas
                            </label>
                            <input
                                type="number"
                                value={item.capacity}
                                onChange={(e) => handleChange(index, "capacity", e.target.value)}
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                    </div>
                </div>
                </div>
                        ))}
                <button
                type="button"
                onClick={handleAddForm}
                className="btn btn-secondary mb-4">
                    + Tambah Form
                </button>

                    <button className="btn btn-primary w-40 mt-2">
                        Simpan
                    </button>

                </form>
        </div>
    </div>
);
};

export default AddPerusahaan;
