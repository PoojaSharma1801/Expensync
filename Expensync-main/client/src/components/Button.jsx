import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Button = ({ styles, text = "Get Started" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        group flex items-center gap-2
        py-4 px-8 font-poppins font-semibold text-[16px]
        text-white 
        bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500
        rounded-xl outline-none 
        transition-all duration-300 
        hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105
        ${styles}
      `}
    >
      {text}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

export default Button;
