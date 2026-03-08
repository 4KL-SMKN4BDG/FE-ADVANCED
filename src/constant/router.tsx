import { createBrowserRouter } from "react-router-dom";
import { listed } from "./listed";
import SignIn from "@/pages/USER/Login";
import ResetPass from "@/pages/USER/ResetPass";
import Dashboard from "@/pages/ADMIN/Dashboard";
import PerusahaanPage from "@/pages/ADMIN/PerusahaanPages";
import SiswaPage from "@/pages/ADMIN/AddSiswa";
import GuruPage from "@/pages/ADMIN/Guru";
import AddPerusahaan from "@/pages/ADMIN/AddPerusahaan";
import AddSiswa from "@/pages/ADMIN/AddSiswa";
import AddGuru from "@/pages/ADMIN/AddGuru";
import MainPage from "@/pages/USER/mainpage";
import RequestPage from "@/pages/USER/requestpage";
import SplashScreen from "@/pages/USER/SplashScreen";

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
    path: listed.dashboard,
    element: <Dashboard />,
  },
  {
    path: listed.RequestPage,
    element: <RequestPage />,
  },
  {
    path: listed.SplashScreen,
    element: <SplashScreen />
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
    path: listed.GuruPage,
    element: <GuruPage />,
  },
  {
    path: listed.AddPerusahaan,
    element: <AddPerusahaan />,
  },
  {
    path: listed.AddSiswa,
    element: <AddSiswa />,
  },
  {
    path: listed.AddGuru,
    element: <AddGuru />,
  },
  {
    path: listed.MainPage,
    element: <MainPage />,
  },
]);

export default Route;
