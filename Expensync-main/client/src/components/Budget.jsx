import { useState, useEffect } from "react";
import Layout from "./Layout";
import { fetchBudgetSummary, fetchCategoryGoals, setCategoryGoals } from "../api/api";
import { 
    Wallet, 
    TrendingUp, 
    TrendingDown, 
    PiggyBank, 
    Target,
    Save,
    Sparkles,
    AlertCircle,
    Receipt,
    Zap
} from "lucide-react";
import { robot } from "../assets";

// Category Budget Goals Subcomponent
const CategoryBudgetGoals = ({ goals, setGoals }) => {
  const defaultCategories = ["Food", "Entertainment", "Utilities", "Travel", "Savings", "Others"];

  const handleChange = (category, value) => {
    const amount = parseInt(value) || 0;
    setGoals({ ...goals, [category]: amount });
  };

  const handleSave = async () => {
    try {
      const categoryGoalsArray = Object.entries(goals).map(([category, goal]) => ({
        category,
        goal: parseFloat(goal)
      }));

      await setCategoryGoals(categoryGoalsArray);
    } catch (err) {
      console.error(err);
    }
  };

  const totalBudget = Object.values(goals).reduce((sum, val) => sum + (parseInt(val) || 0), 0);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Category Goals
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Set budgets for each category
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {defaultCategories.map((category) => (
          <div key={category} className="flex items-center gap-4">
            <label className="w-24 text-sm font-medium text-slate-700 dark:text-slate-300">{category}</label>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
              <input
                type="number"
                min={0}
                value={goals[category] || ''}
                onChange={(e) => handleChange(category, e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 dark:text-white transition-all"
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">Total Budget</span>
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">₹{totalBudget.toLocaleString()}</span>
        </div>
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all"
        >
          <Save className="w-5 h-5" />
          Save Goals
        </button>
      </div>
    </div>
  );
};

// Main Budget Component
const Budget = () => {
  const [budget, setBudget] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [goals, setGoals] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryData = await fetchBudgetSummary();
        const goalsData = await fetchCategoryGoals();

        setBudget(summaryData.totalBudget || 0);
        setTotalIncome(summaryData.totalIncome || 0);
        setTotalExpenses(summaryData.totalExpenses || 0);

        const formattedGoals = (goalsData.categoryGoals || []).reduce((acc, curr) => {
          acc[curr.category] = curr.goal;
          return acc;
        }, {});
        setGoals(formattedGoals);
      } catch (err) {
        console.error("Failed to fetch budget data:", err);
      }
    };

    fetchData();
  }, []);

  const savings = budget - totalExpenses;
  const remainingBudget = budget - totalExpenses;
  const expensePercentage = budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;
  const isOverBudget = remainingBudget < 0;

  return (
    <Layout>
      <div className="min-h-screen pb-8">
        {/* Header with Tech Style */}
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
                    Budget
                  </h1>
                  <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-violet-500" />
                  Track and manage your monthly budget
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Tech Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Budget - Violet */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-violet-50 dark:from-slate-800 dark:to-violet-900/20 backdrop-blur-sm border border-violet-200 dark:border-violet-800/50 p-6 hover:shadow-2xl hover:shadow-violet-500/20 hover:border-violet-400/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-400/30 to-fuchsia-400/30 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-medium">Total Budget</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                ₹{budget.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Total Income - Emerald */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-emerald-900/20 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800/50 p-6 hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-medium">Total Income</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                ₹{totalIncome.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Total Expenses - Rose */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-rose-50 dark:from-slate-800 dark:to-rose-900/20 backdrop-blur-sm border border-rose-200 dark:border-rose-800/50 p-6 hover:shadow-2xl hover:shadow-rose-500/20 hover:border-rose-400/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-rose-400/30 to-orange-400/30 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-medium">Total Expenses</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                ₹{totalExpenses.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Savings - Dynamic */}
          <div className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm border p-6 hover:shadow-2xl transition-all duration-500 ${
            savings >= 0 
              ? 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 border-transparent text-white' 
              : 'bg-gradient-to-br from-white to-rose-50 dark:from-slate-800 dark:to-rose-900/20 border-rose-200 dark:border-rose-800/50 hover:shadow-rose-500/20'
          }`}>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  savings >= 0 ? 'bg-white/20' : 'bg-gradient-to-br from-rose-500 to-orange-500'
                }`}>
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className={`text-sm mb-1 font-medium ${savings >= 0 ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>Savings</p>
              <p className={`text-2xl md:text-3xl font-bold ${savings >= 0 ? 'text-white' : 'text-rose-600 dark:text-rose-400'}`}>
                ₹{Math.abs(savings).toLocaleString()}
              </p>
              {savings < 0 && (
                <p className="text-rose-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Over budget!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Budget Progress & Tips */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget Progress - Tech Style */}
            <div className="rounded-2xl bg-gradient-to-br from-white to-violet-50 dark:from-slate-800 dark:to-violet-900/20 backdrop-blur-sm border border-violet-200 dark:border-violet-800/50 p-6 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Budget Usage
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Track your spending
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-bold px-4 py-2 rounded-xl ${
                  isOverBudget 
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' 
                    : expensePercentage > 70 
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                }`}>
                  {expensePercentage.toFixed(0)}% Used
                </span>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden mb-4">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ease-out shadow-lg ${
                    isOverBudget 
                      ? 'bg-gradient-to-r from-rose-500 via-orange-500 to-red-500 shadow-rose-500/30' 
                      : expensePercentage > 70 
                        ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 shadow-amber-500/30'
                        : 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 shadow-violet-500/30'
                  }`}
                  style={{ width: `${Math.min(expensePercentage, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Spent: <span className="font-bold text-slate-900 dark:text-white">₹{totalExpenses.toLocaleString()}</span>
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  Budget: <span className="font-bold text-violet-600 dark:text-violet-400">₹{budget.toLocaleString()}</span>
                </span>
              </div>

              {isOverBudget && (
                <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                  <p className="text-rose-600 dark:text-rose-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    You've exceeded your budget by ₹{Math.abs(remainingBudget).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Smart Tip - Tech Style */}
            <div className="rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">AI Smart Tip</h3>
                  <p className="text-violet-100 text-sm leading-relaxed">
                    Keep expenses under <span className="font-bold text-white">70%</span> for consistent savings. 
                    You're currently at <span className="font-bold text-white">{expensePercentage.toFixed(0)}%</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Category Goals */}
          <div className="lg:col-span-1">
            <CategoryBudgetGoals goals={goals} setGoals={setGoals} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Budget;
