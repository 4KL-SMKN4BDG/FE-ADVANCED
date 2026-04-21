import { useState, FC, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import logoDark from "@/assets/logo/logo dark.png";
import logoLight from "@/assets/logo/logo white.png";
import { ConfettiEmoji } from "./ui/LoveConferty";

const LayoutAdmin: FC = () => {
  const [theme, setTheme] = useState<"lofi" | "night">("lofi");
  const [animating, setAnimating] = useState(false);
  const [animationTheme, setAnimationTheme] = useState<"lofi" | "night">(theme);
  const [logo, setLogo] = useState(logoDark);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "lofi"
      | "night"
      | null;
    if (storedTheme === "lofi" || storedTheme === "night") {
      setTheme(storedTheme);
      setAnimationTheme(storedTheme);
      setLogo(storedTheme === "lofi" ? logoDark : logoLight);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: "lofi" | "night" = theme === "lofi" ? "night" : "lofi";
    setAnimationTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setAnimating(true);
    setLogo(newTheme === "lofi" ? logoDark : logoLight);
    setTimeout(() => {
      setTheme(newTheme);
      setAnimating(false);
    }, 100);
  };

  return (
    <div
      className="relative h-screen w-full overflow-x-hidden"
      data-theme={theme}
    >
      {animating && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div
            className="theme-transition absolute top-0 right-25"
            style={{
              width: "100px",
              height: "100px",
              backgroundColor:
                animationTheme === "lofi" ? "#E0F7FA" : "#374151",
            }}
          />
        </div>
      )}

      <div className="flex h-full bg-base-200 ">
        <div className="flex-shrink-0 h-full z-50">
          <Sidebar logo={logo} />
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="flex">
            <Navbar toggleTheme={toggleTheme} theme={theme} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
          <div className="flex justify-center">
            <span className="text-sm text-gray-500 py-2 flex gap-1">
              made with <ConfettiEmoji /> by developer
              <a
                href="http://curaweda.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                &copy; PT Curaweda Palagan Innotech @{new Date().getFullYear()}
              </a>
            </span>
          </div>
        </div>
      </div>

      <style>{`
      .theme-transition {
        border-radius: 9999px;
        transform: scale(0);
        animation: expand 0.6s forwards;
      }
      @keyframes expand {
        to {
          transform: scale(50);
        }
      }
    `}</style>
    </div>
  );
};

export default LayoutAdmin;
