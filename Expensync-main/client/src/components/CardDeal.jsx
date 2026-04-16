import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import { CreditCard, Gift, TrendingUp } from "lucide-react";

const CardDeal = () => (
  <section className={`${layout.section} relative`}>
    {/* Background glow */}
    <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[80px] -translate-y-1/2" />
    
    <div className={`${layout.sectionInfo} relative z-10`}>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
        <CreditCard className="w-4 h-4" />
        Card Management
      </div>
      <h2 className={`${styles.heading2} text-slate-900 dark:text-white`}>
        Discover the best card for <br className="sm:block hidden" /> managing
        your expenses.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5 text-slate-600 dark:text-slate-400`}>
        Finding the right credit card can be overwhelming, but with Expensy, you can track all your spending in one place. Choose the card that helps you maximize rewards, build credit, and stay on top of your finances — all in real-time.
      </p>

      {/* Feature Pills */}
      <div className="flex flex-wrap gap-3 mt-6 mb-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          Rewards Tracking
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium">
          <Gift className="w-4 h-4" />
          Cashback Alerts
        </div>
      </div>

      <div className="mt-2">
        <Button styles="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:shadow-lg hover:shadow-violet-500/30" />
      </div>
    </div>

    <div className={`${layout.sectionImg} relative z-10`}>
      <div className="relative">
        <img src={card} alt="credit card" className="w-[100%] h-[100%] drop-shadow-2xl" />
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl blur-2xl opacity-20 -z-10 scale-95" />
      </div>
    </div>
  </section>
);

export default CardDeal;
