import { Wallet, TrendingUp, Coins } from "lucide-react";

const NetWorthCard = ({ income = 0, expense = 0 }) => {
    const netWorth = income - expense;
    const isPositive = netWorth >= 0;

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-amber-900/20 backdrop-blur-sm border border-amber-200 dark:border-amber-800/50 p-6 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-400/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-400/30 to-yellow-400/30 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                        <Coins className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full ${isPositive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'}`}>
                        <TrendingUp className={`w-3 h-3 ${!isPositive && 'rotate-180'}`} />
                        <span>{isPositive ? 'GROWING' : 'DECLINING'}</span>
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-medium">Net Worth</p>
                <p className={`text-2xl md:text-3xl font-bold ${isPositive ? 'text-slate-900 dark:text-white' : 'text-rose-500'}`}>
                    ₹{netWorth.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    Total assets value
                </p>
            </div>
        </div>
    );
};

export default NetWorthCard;
