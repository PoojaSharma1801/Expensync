
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { PieChart, TrendingUp, TrendingDown } from "lucide-react";

Chart.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ totalIncome, totalExpense }) => {
    const data = {
        labels: ["Income", "Expense"],
        datasets: [
            {
                data: [totalIncome || 0, totalExpense || 0],
                backgroundColor: ["#8B5CF6", "#F43F5E"],
                borderWidth: 0,
                hoverBackgroundColor: ["#A78BFA", "#FB7185"],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#64748b",
                    padding: 20,
                    font: {
                        size: 12,
                        weight: '600'
                    },
                    usePointStyle: true,
                    pointStyle: 'circle'
                },
            },
            tooltip: {
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                padding: 16,
                cornerRadius: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        return ` ₹${value.toLocaleString()} (${percentage}%)`;
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%'
    };

    const hasData = totalIncome > 0 || totalExpense > 0;

    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-violet-50 dark:from-slate-800 dark:to-violet-900/20 backdrop-blur-sm border border-violet-200 dark:border-violet-800/50 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-violet-500/10 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <PieChart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Income vs Expense
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Financial distribution
                        </p>
                    </div>
                </div>
            </div>
            
            {hasData ? (
                <div className="flex items-center justify-center">
                    <div className="w-48 h-48 sm:w-56 sm:h-56">
                        <Pie data={data} options={options} />
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                        <PieChart className="w-8 h-8 text-violet-500" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">Add transactions to see your chart</p>
                </div>
            )}
            
            {/* Summary Stats */}
            {hasData && (
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-violet-100 dark:border-violet-800/30">
                    <div className="text-center p-3 rounded-xl bg-violet-50 dark:bg-violet-900/20">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp className="w-4 h-4 text-violet-500" />
                            <p className="text-xs text-slate-500 dark:text-slate-400">Income</p>
                        </div>
                        <p className="text-lg font-bold text-violet-600 dark:text-violet-400">₹{totalIncome.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingDown className="w-4 h-4 text-rose-500" />
                            <p className="text-xs text-slate-500 dark:text-slate-400">Expense</p>
                        </div>
                        <p className="text-lg font-bold text-rose-600 dark:text-rose-400">₹{totalExpense.toLocaleString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseChart;
