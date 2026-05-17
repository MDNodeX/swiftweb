import {
  CardHeader,
  CardTitle,
  Card,
  CardDescription,
} from "@/components/ui/card";
import aboutpagehead from "@/assets/images/10002.svg";

import React from "react";
import { FaServicestack } from "react-icons/fa";

const Service = () => {
  return (
    <>
      <section
        className="relative w-full lg:py-15 py-10 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `
                  linear-gradient(rgba(18, 63, 100, 0.7), rgba(0, 20, 73, 0.7)), url(${aboutpagehead})`,
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="lg:text-7xl text-5xl font-black text-white flex items-center justify-center gap-2">
            Our <div className="text-[#c8102e]">Services</div>
          </h1>
          {/* <p className="text-white/80 mt-4 text-lg">
                  Build modern and scalable websites for your business.
                </p> */}
        </div>
      </section>
     {/* service section */}
           <section className="lg:py-20 py-10">
             {/* <h1 className="lg:text-4xl text-3xl font-extrabold text-black text-center">
               What I will do ?
             </h1> */}
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
     
      {/* work process */}
      <section className="lg:py-20 py-10">
        <h1 className="lg:text-4xl text-3xl font-extrabold text-black text-center flex items-center justify-center gap-2">
          What I<div className="text-[#003057]">will</div> do ?
        </h1>
        <p className="text-lg text-center md:text-1xl text-[#334d5a] lg:w-[500px] px-10 mx-auto mt-5">
          You don't have to struggle alone, you've got our assistance and help.
          It's just not a service, it's a relationship...
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-5 lg:px-20 px-5 my-10">
          <Card
            className="
    bg-white/70
    backdrop-blur-md
    border
    border-white/20
    shadow-lg
    hover:shadow-1xl
    transition-all
    duration-300
    rounded-1.5xl
    hover:-translate-y-1
  "
          >
            <CardHeader className="gap-3 text-center">
              {/* Number */}
              <div className="text-6xl text-[#003057] font-extrabold flex items-center justify-center">
                0<div className="text-[#c8102e]">1</div>
              </div>

              {/* Title */}
              <CardTitle className="text-2xl font-black text-[#0F172A]">
                Create Full Website
              </CardTitle>

              {/* Description */}
              <CardDescription className="text-lg leading-6 text-[#334d5a]">
                I will create any type of website for your business, portfolio,
                company, e-commerce store, blog, etc. I provide a unique, clean
                & awesome graphical design interface.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="
    bg-white/70
    backdrop-blur-md
    border
    border-white/20
    shadow-lg
    hover:shadow-1xl
    transition-all
    duration-300
    rounded-1.5xl
    hover:-translate-y-1
  "
          >
            <CardHeader className="gap-3 text-center">
              {/* Number */}
              <div className="text-6xl text-[#003057] font-extrabold flex items-center justify-center">
                0<div className="text-[#c8102e]">1</div>
              </div>

              {/* Title */}
              <CardTitle className="text-2xl font-black text-[#0F172A]">
                Create Full Website
              </CardTitle>

              {/* Description */}
              <CardDescription className="text-lg leading-6 text-[#334d5a]">
                I will create any type of website for your business, portfolio,
                company, e-commerce store, blog, etc. I provide a unique, clean
                & awesome graphical design interface.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="
    bg-white/70
    backdrop-blur-md
    border
    border-white/20
    shadow-lg
    hover:shadow-1xl
    transition-all
    duration-300
    rounded-1.5xl
    hover:-translate-y-1
  "
          >
            <CardHeader className="gap-3 text-center">
              {/* Number */}
              <div className="text-6xl text-[#003057] font-extrabold flex items-center justify-center">
                0<div className="text-[#c8102e]">1</div>
              </div>

              {/* Title */}
              <CardTitle className="text-2xl font-black text-[#0F172A]">
                Create Full Website
              </CardTitle>

              {/* Description */}
              <CardDescription className="text-lg leading-6 text-[#334d5a]">
                I will create any type of website for your business, portfolio,
                company, e-commerce store, blog, etc. I provide a unique, clean
                & awesome graphical design interface.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="
    bg-white/70
    backdrop-blur-md
    border
    border-white/20
    shadow-lg
    hover:shadow-1xl
    transition-all
    duration-300
    rounded-1.5xl
    hover:-translate-y-1
  "
          >
            <CardHeader className="gap-3 text-center">
              {/* Number */}
              <div className="text-6xl text-[#003057] font-extrabold flex items-center justify-center">
                0<div className="text-[#c8102e]">1</div>
              </div>

              {/* Title */}
              <CardTitle className="text-2xl font-black text-[#0F172A]">
                Create Full Website
              </CardTitle>

              {/* Description */}
              <CardDescription className="text-lg leading-6 text-[#334d5a]">
                I will create any type of website for your business, portfolio,
                company, e-commerce store, blog, etc. I provide a unique, clean
                & awesome graphical design interface.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="
    bg-white/70
    backdrop-blur-md
    border
    border-white/20
    shadow-lg
    hover:shadow-1xl
    transition-all
    duration-300
    rounded-1.5xl
    hover:-translate-y-1
  "
          >
            <CardHeader className="gap-3 text-center">
              {/* Number */}
              <div className="text-6xl text-[#003057] font-extrabold flex items-center justify-center">
                0<div className="text-[#c8102e]">1</div>
              </div>

              {/* Title */}
              <CardTitle className="text-2xl font-black text-[#0F172A]">
                Create Full Website
              </CardTitle>

              {/* Description */}
              <CardDescription className="text-lg leading-6 text-[#334d5a]">
                I will create any type of website for your business, portfolio,
                company, e-commerce store, blog, etc. I provide a unique, clean
                & awesome graphical design interface.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="
    bg-white/70
    backdrop-blur-md
    border
    border-white/20
    shadow-lg
    hover:shadow-1xl
    transition-all
    duration-300
    rounded-1.5xl
    hover:-translate-y-1
  "
          >
            <CardHeader className="gap-3 text-center">
              {/* Number */}
              <div className="text-6xl text-[#003057] font-extrabold flex items-center justify-center">
                0<div className="text-[#c8102e]">1</div>
              </div>

              {/* Title */}
              <CardTitle className="text-2xl font-black text-[#0F172A]">
                Create Full Website
              </CardTitle>

              {/* Description */}
              <CardDescription className="text-lg leading-6 text-[#334d5a]">
                I will create any type of website for your business, portfolio,
                company, e-commerce store, blog, etc. I provide a unique, clean
                & awesome graphical design interface.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
      {/* service section */}
      <section className="lg:py-20 py-10">
        <h1 className="lg:text-4xl text-3xl font-extrabold text-black text-center">
          Our Services
        </h1>
        <div className="flex justify-center items-center lg:gap-25 gap-10 flex-wrap lg:py-20 py-10 lg:px-20 px-5">
          <div className=" flex items-center justify-center">
            {/* card goes her */}
            <div className="relative lg:w-64 lg:mr-0 mr-5">
              {/* yellow background  */}
              <div className="absolute -right-4 -bottom-4 bg-[#ebbb04] h-full w-full rounded-xl"></div>

              <div className="relative bg-[#003057] text-gray-50 rounded-xl p-8 space-y-5">
                {/* yellow line  */}
                <div className="text-3xl font-extrabold text-white">
                  Service
                </div>

                {/* icon  */}
                <div className="text-5xl text-[#ebbb04] font-extrabold">
                  <FaServicestack />
                </div>

                {/* description */}
                <p className="leading-snug text-gray-400">
                  Pagespeed Insights Score. Delight your users and improve your
                  SERP positioning.
                </p>

                {/* learn more */}
                <a
                  href="#"
                  className="block text-yellow-400 font-bold tracking-wide flex"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {/* card goes her */}
            <div className="relative lg:w-64 lg:mr-0 mr-5">
              {/* yellow background  */}
              <div className="absolute -right-4 -bottom-4 bg-[#ebbb04] h-full w-full rounded-xl"></div>

              <div className="relative bg-[#003057] text-gray-50 rounded-xl p-8 space-y-5">
                {/* yellow line  */}
                <div className="text-3xl font-extrabold text-white">
                  Service
                </div>

                {/* percentage  */}
                <div className="text-5xl text-[#ebbb04] font-extrabold">
                  <FaServicestack />
                </div>

                {/* description */}
                <p className="leading-snug text-gray-400">
                  Pagespeed Insights Score. Delight your users and improve your
                  SERP positioning.
                </p>

                {/* learn more */}
                <a
                  href="#"
                  className="block text-yellow-400 font-bold tracking-wide flex"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-center">
            {/* card goes her */}
            <div className="relative lg:w-64 lg:mr-0 mr-5">
              {/* yellow background  */}
              <div className="absolute -right-4 -bottom-4 bg-[#ebbb04] h-full w-full rounded-xl"></div>

              <div className="relative bg-[#003057] text-gray-50 rounded-xl p-8 space-y-5">
                {/* yellow line  */}
                <div className="text-3xl font-extrabold text-white">
                  Service
                </div>

                {/* percentage  */}
                <div className="text-5xl text-[#ebbb04] font-extrabold">
                  <FaServicestack />
                </div>

                {/* description */}
                <p className="leading-snug text-gray-400">
                  Pagespeed Insights Score. Delight your users and improve your
                  SERP positioning.
                </p>

                {/* learn more */}
                <a
                  href="#"
                  className="block text-yellow-400 font-bold tracking-wide flex"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
