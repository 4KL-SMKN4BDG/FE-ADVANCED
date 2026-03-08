import { listed } from "@/constant/listed";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 500);   // fade in center
    const t2 = setTimeout(() => setStage(2), 1500);  // move left + resize
    const t3 = setTimeout(() => setStage(3), 1900);  // text appear
    const t4 = setTimeout(() => setStage(4), 2200);  // button appear

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* STATIC BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/fotodepansmk.jpeg')",
        }}
      />

      {/* PROGRESSIVE BLUR LAYER */}
      <div
        className="absolute inset-0 backdrop-blur-[0px] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          backdropFilter: stage >= 2 ? "blur(5px)" : "blur(0px)",
          backgroundColor: "rgba(0,0,0,0.35)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full">

        {/* LOGO */}
        <img
          src="src/assets/logo 4kl.png"
          alt="4KL Logo"
          className={`
            absolute transition-all duration-[1200ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${stage < 2
              ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              : "top-1/2 left-[70px] -translate-y-1/2"
            }
            ${stage < 2
              ? "w-[795px]"
              : "w-[597.86px]"
            }
            ${stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        />

        {/* LEFT TEXT BLOCK */}
        {/* LOGO */}
        <div className="absolute top-6 left-6">
          
        <img src="/src/assets/logosmkn4.png" alt="Logo SMK" className="h-15 w-auto drop-shadow-lg"/>
        </div>
        
        <div
          className={`
            absolute left-[120px] top-1/2 -translate-y-1/2
            transition-all duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{
            marginTop: "calc(258.31px / 2 + 29px)", // spacing tepat dari logo
          }}
        >
          <p className="text-white text-[22px] leading-relaxed mb-[29px]">
            Permudah urusan pkl mu dengan <span className="font-bold">4KL</span>
          </p>

          <button
            onClick={() => navigate(listed.signin)}
            className={`
              px-8 py-3 rounded-full
              bg-blue-500 text-white font-semibold
              shadow-xl
              hover:bg-blue-600
              transition-all duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            SIGN IN
          </button>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;
