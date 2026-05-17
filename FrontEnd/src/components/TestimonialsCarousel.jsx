import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alexander Wright",
    role: "CEO",
    company: "Nexus Systems",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    text: "The level of professionalism and attention to detail provided by this agency is unmatched. They didn't just build a product; they helped us redefine our entire digital presence. Our conversion rate has increased by 140% since the launch.",
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "Lead Designer",
    company: "Studio Bloom",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Collaborating with this team felt like having an elite extension of our own core staff. Their creative vision is fresh, bold, and perfectly aligned with modern SaaS trends. I've never seen such a seamless integration of design and engineering.",
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Founder",
    company: "QuantFlow",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    text: "As a technical founder, I'm extremely picky about performance. The solutions delivered were not only beautiful but blazing fast. They understood our complex requirements from day one and executed flawlessly on every milestone.",
    rating: 5,
    verified: true,
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "VP of Marketing",
    company: "CloudScale",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Rarely do you find an agency that truly understands the intersection of marketing strategy and technical execution. They delivered a platform that is not only a joy for our users but a powerful lead generation engine for our team.",
    rating: 5,
    verified: true,
  },
];

export default function TestimonialsCarousel() {
  const scrollItems = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Background Polish Elements - Subtler for white background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-purple-600 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-zinc-900">
              Trusted by Clients Worldwide
            </h2>
            <p className="text-lg text-zinc-500 font-sans max-w-2xl mx-auto">
              See what our clients say about working with our agency. We pride
              ourselves on delivering exceptional results that drive growth and
              innovation.
            </p>
          </motion.div>
        </div>

        {/* Infinite Scroller */}
        <div className="relative group">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 py-4"
              animate={{
                x: [0, -1800], // Approximation of half the double-array width
              }}
              transition={{
                duration: 35,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{ display: "flex" }}
              //   whileHover={{ animationPlayState: 'paused' }}
            >
              {scrollItems.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="glass-card w-[350px] md:w-[450px] shrink-0 rounded-[10px] p-5 flex flex-col h-full relative"
                >
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-6 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#c8102e" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <div className="flex-1">
                    <p className="text-lg text-zinc-700 font-sans leading-relaxed mb-8">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-zinc-100">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-zinc-200 relative shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-display font-semibold text-zinc-900 truncate">
                          {testimonial.name}
                        </h4>
                        {testimonial.verified && (
                          <CheckCircle2
                            size={12}
                            className="text-blue-600 shrink-0"
                          />
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 font-sans truncate">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
