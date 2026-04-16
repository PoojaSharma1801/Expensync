import styles from "../style";
import Button from "./Button";
import { Sparkles, Zap, ArrowRight } from "lucide-react";

const CTA = () => (
    <section
        className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col 
        rounded-3xl relative overflow-hidden
        bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500`}
    >
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-fuchsia-400/20 rounded-full blur-2xl animate-pulse" />
        
        <div className="flex-1 flex flex-col relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-4 w-fit">
                <Zap className="w-4 h-4" />
                Start Your Journey
            </div>
            <h2 className={`${styles.heading2} text-white`}>
                Ready to Master Your Finances?
            </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5 text-violet-100`}>
                Join thousands of users who transformed their financial lives with Expensy. Smart tracking, AI insights, and powerful budgeting tools await.
            </p>
        </div>

        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10 relative z-10`}>
            <button className="group flex items-center gap-2 px-8 py-4 bg-white text-violet-600 font-bold rounded-2xl shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    </section>
);

export default CTA;
