import { useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { SignIn } from "@/type/sign";
import useAuthStore from "../../store/auth.store";
import { useNavigate, Link } from "react-router-dom";
import { listed } from "@/constant/listed";
import { LogIn, Loader2 } from "lucide-react";

const Login = () => {
  const session = localStorage.getItem("refresh");
  const { login, error, user, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: {
      nomorInduk: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object({
        nomorInduk: yup.string().required("ID Number is required"),
        password: yup.string().required("Password is required"),
      })
    ),
  });

  useEffect(() => {
    if (session) navigate(listed.dashboard);
  }, [session, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Sign In Failed",
        text: error,
        background: "#171717",
        color: "#f1f5f9",
        confirmButtonColor: "#2563eb",
        customClass: {
          popup: "border border-white/10 rounded-2xl",
        },
      });
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      navigate(listed.dashboard);
    }
  }, [user, navigate]);

  const onSubmit = async (data: SignIn) => {
    await login(data);
    if (useAuthStore.getState().user?.id) {
      localStorage.setItem("userId", useAuthStore.getState().user!.id);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] text-slate-100 font-sans relative overflow-hidden px-4">
      {/* MESH GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/15 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />

      {/* LOGO */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8"
      >
        <img
          src="/src/assets/logosmkn4.png"
          alt="Logo"
          className="h-10 w-auto opacity-90"
        />
      </motion.div>

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="relative z-10 w-full max-w-[400px] bg-[#171717] rounded-2xl shadow-2xl border border-white/10 p-8 sm:p-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-slate-400">
            Please enter your details to sign in.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* INPUT ID NUMBER */}
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-medium text-slate-300">
                ID Number (NIS/NIP)
              </label>
              <input
                type="text"
                placeholder="Enter your ID number"
                {...register("nomorInduk")}
                className={`w-full bg-[#0a0a0a] border ${errors.nomorInduk ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-white/10 focus:border-blue-500 focus:ring-blue-500"} rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 outline-none transition-all placeholder:text-slate-600`}
              />
              {errors.nomorInduk && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.nomorInduk.message}
                </span>
              )}
            </div>

            {/* INPUT PASSWORD */}
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`w-full bg-[#0a0a0a] border ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-white/10 focus:border-blue-500 focus:ring-blue-500"} rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 outline-none transition-all placeholder:text-slate-600`}
              />
              {errors.password && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          {/* FORGOT PASSWORD LINK */}
          <div className="flex items-center justify-end pt-1">
            <Link
              to={listed.forgotpass}
              className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors shadow-sm mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <LogIn size={18} className="ml-1 opacity-80" />
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-8 text-xs font-medium text-slate-500"
      >
        &copy; {new Date().getFullYear()} E-PKL System. All rights reserved.
      </motion.div>
    </div>
  );
};

export default Login;
