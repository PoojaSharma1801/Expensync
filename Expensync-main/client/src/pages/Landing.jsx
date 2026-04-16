import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import styles from "../style";
import { checkBackend } from "../api/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Business from "../components/Business";
import Billing from "../components/Billing";
import CardDeal from "../components/CardDeal";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Clients from "../components/Clients";
import Footer from "../components/Footer";

const Landing = () => {
  const { theme } = useTheme();

  // Test backend connection
  useEffect(() => {
    const testBackend = async () => {
      try {
        const data = await checkBackend();
        console.log("Backend says:", data);
      } catch (err) {
        console.error("❌ Backend error:", err);
      }
    };
    testBackend();
  }, []);

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 w-full overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar />
      <main className="bg-slate-50 dark:bg-slate-900">
        <div className={`${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Stats />
            <Business />
            <Billing />
            <CardDeal />
            <Testimonials />
            <Clients />
            <CTA />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
