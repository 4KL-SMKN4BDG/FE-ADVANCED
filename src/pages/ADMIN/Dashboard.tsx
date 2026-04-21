import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Building2, Users, GraduationCap, ArrowRight, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { listed } from "@/constant/listed";
import useAuthStore from "@/store/auth.store";

const DashboardAdmin = () => {
const navigate = useNavigate();
const { user } = useAuthStore();
const [theme, setTheme] = useState<"lofi" | "night">("night"); // Default Dark Mode

const toggleTheme = () => setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
const isNight = theme === "night";
const isAdmin = user?.roles?.[0]?.code === "ADMIN";

const styles = {
bg: isNight ? "bg-[#0a0a0a]" : "bg-[#f8fafc]",
card: isNight ? "bg-[#171717] border-white/10 hover:border-white/20" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm",
textMain: isNight ? "text-slate-100" : "text-slate-900",
textSub: isNight ? "text-slate-400" : "text-slate-500",
};

const allCards = [
{
title: "Companies",
subtitle: "Manage industrial partners",
icon: <Building2 size={24} className="text-blue-500" />,
path: listed.PerusahaanPage,
show: true 
},
{
title: "Teachers",
subtitle: "Manage advisor data",
icon: <Users size={24} className="text-emerald-500" />,
path: `${listed.UserPage}?role=teacher`,
show: true 
},
{
title: "Students",
subtitle: "Manage trainee data",
icon: <GraduationCap size={24} className="text-amber-500" />,
path: `${listed.UserPage}?role=student`,
show: true 
},
{
title: "My Profile",
subtitle: "Account settings & identity",
icon: <UserCircle size={24} className="text-purple-500" />,
path: listed.profile,
show: !isAdmin 
},
];

const visibleCards = allCards.filter(card => card.show);

return (
<div className={`min-h-screen ${styles.bg} ${styles.textMain} transition-colors duration-300 font-sans pb-20 text-left`}>
<Navbar toggleTheme={toggleTheme} theme={theme} />

<div className="max-w-6xl mx-auto px-6 pt-16">
{/* HEADER DASHBOARD */}
<div className="mb-12">
<h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
{isAdmin ? "Admin Workspace" : "Dashboard"}
</h1>
<p className={`text-base ${styles.textSub}`}>
Welcome back, {user?.name || 'User'}.
</p>
</div>

{/* GRID MODULES */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
{visibleCards.map((card, i) => (
<motion.div
key={i}
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: i * 0.1 }}
whileHover={{ y: -4 }}
onClick={() => navigate(card.path)}
className={`group cursor-pointer ${styles.card} border rounded-2xl p-6 transition-all duration-300 flex flex-col h-[200px]`}
>
{/* Ikon */}
<div className={`w-12 h-12 rounded-xl mb-auto flex items-center justify-center ${isNight ? 'bg-white/5' : 'bg-slate-50'}`}>
{card.icon}
</div>

{/* Text */}
<div>
<h3 className="text-lg font-semibold tracking-tight mb-1 group-hover:text-blue-500 transition-colors">
{card.title}
</h3>
<p className={`text-sm ${styles.textSub} mb-4`}>
{card.subtitle}
</p>

{/* Animated Link */}
<div className="flex items-center gap-2 text-sm font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
Open Module <ArrowRight size={16} />
</div>
</div>
</motion.div>
))}
</div>

</div>
</div>
);
};

export default DashboardAdmin;