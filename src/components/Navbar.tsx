import { listed } from "@/constant/listed";
import { FC } from "react";

import { CiCircleList, CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import { useEffect } from "react";
interface NavbarProps {
  toggleTheme: () => void;
  theme: "lofi" | "night";
}

const Navbar: FC<NavbarProps> = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    // TODO: Add allUser function or remove if not needed
  }, []);

  const ChangRole = () => {
    navigate(listed.selectRole);
  };

  const logoutHandler = () => {
    logout();
    navigate(`${listed.signin}`);
  };
  return (
    <div className="navbar bg-base-100 shadow px-5 items-center z-50">
      <div className="navbar-start">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button block lg:hidden text-xl cursor-pointer"
        >
          <CiCircleList />
        </label>
          <div className="absolute top-4 left-6" /*onClick={() => navigate(listed.MainPage)}*/>
            <img src="src/assets/logo 4kl.png" alt="m" className="h-10 w-auto drop-shadow-lg"
         />
          </div>
      </div>

      <div className="navbar-end gap-4">
        <label className="toggle text-base-content">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "night"}
          />
          <CiSun aria-label="enable" />
          <FaMoon aria-label="disabled" />
        </label>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-5 shadow gap-4"
          >
          
            <li>
              <a onClick={ChangRole} className="font-bold text-sm">
                Change Role
              </a>
            </li>
            <li className="text-red-500">
              <a onClick={logoutHandler} className="font-bold text-sm">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
