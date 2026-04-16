import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchReminders, addReminder, deleteReminder } from "../api/api";
import { 
    Bell, 
    Plus, 
    Trash2, 
    Calendar,
    RefreshCw,
    Tag,
    DollarSign
} from "lucide-react";

const TransactionReminders = () => {
    const [reminders, setReminders] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "Others",
        date: "",
        isRecurring: false,
    });

    // Fetch reminders on mount
    useEffect(() => {
        const getReminders = async () => {
            try {
                const data = await fetchReminders();
                setReminders(data);
            } catch (err) {
                console.error("Error fetching reminders:", err);
            }
        };
        getReminders();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAddReminder = async (e) => {
        e.preventDefault();
        try {
            const newReminder = await addReminder(form);
            setReminders((prev) => [...prev, newReminder]);
            setForm({
                title: "",
                amount: "",
                category: "Others",
                date: "",
                isRecurring: false,
            });
            setShowForm(false);
        } catch (err) {
            console.error("Error creating reminder:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteReminder(id);
            setReminders((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error("Error deleting reminder:", err);
        }
    };

    return (
        <div className="rounded-2xl bg-gradient-to-br from-white to-violet-50 dark:from-slate-800 dark:to-violet-900/20 backdrop-blur-sm border border-violet-200 dark:border-violet-800/50 p-6 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                        <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Reminders
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {reminders.length} active reminders
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`p-2 rounded-xl transition-all ${
                        showForm 
                            ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400' 
                            : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-xl'
                    }`}
                >
                    {showForm ? <Trash2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
            </div>

            {/* Reminders List */}
            {reminders.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                        <Bell className="w-8 h-8 text-violet-500" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No reminders yet</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Add a reminder to get notified</p>
                </div>
            ) : (
                <ul className="space-y-3 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                    {reminders.map((reminder) => (
                        <li
                            key={reminder._id}
                            className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    reminder.isRecurring 
                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                                }`}>
                                    {reminder.isRecurring ? <RefreshCw className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{reminder.title}</p>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600">
                                            {reminder.category}
                                        </span>
                                        <span>{new Date(reminder.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-slate-900 dark:text-white">
                                    ₹{reminder.amount}
                                </span>
                                <button
                                    onClick={() => handleDelete(reminder._id)}
                                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Add Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.form
                        onSubmit={handleAddReminder}
                        className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                name="title"
                                placeholder="Reminder title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-800 dark:text-white text-sm transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Amount"
                                    value={form.amount}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-800 dark:text-white text-sm transition-all"
                                />
                            </div>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-800 dark:text-white text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-800 dark:text-white text-sm transition-all appearance-none"
                            >
                                <option value="Food">Food</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Travel">Travel</option>
                                <option value="Savings">Savings</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                            <input
                                type="checkbox"
                                name="isRecurring"
                                checked={form.isRecurring}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                            />
                            <div className="flex items-center gap-2">
                                <RefreshCw className={`w-4 h-4 text-slate-500 ${form.isRecurring ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Recurring reminder</span>
                            </div>
                        </label>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Save Reminder
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TransactionReminders;
