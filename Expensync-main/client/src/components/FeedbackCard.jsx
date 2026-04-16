import { Quote, Star, Crown } from "lucide-react";

const FeedbackCard = ({ content, name, title, index = 0 }) => {
  const isOwner = title.toLowerCase().includes("creator") || title.toLowerCase().includes("owner");
  const gradients = [
    "from-violet-500 to-purple-500",
    "from-fuchsia-500 to-pink-500",
    "from-emerald-500 to-teal-500"
  ];
  const borderColors = [
    "border-violet-200 dark:border-violet-800/50",
    "border-fuchsia-200 dark:border-fuchsia-800/50",
    "border-emerald-200 dark:border-emerald-800/50"
  ];
  const gradient = gradients[index % gradients.length];
  const borderColor = borderColors[index % borderColors.length];

  return (
    <div className={`group flex justify-between flex-col p-8 rounded-2xl bg-white dark:bg-slate-800/50 border ${isOwner ? 'border-amber-300 dark:border-amber-700 ring-2 ring-amber-200 dark:ring-amber-900/50' : borderColor} hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 h-full relative overflow-hidden`}>
      {/* Gradient top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isOwner ? 'from-amber-400 to-orange-500' : gradient}`} />
      
      {/* Owner Badge */}
      {isOwner && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow-lg">
          <Crown className="w-3 h-3" />
          OWNER
        </div>
      )}
      
      {/* Quote icon with gradient background */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${isOwner ? 'from-amber-400 to-orange-500' : gradient} flex items-center justify-center mb-6 shadow-lg`}>
        <Quote className="w-6 h-6 text-white" />
      </div>

      {/* Star rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      
      <p className="font-poppins text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8 flex-1">
        "{content}"
      </p>

      <div className="flex flex-row items-center pt-4 border-t border-slate-100 dark:border-slate-700">
        {/* Initials badge for all testimonials */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${isOwner ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br ' + gradient}`}>
          <span className="text-white font-bold text-sm">
            {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col ml-4">
          <h4 className={`font-poppins font-bold text-lg ${isOwner ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
            {name}
          </h4>
          <p className="font-poppins text-slate-500 dark:text-slate-400 text-sm">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
