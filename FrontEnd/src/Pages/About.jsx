import React from "react";
import aboutpagehead from "@/assets/images/10002.svg";
import bannerImage from "@/assets/images/webandappdev.png";
import { Link } from "react-router-dom";
import { RouteContact } from "@/helpers/RouteName";
import aboutImage from "@/assets/images/about.jpg";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <>
      {/* page about */}
      <section
        className="relative w-full lg:py-15 py-10 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(18, 63, 100, 0.7), rgba(0, 20, 73, 0.7)), url(${aboutpagehead})`,
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="lg:text-7xl text-5xl font-black text-white flex items-center justify-center gap-2">
            About <div className="text-[#c8102e]">Us</div>
          </h1>
          {/* <p className="text-white/80 mt-4 text-lg">
            Build modern and scalable websites for your business.
          </p> */}
        </div>
      </section>

      {/* about section */}
      <section className="w-full">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5 items-center lg:px-10 px-5 my-10">
          <div
            className="flex flex-col justify-center items-center lg:py-50 py-25 w-full rounded-lg"
            style={{
              backgroundImage: `url(${aboutImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex flex-col justify-center lg:items-start items-center lg:text-left text-center gap-5 lg:py-20 pb-10">
            <h1 className="lg:text-5xl text-3xl font-black text-[#003057] font-sans">
              Full-Time Web & Application Developer
            </h1>
            <p className="text-lg md:text-1xl text-[#334d5a]">
              Hi, I’m WP Hridoy — a professional Freelancer, Web Developer &
              WordPress Expert from Bangladesh with 6+ years of experience. I
              specialize in creating modern, responsive, and optimized websites
              tailored to client needs. Passionate about learning and improving
              every day, I aim to deliver top-quality results with lifetime
              support you can rely on.
            </p>
            <Button
              type="submit"
              variant="primaryRed"
              size="lg"
              className="text-md font-semibold"
            >
              <Link to={RouteContact}>Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* hero section */}
      <section className="w-full ">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5 lg:px-10 px-5 my-10">
          <div className="flex flex-col justify-center items-center lg:items-start lg:gap-8 gap-5 lg:text-left text-center lg:py-20">
            <h1 className="md:text-5xl text-3xl font-black text-[#003057] font-sans">
              Full-Time Web & Application Developer
            </h1>
            <p className="text-lg md:text-1xl text-[#334d5a]">
              Hi, I’m WP Hridoy — a professional Freelancer, Web Developer &
              WordPress Expert from Bangladesh with 6+ years of experience. I
              specialize in creating modern, responsive, and optimized websites
              tailored to client needs. Passionate about learning and improving
              every day, I aim to deliver top-quality results with lifetime
              support you can rely on.
            </p>
            <Button
              type="submit"
              variant="primaryRed"
              size="lg"
              className="text-md font-semibold"
            >
              <Link to={RouteContact}>Get In Touch</Link>
            </Button>
          </div>
          <div
            className="flex flex-col justify-center items-start md:py-50 py-25 h-full w-full rounded-lg"
            style={{
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </section>
    </>
  );
};

export default About;
