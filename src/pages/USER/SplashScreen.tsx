import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { listed } from "@/constant/listed";

const SplashScreen = () => {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 1200);
    const t3 = setTimeout(() => setStage(3), 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] text-slate-100 font-sans">
      {/* Background mesh/gradient tipis biar gak terlalu flat */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0a0a] to-[#0a0a0a]" />

      <div className="relative z-10 w-full h-full flex flex-col items-start justify-center px-10 md:px-24 max-w-7xl mx-auto">
        {/* Header Text Kiri Atas */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-12 left-10 md:left-24 flex items-center gap-4"
        >
          <img
            src="/src/assets/logosmkn4.png"
            alt="SMK Logo"
            className="h-10 w-auto opacity-90"
          />
          <div className="h-6 w-[1px] bg-white/20" />
          <span className="text-slate-400 font-medium text-sm tracking-wide">
            Enterprise Secure Login
          </span>
        </motion.div>

        {/* Konten Utama Tengah */}
        <div className="flex flex-col items-start max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: stage >= 1 ? 1 : 0,
              scale: stage >= 1 ? 1 : 0.95,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <img
              src="src/assets/logo 4kl.png"
              alt="4KL Logo"
              className="w-[280px] md:w-[400px] object-contain mb-6"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-blue-500 w-5 h-5" />
              <span className="text-blue-500 font-medium text-sm tracking-wide uppercase">
                System Ready
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-8">
              Streamline your workflow with <br />
              <span className="text-blue-500">4KL System</span>.
            </h1>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(listed.signin)}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20"
            >
              Sign in to workspace
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={stage >= 3 ? { opacity: 1 } : {}}
          className="absolute bottom-12 left-10 md:left-24 right-10 md:right-24 flex justify-between items-center text-xs text-slate-500 font-medium"
        >
          <p>v2.0.4 Enterprise Edition</p>
          <p>&copy; {new Date().getFullYear()} E-PKL HUB.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
