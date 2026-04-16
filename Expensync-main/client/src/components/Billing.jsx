import { apple, bill, google } from "../assets";
import styles, { layout } from "../style";
import { Receipt, Bell, Zap } from "lucide-react";

const Billing = () => (
  <section id="product" className={`${layout.sectionReverse} relative`}>
    {/* Background glow */}
    <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2" />
    
    <div className={`${layout.sectionImgReverse} relative z-10`}>
      <div className="relative">
        <img src={bill} alt="billing" className="w-[100%] h-[100%] relative z-[5] drop-shadow-2xl" />
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-2xl opacity-20 -z-10 scale-95" />
      </div>
    </div>

    <div className={`${layout.sectionInfo} relative z-10`}>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
        <Bell className="w-4 h-4" />
        Smart Reminders
      </div>
      <h2 className={`${styles.heading2} text-slate-900 dark:text-white`}>
        Stay on top of <br className="sm:block hidden" /> your expenses & bills
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5 text-slate-600 dark:text-slate-400`}>
        Track all your subscriptions, invoices, and recurring payments in one place. Expensy keeps you aware and in control — no surprises, just clarity.
      </p>

      {/* Feature Pills */}
      <div className="flex flex-wrap gap-3 mt-6 mb-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium">
          <Receipt className="w-4 h-4" />
          Auto-tracking
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium">
          <Zap className="w-4 h-4" />
          Instant Alerts
        </div>
      </div>

      <div className="flex flex-row flex-wrap sm:mt-4 mt-6">
        <img
          src={apple}
          alt="app_store"
          className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer hover:opacity-80 transition-opacity"
        />
        <img
          src={google}
          alt="google_play"
          className="w-[144.17px] h-[43.08px] object-contain cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </div>
  </section>
);

export default Billing;
