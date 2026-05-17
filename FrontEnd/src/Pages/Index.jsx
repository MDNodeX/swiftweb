import React from "react";
import ContactForm from "@/components/contact-form";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import portfolios from "@/components/Portfolio";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  Twitter,
  Github,
  Instagram,
} from "lucide-react";

import bgContact from "@/assets/images/bg-contact.png";

// import { Button } from "@/components/ui/button";
import { FaServicestack } from "react-icons/fa";
// import { RouteContact } from "@/helpers/RouteName";
import { HeroSlider } from "@/components/HeroSlider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Loading from "@/components/Loading";

const contactItems = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: "123 Main Street, Dhaka, Bangladesh",
    color: "bg-[#c8102e]/10 text-[#c8102e]",
  },
  {
    icon: Phone,
    title: "Call & Contact",
    details: "+880 1234 567890\ninfo@example.com",
    color: "bg-white/10 text-white",
  },
  {
    icon: Clock,
    title: "Operating Hours",
    details: "Mon-Fri: 09:00 - 20:00\nSat-Sun: 10:30 - 22:00",
    color: "bg-white/10 text-white",
  },
  {
    icon: Clock,
    title: "Operating Hours",
    details: "Mon-Fri: 09:00 - 20:00\nSat-Sun: 10:30 - 22:00",
    color: "bg-white/10 text-white",
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const Index = () => {
  // if (Loading) return <Loading />;
  return (
    <>
      {/* Banner section */}
      <section className="">
        <HeroSlider />
      </section>

      {/* service section */}
      <section className="lg:py-20 py-10">
        <h1 className="lg:text-4xl text-3xl font-extrabold text-black text-center">
          What I will do ?
        </h1>
        <p className="text-lg text-center md:text-1xl text-[#334d5a] lg:w-[500px] px-10 mx-auto mt-5">
          You don't have to struggle alone, you've got our assistance and help.
          It's just not a service, it's a relationship...
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-10 gap-5 lg:px-20 px-5 my-10">
          <Card>
            <CardHeader className="gap-4">
              {/* icon  */}
              <div className="text-5xl text-[#c8102e] font-extrabold">
                <FaServicestack />
              </div>

              <CardTitle className="text-2xl font-black text-[#003057] font-sans">
                Create Full Website
              </CardTitle>

              <CardDescription className="text-lg md:text-1xl text-[#334d5a]">
                I will create any type of website for your business, portfolio,
                company, e-commerce store, blog, etc. I provide a unique, clean
                & awesome graphical design interface.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="">
            <CardHeader className="gap-4">
              {/* icon  */}
              <div className="text-5xl text-[#c8102e] font-extrabold">
                <FaServicestack />
              </div>

              <CardTitle className="md:text-2xl font-black text-[#003057] font-sans">
                E-commerce & shopping
              </CardTitle>

              <CardDescription className="text-lg md:text-1xl text-[#334d5a]">
                Build a fully functional online store with any type of payment
                gateway support and add shopping cart functionality into you’re
                existing website.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="">
            <CardHeader className="gap-4">
              {/* icon  */}
              <div className="text-5xl text-[#c8102e] font-extrabold">
                <FaServicestack />
              </div>

              <CardTitle className="md:text-2xl font-black text-[#003057] font-sans">
                Maintenance & Optimized
              </CardTitle>

              <CardDescription className="text-lg md:text-1xl text-[#334d5a]">
                Website problem & bugs it’s a common problem for every website.
                Don’t worry about bugs and problems. I can fix any type of
                problems & bugs for any website.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* portfolio section */}
      <section className="w-full lg:py-20 py-10 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center">
            <h2 className="mb-10 text-3xl lg:text-4xl font-black text-[#0F172A]">
              Recent Projects
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => (
              <Card
                key={portfolio.id}
                className="group overflow-hidden border-0 rounded-2xl shadow-md bg-white py-0"
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={portfolio.image}
                      alt={portfolio.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[300px] object-cover transform transition-transform duration-200 ease-out group-hover:scale-110 "
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center "></div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-2xl font-bold text-[#0F172A]">
                      {portfolio.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials section */}
      <section className="">
        <TestimonialsCarousel />
      </section>
      {/* contact section */}
      <section className="relative min-h-screen w-full flex items-center justify-center lg:py-20 py-10 px-5 lg:px-10 overflow-hidden bg-primary">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgContact}
            alt="Premium Office Space"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020618]/95 via-[#020618]/80 to-[#c8102e]/20" />
        </div>

        <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Context & Info (7/12 area) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#c8102e]/10 border border-[#c8102e]/20 rounded-full"
              >
                <div className="w-2 h-2 bg-[#c8102e] rounded-full animate-pulse" />
                <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest">
                  Connect with Experts
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h1 className="lg:text-5xl text-3xl font-display font-bold text-white leading-[1.1]">
                  Let's Make Your <br />
                  <span className="text-[#c8102e] underline decoration-white/10 underline-offset-8">
                    Digital Vision
                  </span>{" "}
                  Reality.
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                  Your goals deserve a team that’s proven and ready to deliver.
                  Discussion your challenges, explore tailored strategies, and
                  take the next step.
                </p>
              </motion.div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid sm:grid-cols-2 gap-7">
              {contactItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-start gap-5"
                >
                  <div
                    className={`p-5 rounded-2xl ${item.color} transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(200,16,46,0.2)]`}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-lg">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm whitespace-pre-line leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Presence */}
            <div className="pt-7 border-t border-white/5 space-y-6">
              <h5 className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
                Our Social Presence
              </h5>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    whileHover={{ y: -5 }}
                    href={social.href}
                    className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#c8102e] hover:border-[#c8102e] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form Card (5/12 area) */}
          <div className="lg:col-span-5 relative">
            {/* Decorative Glowing Orbs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#c8102e]/10 blur-[100px] rounded-full" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
