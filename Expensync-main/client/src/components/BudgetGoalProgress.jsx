const BudgetGoalProgress = ({ goals = [] }) => {
    // Check if 'goals' is indeed an array
    if (!Array.isArray(goals)) {
        return <div className="text-rose-500">Error: Invalid goals data</div>;
    }

    // Filter out savings
    const filteredGoals = goals.filter(
        (goal) => goal.category?.toLowerCase() !== "savings"
    );

    if (filteredGoals.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                    <span className="text-3xl">🎯</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">No budget goals set yet</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Set targets to track spending</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {filteredGoals.slice(0, 4).map(({ category, goal, spent }, idx) => {
                const absoluteSpent = Math.abs(spent);
                const percentage = Math.min((absoluteSpent / goal) * 100, 100);
                const isOver = spent < 0 && absoluteSpent > goal;
                const isSurplus = spent > 0;

                return (
                    <div key={idx} className="group">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${
                                    isOver ? 'bg-rose-500 shadow-lg shadow-rose-500/50' : 
                                    isSurplus ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 
                                    'bg-violet-500 shadow-lg shadow-violet-500/50'
                                }`} />
                                <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">{category}</span>
                            </div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                                ₹{absoluteSpent.toLocaleString()} / ₹{goal.toLocaleString()}
                            </span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                            <div
                                className={`h-2.5 rounded-full transition-all duration-700 ease-out shadow-lg ${
                                    isOver
                                        ? "bg-gradient-to-r from-rose-500 via-orange-500 to-red-500 shadow-rose-500/30"
                                        : isSurplus
                                        ? "bg-gradient-to-r from-emerald-400 to-teal-500 shadow-emerald-500/30"
                                        : "bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 shadow-violet-500/30"
                                }`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        {isOver && (
                            <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1">
                                <span>⚠️</span> Over budget by ₹{(absoluteSpent - goal).toLocaleString()}
                            </p>
                        )}
                        {isSurplus && (
                            <p className="text-emerald-500 text-xs mt-1.5 flex items-center gap-1">
                                <span>✓</span> Surplus of ₹{spent.toLocaleString()}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default BudgetGoalProgress;
