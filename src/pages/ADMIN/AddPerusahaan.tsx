import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { listed } from "@/constant/listed";
import fotoDepan from "../../assets/fotodepansmk.jpeg";
import companyStore from "../../store/company.store";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const AddPerusahaan = () => {
const navigate = useNavigate();
const { create, update, showOne, oneCompany } = companyStore();
const [searchParams] = useSearchParams();
const [idCompany, setIdCompany] = useState('');

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
    logo: null as File | null | string,
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

useEffect(() => {
    const id = searchParams.get("id")
    if (id) setIdCompany(id)
}, [searchParams])

useEffect(() => {
    if (idCompany) {
        showOne(idCompany);
    };
}, [idCompany]);

useEffect(() => {
    if (oneCompany && idCompany) {
        const cap = String(oneCompany.capacity)
    setListPerusahaan([
        {
            name: oneCompany.name || '',
            description: oneCompany.description || '',
            address: oneCompany.address || '',
            capacity: cap || '',
            logo: null,
            preview: oneCompany.logo || null,

        }
    ])
    };
}, [oneCompany]);

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();

if (idCompany != '') {
    const perusahaan = listPerusahaan[0];

    formData.append('name', perusahaan.name);
    formData.append('description', perusahaan.description);
    formData.append('address', perusahaan.address);
    formData.append('capacity', perusahaan.capacity);
    if (perusahaan.logo) formData.append('logo', perusahaan.logo);

    update(idCompany, formData);
} else {
    for (let i = 0; i < listPerusahaan.length; i++) {
    const perusahaan = listPerusahaan[i];
    
    formData.append(`name[${i}]`, perusahaan.name);
    formData.append(`description[${i}]`, perusahaan.description);
    formData.append(`address[${i}]`, perusahaan.address);
    formData.append(`capacity[${i}]`, String(perusahaan.capacity));
    if (perusahaan.logo) formData.append(`logo`, perusahaan.logo);
    }

    create(formData);
}
setIdCompany('')
setListPerusahaan([
{
        name: '',
        description: '',
        address: '',
        capacity: '',
        logo: null,
        preview: null
    }
])
navigate(listed.PerusahaanPage)
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
            <button onClick={() => {
                setIdCompany('')
                setListPerusahaan([
                {
                    name: '',
                    description: '',
                    address: '',
                    capacity: '',
                    logo: null,
                    preview: null
                }
                ])
                navigate(listed.PerusahaanPage)
                }} 
                className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline">
            <ArrowLeft size={18} />Kembali</button>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-base-100 rounded-xl shadow p-8 flex flex-col gap-6"
                >
                {listPerusahaan.map((item, index) => (
                    <div
                    key={index}
                    className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 border-b pb-6"
                    >
                    {/* ================= FOTO ================= */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-[250px] h-[250px] rounded-xl overflow-hidden shadow bg-base-200 flex items-center justify-center">
                        {item.preview ? (
                            <img
                            src={item.preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-400 text-sm text-center px-4">
                            Pilih Foto Perusahaan
                            </span>
                        )}
                        </div>

                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFotoChange(index, e)}
                        className="file-input file-input-bordered file-input-sm w-full"
                        />
                    </div>

                    {/* ================= FORM INPUT ================= */}
                    <div className="flex flex-col gap-5">

                        {/* Nama */}
                        <div>
                        <label className="text-sm font-semibold">
                            Nama Perusahaan
                        </label>
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                            }
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
                            onChange={(e) =>
                            handleChange(index, "description", e.target.value)
                            }
                            className="textarea textarea-bordered w-full mt-1 h-28"
                        />
                        </div>

                        {/* ROW 2 KOLOM */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Alamat */}
                        <div>
                            <label className="text-sm font-semibold">
                            Alamat / Link
                            </label>
                            <input
                            type="text"
                            value={item.address}
                            onChange={(e) =>
                                handleChange(index, "address", e.target.value)
                            }
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
                            onChange={(e) =>
                                handleChange(index, "capacity", e.target.value)
                            }
                            className="input input-bordered w-full mt-1"
                            />
                        </div>

                        </div>
                    </div>
                    </div>
                ))}

                {/* ================= ACTION BUTTON ================= */}
                <div className="flex justify-between items-center">
                    {!idCompany && (
                    <button
                        type="button"
                        onClick={handleAddForm}
                        className="btn btn-secondary"
                    >
                        + Tambah Form
                    </button>
                    )}

                    <button type="submit" className="btn btn-primary w-40">
                    Simpan
                    </button>
                </div>
                </form>
        </div>
    </div>
);
};

export default AddPerusahaan;
