import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Plus, Save, Building2, AlignLeft, MapPin, Users, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { listed } from "@/constant/listed";
import companyStore from "../../store/company.store";

const AddPerusahaan = () => {
const navigate = useNavigate();
const { create, update, showOne, oneCompany, isLoading } = companyStore();
const [searchParams] = useSearchParams();
const [idCompany, setIdCompany] = useState('');
const [theme, setTheme] = useState<"lofi" | "night">("night");

const isNight = theme === "night";

const [listPerusahaan, setListPerusahaan] = useState([
{ name: "", description: "", address: "", maps: "", capacity: "", logo: null as File | null | string, preview: null as string | null },
]);

const styles = {
bg: isNight ? "bg-[#0a0a0a]" : "bg-[#f8fafc]",
card: isNight ? "bg-[#171717] border-white/10" : "bg-white border-slate-200 shadow-sm",
textMain: isNight ? "text-slate-100" : "text-slate-900",
textSub: isNight ? "text-slate-400" : "text-slate-500",
input: isNight ? "bg-[#0a0a0a] border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500" : "bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
};

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
const newData = [...listPerusahaan] as any;
newData[index][field] = value;
setListPerusahaan(newData);
};

const handleAddForm = () => {
setListPerusahaan([...listPerusahaan, { name: "", description: "", address: "", maps: "", capacity: "", logo: null, preview: null }]);
};

useEffect(() => {
const id = searchParams.get("id");
if (id) {
setIdCompany(id);
showOne(id);
}
}, [searchParams]);

useEffect(() => {
if (oneCompany && idCompany) {
setListPerusahaan([{
name: oneCompany.name || '',
description: oneCompany.description || '',
address: oneCompany.address || '',
maps: oneCompany.maps || '',
capacity: String(oneCompany.capacity) || '',
logo: null,
preview: oneCompany.logo || null,
}]);
}
}, [oneCompany]);

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
const formData = new FormData();
if (idCompany !== '') {
const p = listPerusahaan[0];
formData.append('name', p.name);
formData.append('description', p.description);
formData.append('address', p.address);
formData.append('maps', p.maps);
formData.append('capacity', p.capacity);
if (p.logo instanceof File) formData.append('logo', p.logo);
await update(idCompany, formData);
} else {
listPerusahaan.forEach((p, i) => {
formData.append(`name[${i}]`, p.name);
formData.append(`description[${i}]`, p.description);
formData.append(`address[${i}]`, p.address);
formData.append(`maps[${i}]`, p.maps);
formData.append(`capacity[${i}]`, p.capacity);
if (p.logo instanceof File) formData.append(`logo`, p.logo);
});
await create(formData);
}
navigate(listed.PerusahaanPage);
};

return (
<div className={`min-h-screen ${styles.bg} ${styles.textMain} transition-colors duration-300 overflow-x-hidden text-left pb-20`}>
<Navbar toggleTheme={() => setTheme(p => p === 'lofi' ? 'night' : 'lofi')} theme={theme} />

<div className="max-w-5xl mx-auto px-6 pt-12">
<button 
onClick={() => navigate(listed.PerusahaanPage)}
className={`flex items-center gap-2 text-sm font-medium ${styles.textSub} hover:${styles.textMain} transition-colors mb-6`}
>
<ArrowLeft size={16} /> Back to Directory
</button>

<div className="mb-8">
<h1 className="text-3xl font-bold tracking-tight mb-2">{idCompany ? 'Edit Company' : 'Add Company'}</h1>
<p className={`text-sm ${styles.textSub}`}>
Fill in the company details. All fields are required.
</p>
</div>

<form onSubmit={handleSubmit} className="flex flex-col gap-6">
<AnimatePresence>
{listPerusahaan.map((item, index) => (
<motion.div 
key={index}
layout
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
className={`p-6 rounded-xl border ${styles.card} grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8`}
>
{/* Logo Upload */}
<div className="flex flex-col gap-2">
<label className="text-sm font-medium">Company Logo</label>
<div className={`relative w-full aspect-square rounded-xl border-2 border-dashed ${styles.input} flex items-center justify-center overflow-hidden hover:border-blue-500 transition-colors`}>
{item.preview ? (
<img src={item.preview} className="w-full h-full object-contain p-2" />
) : (
<div className="flex flex-col items-center gap-2 text-slate-400">
<Camera size={24} />
<span className="text-xs">Upload Logo</span>
</div>
)}
<input type="file" onChange={(e) => handleFotoChange(index, e)} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
</div>
</div>

{/* Form Fields */}
<div className="grid grid-cols-1 gap-4">
<div className="flex flex-col gap-1.5">
<label className="text-sm font-medium flex items-center gap-2"><Building2 size={14}/> Company Name</label>
<input type="text" value={item.name} onChange={(e) => handleChange(index, "name", e.target.value)} className={`w-full p-2.5 text-sm rounded-lg border ${styles.input} outline-none`} placeholder="e.g. Acme Corp" required />
</div>

<div className="flex flex-col gap-1.5">
<label className="text-sm font-medium flex items-center gap-2"><AlignLeft size={14}/> Description</label>
<textarea value={item.description} onChange={(e) => handleChange(index, "description", e.target.value)} className={`w-full p-2.5 text-sm rounded-lg border ${styles.input} outline-none h-24 resize-none`} placeholder="Brief description of the company..." required />
</div>

<div className="flex flex-col gap-1.5">
<label className="text-sm font-medium flex items-center gap-2"><AlignLeft size={14}/> Alamat</label>
<textarea value={item.address} onChange={(e) => handleChange(index, "address", e.target.value)} className={`w-full p-2.5 text-sm rounded-lg border ${styles.input} outline-none h-24 resize-none`} placeholder="Brief description of the company..." required />
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="flex flex-col gap-1.5">
<label className="text-sm font-medium flex items-center gap-2"><MapPin size={14}/> Link Gmaps</label>
<input type="text" value={item.maps} onChange={(e) => handleChange(index, "maps", e.target.value)} className={`w-full p-2.5 text-sm rounded-lg border ${styles.input} outline-none`} placeholder="Full address" required />
</div>
<div className="flex flex-col gap-1.5">
<label className="text-sm font-medium flex items-center gap-2"><Users size={14}/> Intern Capacity</label>
<input type="number" value={item.capacity} onChange={(e) => handleChange(index, "capacity", e.target.value)} className={`w-full p-2.5 text-sm rounded-lg border ${styles.input} outline-none`} placeholder="0" required min="1" />
</div>
</div>
</div>
</motion.div>
))}
</AnimatePresence>

<div className="flex items-center justify-between pt-6 mt-4 border-t border-white/10">
{!idCompany ? (
<button 
type="button" 
onClick={handleAddForm}
className={`text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-2`}
>
<Plus size={16} /> Add another company
</button>
) : <div/>}

<button 
type="submit" 
disabled={isLoading}
className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
>
<Save size={16} />
{isLoading ? 'Saving...' : 'Save Data'}
</button>
</div>
</form>
</div>
</div>
);
};

export default AddPerusahaan;