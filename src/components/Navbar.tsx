import { listed } from "@/constant/listed";
import { FC } from "react";
import { CiCircleList, CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import { motion } from "framer-motion";
import { User, LogOut, Settings } from "lucide-react";

interface NavbarProps {
toggleTheme: () => void;
theme: "lofi" | "night";
}

const Navbar: FC<NavbarProps> = ({ toggleTheme, theme }) => {
const navigate = useNavigate();
const { logout, user } = useAuthStore();
const isNight = theme === "night";

const logoutHandler = () => {
logout();
navigate(`${listed.signin}`);
};

const styles = {
glass: isNight 
? "bg-[#050B14]/90 backdrop-blur-md border-b border-white/5" 
: "bg-white/90 backdrop-blur-md border-b border-slate-200",
text: isNight ? "text-white" : "text-slate-900",
accent: isNight ? "text-cyan-400" : "text-blue-600",
dropdown: isNight ? "bg-[#0A1929] border border-white/10" : "bg-white border border-slate-200",
};

return (
<div className={`navbar ${styles.glass} sticky top-0 px-6 h-20 items-center z-[100] transition-all duration-300`}>

<div className="navbar-start flex items-center gap-4">
<label
htmlFor="my-drawer-2"
className={`drawer-button block lg:hidden text-2xl cursor-pointer ${styles.text}`}
>
<CiCircleList />
</label>

<motion.div 
whileHover={{ opacity: 0.8 }}
className="cursor-pointer flex items-center gap-3"
onClick={() => navigate(listed.dashboard)}
>
<img src="src/assets/logo 4kl.png" alt="Logo" className="h-9 w-auto grayscale brightness-200" />
<div className="hidden md:flex flex-col items-start leading-none border-l border-white/10 pl-3">
<span className={`text-[11px] font-black tracking-widest ${styles.text}`}>SIM_PKL</span>
<span className={`text-[8px] font-mono opacity-40 uppercase ${styles.text}`}>Industrial_System</span>
</div>
</motion.div>
</div>

<div className="navbar-end gap-6">

{/* THEME SWITCHER CLEAN */}
<div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-black/10 dark:bg-white/5 border border-white/5">
<CiSun className={`${!isNight ? styles.accent : 'opacity-20'} text-xl`} />
<input
type="checkbox"
className="toggle toggle-xs bg-white border-none checked:bg-cyan-500"
onChange={toggleTheme}
checked={isNight}
/>
<FaMoon className={`${isNight ? styles.accent : 'opacity-20'} text-sm`} />
</div>

{/* PROFILE SECTION */}
<div className="dropdown dropdown-end">
<div
tabIndex={0}
role="button"
className="flex items-center gap-3 group transition-all"
>
<div className="hidden md:flex flex-col items-end leading-none text-right">
<span className={`text-[10px] font-black uppercase tracking-widest ${styles.text}`}>
{user?.name?.split(' ')[0] || "GUEST"}
</span>
<span className="text-[8px] font-mono opacity-30 uppercase tracking-widest">
{user?.roles?.[0]?.code || "USER"}
</span>
</div>

<div className={`w-10 h-10 rounded-lg border ${isNight ? 'border-white/10' : 'border-slate-300'} overflow-hidden`}>
<img
alt="Profile"
src={user?.profilePhoto || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
/>
</div>
</div>

<ul
tabIndex={0}
className={`menu menu-sm dropdown-content ${styles.dropdown} ${styles.text} rounded-xl mt-4 w-52 p-2 shadow-2xl gap-1 font-bold uppercase tracking-widest text-left`}
>
<li>
<a onClick={() => navigate(listed.profile)} className="flex items-center gap-3 py-3 hover:bg-white/5 rounded-lg transition-all">
<User size={14} className={styles.accent} />PROFILE
</a>
</li>

<li>
<a className="flex items-center gap-3 py-3 opacity-30 cursor-not-allowed">
<Settings size={14} /> SETTINGS
</a>
</li>

<div className="h-[1px] bg-white/5 my-1" />

<li>
<a onClick={logoutHandler} className="flex items-center gap-3 py-3 text-red-500 hover:bg-red-500/5 rounded-lg transition-all">
<LogOut size={14} /> LOGOUT
</a>
</li>
</ul>
</div>
</div>
</div>
);
};

export default Navbar;