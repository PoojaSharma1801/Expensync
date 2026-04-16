import { useEffect, useState } from "react";
import AddDebtForm from "./AddDebtForm";
import { fetchDebts, deleteDebt } from "../api/api";
import { AlertTriangle, Plus, Trash2, Receipt, TrendingDown } from "lucide-react";

const DebtOverview = () => {
    const [debts, setDebts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const getDebts = async () => {
            try {
                const data = await fetchDebts();
                setDebts(data || []);
            } catch (err) {
                console.error("Error fetching debts:", err);
            }
        };
        getDebts();
    }, []);

    const totalDebt = debts.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const handleDebtAdded = (newDebt) => {
        setDebts((prevDebts) => [...prevDebts, newDebt]);
        setShowForm(false);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDebt(id);
            setDebts((prevDebts) => prevDebts.filter((debt) => debt._id !== id));
        } catch (err) {
            console.error("Error deleting debt:", err);
        }
    };

    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-rose-50 dark:from-slate-800 dark:to-rose-900/20 backdrop-blur-sm border border-rose-200 dark:border-rose-800/50 p-6 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Debt Overview
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Track liabilities
                        </p>
                    </div>
                </div>
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 px-3 py-1 rounded-full">
                    ₹{totalDebt.toLocaleString()}
                </span>
            </div>

            {debts.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <TrendingDown className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">No debts!</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">You're debt free</p>
                </div>
            ) : (
                <div className="space-y-3 mb-4">
                    {debts.slice(0, 3).map((debt) => (
                        <div
                            key={debt._id}
                            className="flex items-center justify-between p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50 group hover:bg-white dark:hover:bg-rose-900/30 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center">
                                    <Receipt className="w-4 h-4 text-rose-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white text-sm">{debt.name}</p>
                                    <p className="text-rose-600 dark:text-rose-400 text-sm font-bold">₹{(debt.amount || 0).toLocaleString()}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(debt._id)}
                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Debt Button */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-rose-300 dark:border-rose-700 text-rose-500 dark:text-rose-400 hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all font-medium"
            >
                <Plus className="w-4 h-4" />
                {showForm ? "Cancel" : "Add Debt"}
            </button>

            {/* Add Debt Form */}
            {showForm && (
                <div className="mt-4">
                    <AddDebtForm onDebtAdded={handleDebtAdded} />
                </div>
            )}
        </div>
    );
};

export default DebtOverview;
