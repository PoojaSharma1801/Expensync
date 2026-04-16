import { stats } from "../constants";
import styles from "../style";

const Stats = () => (
  <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
    {stats.map((stat, index) => (
      <div
        key={stat.id}
        className="flex-1 flex justify-start items-center flex-row m-3 group"
      >
        <div className={`flex items-center justify-center w-14 h-14 rounded-2xl mr-4 ${
          index === 0 ? 'bg-gradient-to-br from-violet-500 to-purple-500' :
          index === 1 ? 'bg-gradient-to-br from-emerald-500 to-teal-500' :
          index === 2 ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
          'bg-gradient-to-br from-rose-500 to-pink-500'
        } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-white font-bold text-xl">{stat.value.replace(/[^0-9]/g, '').charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-poppins font-bold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-slate-900 dark:text-white">
            {stat.value}
          </h4>
          <p className="font-poppins font-medium xs:text-[16px] text-[14px] text-slate-500 dark:text-slate-400 uppercase">
            {stat.title}
          </p>
        </div>
      </div>
    ))}
  </section>
);

export default Stats;
