import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, Users, Send, CheckCircle2, Clock, XCircle, Info, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import companyStore from "@/store/company.store";
import useAuthStore from "@/store/auth.store";
import { listed } from "@/constant/listed";
import { CompanyConfirmAPI } from "@/restApi/company.api";

const getStatusStyle = (status: string | null) => {
const s = (status || "PENDING").toUpperCase();
if (s === "APPROVED") return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
if (s === "REJECTED") return "bg-red-500/10 text-red-500 border-red-500/20";
return "bg-amber-500/10 text-amber-500 border-amber-500/20";
};

const getStatusIcon = (status: string | null) => {
const s = (status || "PENDING").toUpperCase();
if (s === "APPROVED") return <CheckCircle2 size={14} className="mr-1.5" />;
if (s === "REJECTED") return <XCircle size={14} className="mr-1.5" />;
return <Clock size={14} className="mr-1.5" />;
};

const RequestPage: React.FC = () => {
const navigate = useNavigate();
const [theme, setTheme] = useState<"lofi" | "night">("night");
const { user } = useAuthStore();
const role = user?.roles?.[0]?.code === "ADMIN" ? "ADMIN" : "STUDENT";
const toggleTheme = () => setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));

const [searchParams] = useSearchParams();
const idCompany = searchParams.get('id');

const { oneCompany, showOne, apply } = companyStore();

const [localStatuses, setLocalStatuses] = useState<Record<string, string>>({});
const isNight = theme === "night";

useEffect(() => {
if (idCompany) showOne(idCompany);
}, [idCompany, showOne]);

const handleApply = async () => {
if (oneCompany?.id && window.confirm(`Send internship application to ${oneCompany.name}?`)) {
await apply(oneCompany.id);
alert("Application sent successfully!");
showOne(oneCompany.id);
}
};

const handleUpdateStatus = async (studentId: string, studentName: string, newStatus: "APPROVED" | "REJECTED") => {
const actionText = newStatus === "APPROVED" ? "approved" : "reject";

if (window.confirm(`Are you sure you want to ${actionText} ${studentName}'s application?`)) {
setLocalStatuses(prev => ({ ...prev, [studentId]: newStatus }));

try {
// NGIRIM KE API BACKEND
await CompanyConfirmAPI(studentId, newStatus);
if (idCompany) showOne(idCompany);
} catch (error: any) {
console.error("ERROR DARI BACKEND:", error);

// NANGKAP ERROR ASLI DARI BACKEND BIAR KETAHUAN SALAHNYA APA
const backendMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Unknown Error";

setLocalStatuses(prev => {
const newState = { ...prev };
delete newState[studentId];
return newState;
});

// ALERT INI YANG HARUS LU BACA DAN KASIH TAU KE GUE
alert(`SYSTEM REJECTED: Backend menolak data.\n\nPesan dari Backend: "${backendMessage}"\n\nCoba cek apakah backend minta status huruf kecil (APPROVED) atau kurang parameter.`);
}
}
};

const styles = {
bg: isNight ? "bg-[#0a0a0a]" : "bg-[#f8fafc]",
card: isNight ? "bg-[#171717] border-white/5" : "bg-white border-slate-200 shadow-sm",
textMain: isNight ? "text-slate-100" : "text-slate-900",
textSub: isNight ? "text-slate-400" : "text-slate-500",
accent: "text-blue-500",
};

if (!oneCompany) {
return (
<div className={`min-h-screen ${styles.bg} ${styles.textMain} flex flex-col items-center justify-center`}>
<span className="loading loading-spinner loading-lg text-blue-500 mb-4"></span>
<p className={styles.textSub}>Loading company details...</p>
</div>
);
}

return (
<div className={`min-h-screen ${styles.bg} ${styles.textMain} transition-colors duration-300 font-sans text-left pb-20`}>
<Navbar toggleTheme={toggleTheme} theme={theme} />

<div className="max-w-6xl mx-auto px-6 pt-12">
<div className="mb-8">
<button 
onClick={() => navigate(listed.PerusahaanPage)}
className={`flex items-center gap-2 text-sm font-medium ${styles.textSub} hover:${styles.textMain} transition-colors mb-6`}
>
<ArrowLeft size={16} /> Back to Directory
</button>

<h1 className="text-3xl font-bold tracking-tight mb-2">Company Overview</h1>
<p className={`text-sm ${styles.textSub}`}>
Detailed information and internship placements for this partner.
</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
<div className="flex flex-col gap-6">
<motion.div 
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
className={`p-8 rounded-2xl border ${styles.card} flex flex-col sm:flex-row items-start sm:items-center gap-8`}
>
<div className={`w-32 h-32 rounded-2xl flex items-center justify-center shrink-0 border overflow-hidden ${isNight ? 'bg-[#2a2a2a] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
{oneCompany.logo ? (
<img src={oneCompany.logo} alt="Logo" className="w-full h-full object-contain p-2" />
) : (
<Building2 size={48} className={styles.textSub} />
)}
</div>

<div>
<h2 className="text-2xl font-bold mb-3">{oneCompany.name}</h2>
<div className={`flex items-start gap-2 text-sm ${styles.textSub} mb-4`}>
<Info size={16} className="shrink-0 mt-0.5" />
<p className="leading-relaxed max-w-xl">
{oneCompany.description || "No description provided for this company."}
</p>
</div>
</div>
</motion.div>

<motion.div 
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.1 }}
className={`rounded-2xl border ${styles.card} overflow-hidden`}
>
<div className={`px-6 py-4 border-b flex items-center justify-between ${isNight ? 'border-white/5' : 'border-slate-200'}`}>
<h3 className="font-semibold flex items-center gap-2">
<Users size={18} className="text-blue-500" />
Registered Applicants
</h3>
<span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isNight ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
{oneCompany.students?.length || 0} Students
</span>
</div>

<div className="overflow-x-auto">
<table className="w-full text-sm text-left">
<thead className={`text-xs font-semibold ${styles.textSub} ${isNight ? 'bg-[#1a1a1a]' : 'bg-slate-50'} border-b ${isNight ? 'border-white/5' : 'border-slate-200'}`}>
<tr>
<th className="px-6 py-3 font-medium">Student Name</th>
<th className="px-6 py-3 font-medium text-center">Class/Major</th>
<th className="px-6 py-3 font-medium text-center">NIS</th>
<th className="px-6 py-3 font-medium text-center">Status</th>
{role === "ADMIN" && (
<th className="px-6 py-3 font-medium text-center">Action</th>
)}
</tr>
</thead>
<tbody className="divide-y divide-white/5 dark:divide-white/10">
{oneCompany.students && oneCompany.students.length > 0 ? (
oneCompany.students.map((item) => {
const currentStatus = localStatuses[item.id] || item.status;
const isPending = !currentStatus || currentStatus.toUpperCase() === "PENDING";

return (
<tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
<td className="px-6 py-4 font-medium flex items-center gap-3">
<div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isNight ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
{item.name.charAt(0).toUpperCase()}
</div>
{item.name}
</td>
<td className={`px-6 py-4 text-center ${styles.textSub}`}>{item.class || item.major || "-"}</td>
<td className={`px-6 py-4 text-center font-mono text-xs ${styles.textSub}`}>{item.nomorInduk}</td>
<td className="px-6 py-4 text-center">
<span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${getStatusStyle(currentStatus)}`}>
{getStatusIcon(currentStatus)}
{currentStatus || "PENDING"}
</span>
</td>
{role === "ADMIN" && (
<td className="px-6 py-4">
<div className="flex items-center justify-center gap-2">
{isPending ? (
<>
<button 
onClick={() => handleUpdateStatus(item.id, item.name, "APPROVED")}
className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-500/10 transition-colors"
title="approved Applicant"
>
<Check size={18} />
</button>
<button 
onClick={() => handleUpdateStatus(item.id, item.name, "REJECTED")}
className="p-1.5 rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
title="Reject Applicant"
>
<X size={18} />
</button>
</>
) : (
<span className={`text-xs font-medium ${currentStatus === "APPROVED" ? "text-emerald-500" : "text-red-500"}`}>
{currentStatus === "APPROVED" ? "APPROVED" : "Rejected"}
</span>
)}
</div>
</td>
)}
</tr>
);
})
) : (
<tr>
<td colSpan={role === "ADMIN" ? 5 : 4} className={`px-6 py-12 text-center ${styles.textSub}`}>
No applicants found for this company.
</td>
</tr>
)}
</tbody>
</table>
</div>
</motion.div>
</div>

<div className="flex flex-col gap-6">
{role === "STUDENT" && (
<motion.div 
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ delay: 0.2 }}
className={`p-6 rounded-2xl border ${styles.card} flex flex-col gap-4`}
>
<h3 className="font-semibold">Ready to apply?</h3>
<p className={`text-sm ${styles.textSub}`}>
Submit your application for an internship placement at this company. Make sure your profile is complete.
</p>
<button
onClick={handleApply}
className="mt-2 w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
>
<Send size={16} /> Send Application
</button>
</motion.div>
)}

<motion.div 
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.3 }}
className={`p-1 rounded-2xl border ${styles.card} flex flex-col`}
>
<div className="p-5 pb-4 flex items-center gap-2">
<MapPin size={18} className="text-blue-500" />
<h3 className="font-semibold">Location Map</h3>
</div>
<div className={`w-full h-64 rounded-xl overflow-hidden ${isNight ? 'bg-[#2a2a2a]' : 'bg-slate-100'} mx-auto mb-1`} style={{ width: 'calc(100% - 8px)' }}>
{oneCompany.address ? (
<iframe
title="Company Location Map"
className="w-full h-full border-0"
src={oneCompany.address}
loading="lazy"
allowFullScreen
/>
) : (
<div className={`w-full h-full flex flex-col items-center justify-center ${styles.textSub}`}>
<MapPin size={32} className="mb-2 opacity-50" />
<span className="text-sm font-medium">Map data unavailable</span>
</div>
)}
</div>
</motion.div>
</div>

</div>
</div>
</div>
);
};

export default RequestPage; 