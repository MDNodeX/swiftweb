import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Monitor,
  Palette,
  BarChart3,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// slider images
import hero1 from "@/assets/images/portfolio/hero1.jpg";
import hero2 from "@/assets/images/portfolio/hero3.jpg";
import hero3 from "@/assets/images/portfolio/hero2.jpg";
import { RouteContact } from "@/helpers/RouteName";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Landing Page Design",
    subtitle: "Next-Gen Web Experiences",
    description:
      "Building the next generation of web applications with cutting-edge technologies. Fast, secure, and infinitely scalable.",
    accent: "from-blue-500 to-cyan-400",
    icon: <Code2 className="w-6 h-6" />,
    image: hero1,
    features: ["React & Node.js", "Frontend Development", "Performance First"],
  },
  {
    id: 2,
    title: "Landing Page Design",
    subtitle: "Pixel Perfect Design",
    description:
      "Crafting intuitive and engaging user journeys that convert. We bridge the gap between aesthetics and functionality.",
    accent: "from-purple-500 to-pink-500",
    icon: <Palette className="w-6 h-6" />,
    image: hero2,
    features: ["Interactive Prototyping", "Brand Identity", "Accessibility"],
  },
  {
    id: 3,
    title: "Landing Page Design",
    subtitle: "Data-Driven Marketing",
    description:
      "Scaling your organic reach and dominating the digital landscape. Our strategies are built on data and results.",
    accent: "from-emerald-500 to-teal-400",
    icon: <BarChart3 className="w-6 h-6" />,
    image: hero3,
    features: ["Conversion Optimization", "Content Strategy", "Growth Hacking"],
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[current];

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] py-7 overflow-hidden bg-[#020617] text-white font-sans">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full"
          >
            {/* Content Side */}
            <div className="flex flex-col space-y-8 text-left order-2 md:px-0 max-[800px]:px-5 px-5 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div
                  className={cn(
                    "p-2 rounded-lg glass shadow-lg",
                    `bg-gradient-to-br ${slide.accent}`,
                  )}
                >
                  {slide.icon}
                </div>
                <span className="text-sm font-medium tracking-widest uppercase text-white/60">
                  {slide.subtitle}
                </span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-7xl font-bold tracking-tight font-heading"
                >
                  {slide.title.split(" ").map((word, i) => (
                    <span
                      key={i}
                      className={cn(
                        i >= slide.title.split(" ").length - 2 &&
                          "text-transparent bg-clip-text bg-gradient-to-r",
                        i >= slide.title.split(" ").length - 2 && slide.accent,
                      )}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-white/50 max-w-xl leading-relaxed"
                >
                  {slide.description}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Button
                  type="submit"
                  variant="primaryRed"
                  size="lg"
                  className="text-md font-semibold"
                >
                  <Link to={RouteContact}>Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-5 py-4 text-lg font-semibold rounded glass hover:bg-white/10 text-white border-white/10"
                >
                  Case Studies
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-8 pt-8 border-t border-white/5"
              >
                {slide.features.map((feature, i) => (
                  <div key={i} className="flex flex-col space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                      Feature 0{i + 1}
                    </span>
                    <span className="text-sm font-medium text-white/80">
                      {feature}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual Side */}
            <div className="relative order-1 lg:order-2 flex justify-center">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: direction > 0 ? 5 : -5,
                }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative group"
              >
                {/* Main Card */}
                <div className="hidden md:block relative z-10 w-[320px] h-[500px] md:w-[550px] md:h-[500px] rounded-[1rem] overflow-hidden shadow-2xl glass p-2">
                  <div className="w-full h-full rounded-[0.8rem] overflow-hidden relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Floating elements inside image container */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/60 mb-1">Status</p>
                          <p className="text-sm font-semibold flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />{" "}
                            Live Project
                          </p>
                        </div>
                        <div
                          className={cn(
                            "p-2 rounded-full",
                            `bg-gradient-to-r ${slide.accent}`,
                          )}
                        >
                          <Monitor className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-8">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full glass hover:bg-white/10 transition-colors border-white/10 text-white/60 hover:text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex space-x-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={cn(
                "h-1.5 transition-all duration-300 rounded-full",
                current === i
                  ? cn("w-12", `bg-gradient-to-r ${slide.accent}`)
                  : "w-4 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full glass hover:bg-white/10 transition-colors border-white/10 text-white/60 hover:text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
