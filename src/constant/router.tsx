import { createBrowserRouter } from "react-router-dom";
import { listed } from "./listed";
import SignIn from "@/pages/USER/Login";
import ResetPass from "@/pages/USER/ResetPass";
import Dashboard from "@/pages/ADMIN/Dashboard";
import PerusahaanPage from "@/pages/ADMIN/PerusahaanPages";
import SiswaPage from "@/pages/ADMIN/AddSiswa";
import GuruPage from "@/pages/ADMIN/Guru";
import AddPerusahaan from "@/pages/ADMIN/AddPerusahaan";
import EditPerusahaan from "@/pages/ADMIN/EditPerusahaan";
import View from "@/pages/ADMIN/View";
import AddSiswa from "@/pages/ADMIN/AddSiswa";
import AddGuru from "@/pages/ADMIN/AddGuru";
import MainPage from "@/pages/USER/mainpage";
import RequestPage from "@/pages/USER/requestpage";
import SplashScreen from "@/pages/USER/SplashScreen";
import ForgotPass from "@/pages/USER/ForgotPass";

const Route: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: listed.signin,
    element: <SignIn />,
  },
  {
    path: listed.resetpass,
    element: <ResetPass/>,
  },
  {
    path: listed.MainPage,
    element: <MainPage />,
  },
  {
    path: listed.RequestPage,
    element: <RequestPage />,
  },
  {
    path: listed.SplashScreen,
    element: <SplashScreen />
  },
  {
    path: listed.forgotpass,
    element: <ForgotPass />
  },

  // ADMIN PAGES
  {
    path: listed.PerusahaanPage,
    element: <PerusahaanPage />,
  },
  {
    path: listed.SiswaPage,
    element: <SiswaPage />,
  },
  {
    path: listed.UserPage,
    element: <GuruPage />,
  },
  {
    path: listed.AddPerusahaan,
    element: <AddPerusahaan />,
  },
    {
    path: listed.EditPerusahaan,
    element: <EditPerusahaan />,
  },
    {
    path: listed.View,
    element: <View />
  },
  {
    path: listed.AddUser,
    element: <AddSiswa />,
  },
  {
    path: listed.AddGuru,
    element: <AddGuru />,
  },
  {
    path: listed.dashboard,
    element: <Dashboard />,
  },
]);

export default Route;
