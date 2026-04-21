import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { listed } from "@/constant/listed";
import Input from "@/components/ui/InputField";
import useAuthStore from "@/store/auth.store";
import { ArrowLeft, KeyRound } from "lucide-react";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

type ForgotPassFormData = {
  email: string;
};

export const ForgotPass = () => {
  const { forgotPassword, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const session = localStorage.getItem("refresh");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPassFormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (session) navigate(listed.dashboard);
  }, [session, navigate]);

  const onSubmit = async (data: ForgotPassFormData) => {
    await forgotPassword({ email: data.email });
    alert("If your email is registered, a reset link will be sent.");
    navigate(listed.signin);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 px-4 font-sans text-left">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/src/assets/logosmkn4.png"
          alt="Logo SMK"
          className="h-12 w-auto drop-shadow-sm"
        />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <KeyRound size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Forgot password?
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Email address
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              error={errors?.email?.message}
              {...register("email")}
              className="w-full bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
              isValid && !isLoading
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Sending..." : "Reset password"}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-8 text-center">
          <Link
            to={listed.signin}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} /> Back to log in
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} E-PKL System. All rights reserved.
      </div>
    </div>
  );
};

export default ForgotPass;
