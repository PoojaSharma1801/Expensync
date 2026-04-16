import { useNavigate } from "react-router-dom";
import styles from "../style";
import { ArrowUpRight } from "lucide-react";

const GetStarted = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/login");
  };

  return (
    <div
      className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-[3px] cursor-pointer group hover:scale-105 transition-transform duration-300 shadow-lg shadow-violet-500/25`}
      onClick={handleGetStartedClick}
    >
      <div
        className={`${styles.flexCenter} flex-col bg-white dark:bg-slate-800 w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full relative overflow-hidden`}
      >
        {/* Inner gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className={`${styles.flexStart} flex-row relative z-10`}>
          <p className="font-poppins font-bold text-[18px] leading-[23.4px] text-slate-800 dark:text-slate-200">
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Get</span>
          </p>
          <ArrowUpRight className="w-6 h-6 ml-1 text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>

        <p className="font-poppins font-bold text-[18px] leading-[23.4px] text-slate-800 dark:text-slate-200 relative z-10">
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Started</span>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
