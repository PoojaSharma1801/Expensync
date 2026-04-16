import { useEffect, useState, useRef } from "react";
import { 
    ArrowDownCircle, 
    ArrowUpCircle, 
    Trash2, 
    Search, 
    Filter,
    CreditCard,
    TrendingUp,
    TrendingDown,
    Wallet,
    Calendar,
    Receipt,
    Sparkles
} from "lucide-react";
import TransactionReminders from "./TransactionReminders";
import Layout from "./Layout";
import { getTransactions, deleteTransaction } from "../api/api";
import { robot } from "../assets";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-200 dark:border-slate-700">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <Trash2 className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 text-center">
          Delete Transaction?
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-center text-sm">
          This action cannot be undone. The transaction will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition font-medium shadow-lg shadow-red-500/25"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const listRef = useRef();
  const loadingRef = useRef(false);
  const pageRef = useRef(page);
  const hasMoreRef = useRef(hasMore);

  // 🔥 Fetch with pagination, search, filter
  const fetchTransactions = async (pageNum = 1, reset = false) => {
    console.log(
      `📡 Fetching transactions | page=${pageNum}, search="${search}", filter="${filter}"`
    );
    setLoading(true);
    loadingRef.current = true;
    try {
      const res = await getTransactions(pageNum, 10, search, filter);
      if (reset) {
        setTransactions(res.transactions);
      } else {
        setTransactions((prev) => [...prev, ...res.transactions]);
      }
      setHasMore(res.hasMore);
      hasMoreRef.current = res.hasMore;
      setPage(pageNum);
      pageRef.current = pageNum;
    } catch (error) {
      console.error("❌ Error fetching transactions:", error);
      setError("Error fetching transactions");
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  // ✅ Initial load (mount pe ek hi call)
  useEffect(() => {
    fetchTransactions(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Re-fetch on search/filter change (debounced)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTransactions(1, true);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, filter]);

  // ✅ Infinite scroll
  useEffect(() => {
    const div = listRef.current;
    if (!div) return;

    const handleScroll = () => {
      if (
        hasMoreRef.current &&
        !loadingRef.current &&
        div.scrollTop + div.clientHeight >= div.scrollHeight - 50
      ) {
        fetchTransactions(pageRef.current + 1);
      }
    };

    div.addEventListener("scroll", handleScroll);
    return () => div.removeEventListener("scroll", handleScroll);
  }, []);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTransaction(deleteId);
      setTransactions((prev) => prev.filter((txn) => txn._id !== deleteId));
    } catch (err) {
      console.error("❌ Error deleting transaction:", err);
      alert("Error deleting transaction");
    } finally {
      setIsModalOpen(false);
      setDeleteId(null);
    }
  };

  const totalSpent = transactions
    .filter((txn) => txn.amount < 0)
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalIncome = transactions
    .filter((txn) => txn.amount > 0)
    .reduce((sum, txn) => sum + txn.amount, 0);

  const net = totalIncome + totalSpent;

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
                    Transactions
                  </h1>
                  <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-violet-500" />
                  Manage your income and expenses
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Tech Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-emerald-900/20 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800/50 p-5 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Income</span>
              </div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹{totalIncome.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-rose-50 dark:from-slate-800 dark:to-rose-900/20 backdrop-blur-sm border border-rose-200 dark:border-rose-800/50 p-5 hover:shadow-xl hover:shadow-rose-500/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-400/20 to-orange-400/20 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Spent</span>
              </div>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">₹{Math.abs(totalSpent).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-violet-50 dark:from-slate-800 dark:to-violet-900/20 backdrop-blur-sm border border-violet-200 dark:border-violet-800/50 p-5 hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Net Balance</span>
              </div>
              <p className={`text-2xl font-bold ${net >= 0 ? 'text-violet-600 dark:text-violet-400' : 'text-rose-600 dark:text-rose-400'}`}>
                ₹{net.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - Transactions List */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-gradient-to-br from-white to-violet-50/50 dark:from-slate-800 dark:to-violet-900/10 backdrop-blur-sm border border-violet-200 dark:border-violet-800/50 p-6 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500">
              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900/50 border border-violet-200 dark:border-violet-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-800 dark:text-white transition-all"
                  />
                </div>
                <div className="relative sm:w-48">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900/50 border border-violet-200 dark:border-violet-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-800 dark:text-white transition-all appearance-none"
                  >
                    <option value="">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Income">Income</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Transactions List */}
              <ul
                ref={listRef}
                className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
              >
                {transactions.map((txn) => (
                  <li
                    key={txn._id}
                    className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        txn.amount > 0 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}>
                        {txn.amount > 0 ? <ArrowUpCircle className="w-6 h-6" /> : <ArrowDownCircle className="w-6 h-6" />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {txn.title}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600 text-xs">
                            {txn.category}
                          </span>
                          {txn.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(txn.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-lg font-bold ${
                        txn.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
                      </span>
                      <button
                        onClick={() => openDeleteModal(txn._id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        title="Delete transaction"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}

                {transactions.length === 0 && !loading && (
                  <li className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-violet-500" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">No transactions found</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Add your first transaction from the dashboard</p>
                  </li>
                )}

                {loading && (
                  <li className="text-center py-4">
                    <div className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-600 border-t-cyan-500 rounded-full animate-spin" />
                      Loading more...
                    </div>
                  </li>
                )}
                
                {!hasMore && transactions.length > 0 && !loading && (
                  <li className="text-center py-4">
                    <p className="text-slate-400 dark:text-slate-500 text-sm">
                      No more transactions
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE - Reminders */}
          <div className="lg:col-span-1">
            <TransactionReminders />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Layout>
  );
};

export default Transactions;
