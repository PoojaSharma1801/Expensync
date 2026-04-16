import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";
import { Wallet, Target, PieChart, Bell, Shield, Sparkles } from "lucide-react";

const iconMap = {
  "Star.svg": Star,
  "Shield.svg": ShieldIcon,
  "Send.svg": Send,
};

function Star() { return <Sparkles className="w-7 h-7 text-violet-500" />; }
function ShieldIcon() { return <Shield className="w-7 h-7 text-emerald-500" />; }
function Send() { return <Bell className="w-7 h-7 text-amber-500" />; }

const FeatureCard = ({ icon, title, content, index }) => {
  const IconComponent = iconMap[icon] || Star;
  const gradients = [
    "from-violet-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-500",
    "from-cyan-500 to-blue-500",
    "from-fuchsia-500 to-pink-500"
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <div
      className={`group flex flex-row p-6 rounded-2xl ${
        index !== features.length - 1 ? "mb-6" : "mb-0"
      } bg-white dark:bg-slate-800/50 border border-violet-200 dark:border-violet-800/50 
      hover:shadow-xl hover:shadow-violet-500/10 hover:border-violet-400 transition-all duration-500`}
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white">
          <IconComponent />
        </div>
      </div>
      <div className="flex-1 flex flex-col ml-4">
        <h4 className="font-poppins font-bold text-slate-900 dark:text-white text-lg mb-2">
          {title}
        </h4>
        <p className="font-poppins text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
};

const Business = () => (
  <section id="features" className={`${layout.section} relative`}>
    {/* Background glow */}
    <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] -translate-y-1/2" />
    
    <div className={`${layout.sectionInfo} relative z-10`}>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
        <Sparkles className="w-4 h-4" />
        Powerful Features
      </div>
      <h2 className={`${styles.heading2} bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent`}>
        Smart Tools For <br className="sm:block hidden" /> Modern Finance.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5 text-slate-600 dark:text-slate-400`}>
        Expensy combines AI-powered insights with intuitive design. Track expenses, set budgets, and achieve your financial goals with cutting-edge technology.
      </p>

      <div className="mt-10">
        <Button styles={`bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:shadow-lg hover:shadow-violet-500/30`} />
      </div>
    </div>

    <div className={`${layout.sectionImg} flex-col relative z-10`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;
