import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { id: "demos", label: "Demos" },
    { id: "features", label: "Features" },
    { id: "sobre-mi", label: "Sobre Mí" },
    { id: "paquetes", label: "Paquetes" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl tracking-wider text-gray-900"
            style={{ fontFamily: "Sora, sans-serif", fontWeight: 600 }}
          >
            ALEJANDRO CANEK
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center space-x-8"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300 capitalize tracking-wide"
                style={{ fontFamily: "Sora, sans-serif", fontWeight: 400 }}
              >
                {item.label}
              </button>
            ))}

            <Button
              onClick={() => scrollToSection("contacto")}
              className="bg-white/20 backdrop-blur-sm border border-gray-300/50 text-gray-900 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 px-6"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Contacto
            </Button>

            <Button
              onClick={() =>
                window.open("https://calendly.com/alejandrocanek", "_blank")
              }
              className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 px-4 py-2 shadow-lg"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              <Calendar size={16} className="mr-2" />
              Agendar Meeting
            </Button>
          </motion.nav>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-gray-300/50 text-gray-900 hover:bg-gray-100 transition-all duration-300"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl p-6">
                <nav className="space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left text-gray-700 hover:text-indigo-600 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-indigo-50"
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </motion.button>
                  ))}

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Button
                      onClick={() => scrollToSection("contacto")}
                      variant="outline"
                      className="w-full justify-center border-gray-300 text-gray-700 hover:bg-gray-100"
                      style={{ fontFamily: "Sora, sans-serif" }}
                    >
                      Contacto
                    </Button>

                    <Button
                      onClick={() =>
                        window.open(
                          "https://calendly.com/alejandrocanek",
                          "_blank"
                        )
                      }
                      className="w-full justify-center bg-indigo-600 text-white hover:bg-indigo-700"
                      style={{ fontFamily: "Sora, sans-serif" }}
                    >
                      <Calendar size={16} className="mr-2" />
                      Agendar Meeting
                    </Button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
