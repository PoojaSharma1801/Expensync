import styles from "../style";
import { robot } from "../assets";
import GetStarted from "./GetStarted";
import { Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} w-full min-h-screen relative overflow-hidden`}>
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />

      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-16 sm:px-16 px-6 relative z-10`}>
        {/* Promo Banner - Tech Style */}
        <div className="flex flex-row items-center py-2 px-4 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 rounded-full mb-4 border border-violet-200 dark:border-violet-800/50">
          <Sparkles className="w-4 h-4 text-violet-500 mr-2" />
          <p className={`${styles.paragraph} text-slate-700 dark:text-slate-300`}>
            <span className="text-violet-600 dark:text-violet-400 font-bold">Next-Gen</span> Finance Management
          </p>
        </div>

        {/* Headings */}
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-bold ss:text-[72px] text-[52px] text-slate-900 dark:text-white ss:leading-[100.8px] leading-[75px]">
            Master Your <br className="sm:block hidden" />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Finances</span>
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        <h1 className="font-poppins font-bold ss:text-[68px] text-[52px] text-slate-900 dark:text-white ss:leading-[100.8px] leading-[75px] w-full">
          With <span className="text-violet-600 dark:text-violet-400">Expensy</span>.
        </h1>
        
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-slate-600 dark:text-slate-400`}>
          AI-powered expense tracking, smart budgeting, and real-time financial insights. Take control of your money with modern technology.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-3 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Track Expenses
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium">
            <Shield className="w-4 h-4" />
            Secure Data
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium">
            <Zap className="w-4 h-4" />
            Real-time
          </div>
        </div>
      </div>

      {/* Image with gradients */}
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <div className="relative w-[90%] max-w-[600px]">
          <img src={robot} alt="dashboard" className="w-full h-auto relative z-[5] drop-shadow-2xl" />
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl blur-2xl opacity-20 -z-10 scale-95" />
        </div>

        {/* Floating gradient orbs */}
        <div className="absolute z-[0] w-[200px] h-[200px] top-10 right-10 bg-violet-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute z-[0] w-[150px] h-[150px] bottom-20 left-10 bg-fuchsia-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute z-[0] w-[100px] h-[100px] top-1/2 right-1/4 bg-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
