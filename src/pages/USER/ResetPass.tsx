import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { listed } from "@/constant/listed";
import Input from "@/components/ui/InputField";
import useAuthStore from "@/store/auth.store";
import { ShieldCheck, ArrowLeft } from "lucide-react";

const schema = yup.object({
  resetToken: yup.string().required("Reset token is missing"),
  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

type ResetPassFormData = {
  resetToken: string;
  password: string;
  confirmPassword: string;
};

export const ResetPass = () => {
  const { resetPassword, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const session = localStorage.getItem("refresh");
  const [searchParams] = useSearchParams();

  const resetToken = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPassFormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      resetToken: resetToken || "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (session) navigate(listed.dashboard);
  }, [session, navigate]);

  const onSubmit = async (data: ResetPassFormData) => {
    await resetPassword({
      resetToken: data.resetToken,
      newPassword: data.password,
    });
    alert("Password has been successfully reset. Please log in.");
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
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Set new password
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                New password
              </label>
              <Input
                type="password"
                placeholder="Enter new password"
                error={errors?.password?.message}
                {...register("password")}
                className="w-full bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                error={errors?.confirmPassword?.message}
                {...register("confirmPassword")}
                className="w-full bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading || !resetToken}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
              isValid && !isLoading && resetToken
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Saving..." : "Reset password"}
          </button>
        </form>

        {!resetToken && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center">
            Invalid or missing reset token in URL.
          </div>
        )}

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

export default ResetPass;
