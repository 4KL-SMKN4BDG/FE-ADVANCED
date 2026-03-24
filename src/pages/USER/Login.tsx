import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { Eye, EyeOff} from 'lucide-react';
import { SignIn } from '@/type/sign';
import Input from '@/components/ui/InputField';
import useAuthStore from '../../store/auth.store';
import { useNavigate } from 'react-router-dom';
import { listed } from '@/constant/listed';

const Login = () => {
  const session = localStorage.getItem('refresh');
  // const [showPassword, setShowPassword] = useState(false);
  const { login, error, user } = useAuthStore();
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: {
      nomorInduk: '', // NIS
      password: '',
    },
    resolver: yupResolver(
      yup.object({
        nomorInduk: yup.string().required('NIS wajib diisi'),
        password: yup.string().required('Password wajib diisi'),
      })
    ),
  });

  useEffect(() => {
    if (session) navigate(listed.dashboard);
    else navigate(listed.signin);
  }, [session, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (user) navigate(listed.dashboard);
  }, [user, navigate]);

  const onSubmit = async (data: SignIn) => {
    await login(data);
    localStorage.setItem('userId', user?.id || '');
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f6f4ef]">
      {/* LOGO */}
        <div className="absolute top-6 left-6">
        <img src="/src/assets/logosmkn4.png" alt="Logo SMK" className="h-15 w-auto drop-shadow-lg"/>
        </div>
      {/* LEFT SECTION - FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-12 bg-[#f6f4ef]">
        <div className="w-full max-w-md flex flex-col gap-8 relative">

          

          {/* TITLE */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Sign in to your account
            </h1>
            <p className="text-sm text-gray-500">
              Masuk menggunakan akun Anda
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

            {/* NIS */}
            <Input  
              type="text"
              inputMode="numeric"
              placeholder="NIS"
              error={errors?.nomorInduk}
              {...register('nomorInduk')}
            />

            {/* PASSWORD */}
              <Input
                type="password"
                placeholder="PASSWORD"
                error={errors?.password}
                {...register("password")}
                />

            {/* FORGOT PASSWORD */}
            <button type="button"
              onClick={() => navigate(listed.forgotpass)}
              className="text-sm text-blue-600 hover:underline block"
            >
              Forgot Password?
            </button>
            {/* BUTTON */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3
                         bg-blue-600 text-white rounded-xl font-semibold
                         hover:bg-blue-700 transition"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SECTION - IMAGE */}
      <div
        className="hidden md:block w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/fotodepansmk.jpeg')",
        }}
      >
        {/* LOGO PKI */}
        <div className="absolute top-6 right-6">
          <img
            src="/src/assets/Logo nobg (1).png"
            alt="Logo PKI"
            className="h-12 w-auto drop-shadow-lg"
          />
        </div>
      </div>

    </div>
  );
};

export default Login;
