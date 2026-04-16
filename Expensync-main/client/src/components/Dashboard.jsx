import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
    ArrowDownRight,
    ArrowUpRight,
    Wallet,
    Plus,
    TrendingUp,
    TrendingDown,
    PiggyBank,
    Calendar,
    CreditCard,
    Sparkles,
    Zap,
    Target,
    Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddTransaction from "./AddTransaction";
import ExpenseChart from "./ExpenseChart";
import BudgetGoalProgress from "./BudgetGoalProgress";
import DebtOverview from "./DebtOverview";
import NetWorthCard from "./NetWorthCard";
import Layout from "./Layout";
import { robot } from "../assets";

// Centralized API imports
import { getTransactions, fetchBudgetSummary, fetchCategoryGoals, fetchDebts } from "../api/api";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [budgetGoals, setBudgetGoals] = useState([]);
    const [debts, setDebts] = useState([]);
    
    const totalBalance = totalIncome - totalExpense;
    const budgetUsed = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;

    // Decode token and set userId
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.userId);
        }
    }, [token]);

    // Fetch all required data
    useEffect(() => {
        if (!userId || !token) return;

        const fetchData = async () => {
            try {
                const [summary, txs, goals, debtsData] = await Promise.all([
                    fetchBudgetSummary(),
                    getTransactions(),
                    fetchCategoryGoals(),
                    fetchDebts()
                ]);

                // Set summary data
                setTotalIncome(summary.totalIncome);
                setTotalExpense(summary.totalExpenses);

                // Set transactions
                setTransactions(txs.transactions || []);

                // Set budget goals
                setBudgetGoals(goals.categoryGoals || []);

                // Set debts
                setDebts(debtsData || []);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            }
        };

        fetchData();
    }, [userId, token]);

    // Calculate total spent per category
    const calculateSpentPerCategory = (transactions) => {
    if (!Array.isArray(transactions)) return {}; // safety check
    const spentPerCategory = {};
    transactions.forEach(tx => {
        if (spentPerCategory[tx.category]) {
            spentPerCategory[tx.category] += tx.amount;
        } else {
            spentPerCategory[tx.category] = tx.amount;
        }
    });
    return spentPerCategory;
};

    // Merge budget goals with spent data
    const budgetGoalsWithSpent = budgetGoals.map(goal => {
        const spent = calculateSpentPerCategory(transactions)[goal.category] || 0;
        return {
            ...goal,
            spent
        };
    });

    // Get current date for greeting
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Layout>
            <div className={`min-h-screen transition-all duration-500 ease-in-out relative ${showModal ? "blur-sm pointer-events-none" : ""}`}>
                {/* Header Section with Image */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-0.5">
                                <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                                    <img src={robot} alt="AI" className="w-12 h-12 object-contain" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                                        Dashboard
                                    </h1>
                                    <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-violet-500" />
                                    {formattedDate}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => navigate("/")}
                                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
                            >
                                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Home
                            </button>
                            <button 
                                onClick={() => setShowModal(true)}
                                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
                            >
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                Add Transaction
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards Grid - New Tech Theme */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Balance - Violet Theme */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-violet-50 dark:from-slate-800 dark:to-violet-900/20 backdrop-blur-sm border border-violet-200 dark:border-violet-800/50 p-6 hover:shadow-2xl hover:shadow-violet-500/20 hover:border-violet-400/50 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                    <Wallet className="w-6 h-6 text-white" />
                                </div>
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${totalBalance >= 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'}`}>
                                    {totalBalance >= 0 ? '✓ Healthy' : '⚠ Low'}
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-medium">Total Balance</p>
                            <p className={`text-2xl md:text-3xl font-bold ${totalBalance >= 0 ? 'text-slate-900 dark:text-white' : 'text-rose-500'}`}>
                                ₹{totalBalance.toLocaleString()}
                            </p>
                            <div className="mt-2 flex items-center gap-1">
                                <Zap className="w-3 h-3 text-amber-400" />
                                <span className="text-xs text-slate-400">Live tracking</span>
                            </div>
                        </div>
                    </div>

                    {/* Total Income - Emerald Theme */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-emerald-900/20 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800/50 p-6 hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span className="text-xs font-bold">+12%</span>
                                </div>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-medium">Total Income</p>
                            <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                ₹{totalIncome.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Total Expense - Rose Theme */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-rose-50 dark:from-slate-800 dark:to-rose-900/20 backdrop-blur-sm border border-rose-200 dark:border-rose-800/50 p-6 hover:shadow-2xl hover:shadow-rose-500/20 hover:border-rose-400/50 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-rose-400/30 to-orange-400/30 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
                                    <TrendingDown className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                                    <ArrowDownRight className="w-4 h-4" />
                                    <span className="text-xs font-bold">-5%</span>
                                </div>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-medium">Total Expense</p>
                            <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                ₹{totalExpense.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Net Worth - Amber/Gold Theme */}
                    <NetWorthCard income={totalIncome} expense={totalExpense} />
                </div>

                {/* Budget Progress Bar - Modern Tech */}
                <div className="mb-8 rounded-2xl bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-fuchsia-500/5 dark:from-violet-900/10 dark:via-purple-900/10 dark:to-fuchsia-900/10 border border-violet-200 dark:border-violet-800/50 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                                <Target className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Monthly Budget Usage
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Track your spending goals
                                </p>
                            </div>
                        </div>
                        <span className={`text-sm font-bold px-4 py-2 rounded-xl ${
                            budgetUsed > 90 ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' :
                            budgetUsed > 70 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                            'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                        }`}>
                            {budgetUsed.toFixed(1)}% used
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                        <div 
                            className={`h-4 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                                budgetUsed > 90 ? 'from-rose-500 via-orange-500 to-red-500' :
                                budgetUsed > 70 ? 'from-amber-400 via-orange-400 to-rose-400' :
                                'from-violet-500 via-purple-500 to-fuchsia-500'
                            }`} 
                            style={{ width: `${Math.min(budgetUsed, 100)}%` }} 
                        />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Spent: <span className="font-bold text-slate-900 dark:text-white">₹{totalExpense.toLocaleString()}</span>
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Target: <span className="font-bold text-violet-600 dark:text-violet-400">₹{totalIncome.toLocaleString()}</span>
                        </p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Budget Goals - Tech Card */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl bg-gradient-to-br from-white to-violet-50 dark:from-slate-800 dark:to-violet-900/20 backdrop-blur-sm border border-violet-200 dark:border-violet-800/50 p-6 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                                    <Target className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Budget Goals
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Category targets
                                    </p>
                                </div>
                            </div>
                            <BudgetGoalProgress goals={budgetGoalsWithSpent} />
                        </div>
                    </div>

                    {/* Expense Chart - Tech Card */}
                    <div className="lg:col-span-2">
                        <ExpenseChart totalIncome={totalIncome} totalExpense={totalExpense} />
                    </div>
                </div>

                {/* Recent Transactions - Tech Card */}
                <div className="mb-8 rounded-2xl bg-gradient-to-br from-white to-violet-50/50 dark:from-slate-800 dark:to-violet-900/10 backdrop-blur-sm border border-violet-200 dark:border-violet-800/50 p-6 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Recent Transactions
                            </h3>
                        </div>
                        <button className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors flex items-center gap-1">
                            View All
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {transactions.slice(0, 5).map((tx, idx) => (
                            <div 
                                key={idx} 
                                className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                        tx.amount > 0 
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                                            : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                    }`}>
                                        {tx.amount > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">{tx.category}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{tx.title || 'Transaction'}</p>
                                    </div>
                                </div>
                                <span className={`font-bold ${tx.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                                </span>
                            </div>
                        ))}
                        {transactions.length === 0 && (
                            <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                                No transactions yet. Add your first transaction!
                            </p>
                        )}
                    </div>
                </div>

                {/* Savings & Debt Row - Tech Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Savings Card - Vibrant Gradient */}
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 p-6 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10" />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                    <PiggyBank className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Savings This Month</h3>
                                    <p className="text-emerald-100 text-xs">Building wealth</p>
                                </div>
                            </div>
                            <p className="text-4xl font-bold mb-2">
                                ₹{(totalIncome - totalExpense).toLocaleString()}
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white/20 rounded-full h-2">
                                    <div 
                                        className="bg-white rounded-full h-2 transition-all duration-700"
                                        style={{ width: `${totalIncome > 0 ? Math.min(((totalIncome - totalExpense) / totalIncome * 100), 100) : 0}%` }}
                                    />
                                </div>
                                <span className="text-sm font-medium">
                                    {totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Debt Overview */}
                    <DebtOverview debts={debts} />
                </div>
            </div>

            {/* Floating Add Button (Mobile) - Tech Style */}
            <button 
                onClick={() => setShowModal(true)} 
                className="md:hidden fixed bottom-6 right-6 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white p-4 rounded-2xl shadow-2xl shadow-violet-500/40 z-50 transition-all duration-300 hover:scale-110 hover:rotate-3"
            >
                <Plus className="w-6 h-6" />
            </button>

            {/* Modal for Add Transaction */}
            {showModal && userId && (
                <div 
                    className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4" 
                    onClick={() => setShowModal(false)}
                >
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <AddTransaction userId={userId} onSuccess={() => setShowModal(false)} />
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
