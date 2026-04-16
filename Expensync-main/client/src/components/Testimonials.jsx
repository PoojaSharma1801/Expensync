import { feedback } from "../constants";
import { Phone, Mail, Crown, Star } from "lucide-react";

const Testimonials = () => {
  const getCardStyle = (index, title) => {
    const isOwner = title.toLowerCase().includes("creator") || title.toLowerCase().includes("owner");
    if (isOwner) {
      return {
        bg: "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30",
        accent: "from-amber-400 to-orange-500",
        textColor: "text-amber-600 dark:text-amber-400"
      };
    }
    const styles = [
      { bg: "bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30", accent: "from-violet-500 to-purple-500", textColor: "text-violet-600 dark:text-violet-400" },
      { bg: "bg-gradient-to-r from-fuchsia-100 to-pink-100 dark:from-fuchsia-900/30 dark:to-pink-900/30", accent: "from-fuchsia-500 to-pink-500", textColor: "text-fuchsia-600 dark:text-fuchsia-400" },
      { bg: "bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30", accent: "from-emerald-500 to-teal-500", textColor: "text-emerald-600 dark:text-emerald-400" }
    ];
    return styles[index % styles.length];
  };

  return (
    <section id="clients" className="relative py-20 overflow-hidden">
      {/* Large Background Text */}
      <div className="absolute top-8 left-0 right-0 overflow-hidden pointer-events-none">
        <h2 className="text-[80px] md:text-[140px] font-black text-slate-200/40 dark:text-slate-800/40 uppercase tracking-wider whitespace-nowrap text-center">
          Testimonials
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            What Our <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Users Say</span>
          </h2>
        </div>

        {/* Testimonial Cards - Clean Cards Without Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedback.map((card, index) => {
            const style = getCardStyle(index, card.title);
            const isOwner = card.title.toLowerCase().includes("creator") || card.title.toLowerCase().includes("owner");

            return (
              <div 
                key={card.id}
                className={`relative rounded-2xl ${style.bg} p-6 overflow-hidden group hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500`}
              >
                {/* Large Background Name - Centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full flex items-center justify-center">
                  <h3 className="text-5xl md:text-6xl font-black text-slate-400/50 dark:text-slate-600/50 uppercase tracking-tight text-center">
                    {card.name.split(' ')[0]}
                  </h3>
                </div>

                {/* Gradient Top Border */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.accent}`} />
                
                <div className="relative z-10">
                  {/* Header - Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.accent} flex items-center justify-center shadow-lg`}>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                    
                    {isOwner && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold">
                        <Crown className="w-3 h-3" />
                        OWNER
                      </div>
                    )}
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                    "{card.content}"
                  </p>

                  {/* Divider */}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                    <h4 className={`font-bold text-lg ${isOwner ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                      {card.name}
                    </h4>
                    <p className={`text-sm font-medium ${style.textColor}`}>
                      {card.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
