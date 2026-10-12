"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import BackgroundStars from "@/assets/stars.png";
import { ActionButton } from "./action-button";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300],
  );

  return (
    <motion.section
      animate={{ backgroundPositionX: BackgroundStars.width }}
      transition={{
        duration: 120,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      className="mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] relative flex h-[492px] items-center overflow-hidden md:h-[800px]"
      style={{
        backgroundImage: `url(${BackgroundStars.src})`,
        backgroundPositionY,
      }}
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,0.5)_15%,rgb(14,0,36,0.5)_78%,transparent)]" />
      {/* Planet Logic */}
      <div className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] bg-purple-500 shadow-[-20px_-20px_50px_rgb(255,255,255,0.5),-20px_-20px_80px_rgb(255,255,255,0.1),0_0_50px_rgb(140,69,255)] md:size-96" />
      {/* Rings and Mini planets Logic */}
      <motion.div
        animate={{ rotate: "1turn" }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 size-[344px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white opacity-20 md:size-[580px]"
      >
        <div className="absolute top-1/2 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        <div className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        <div className="absolute top-1/2 left-full inline-flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white">
          <div className="size-2 rounded-full bg-white" />
        </div>
      </motion.div>
      <motion.div
        animate={{ rotate: "-1turn" }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 size-[444px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 border-dashed md:size-[780px]"
      />
      <motion.div
        animate={{ rotate: "1turn" }}
        transition={{
          duration: 90,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 size-[544px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white opacity-20 md:size-[980px]"
      >
        <div className="absolute top-1/2 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        <div className="absolute top-1/2 left-full size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
      {/* Hero Section Content Logic */}
      <div className="container relative mt-16">
        <h1 className="bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,0.5))] bg-white bg-clip-text text-center font-semibold text-8xl text-transparent tracking-tighter md:text-[168px] md:leading-none">
          AI SEO
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-white/70 md:text-xl">
          Elevate your site&apos;s visibility effortlessly with AI, where smart
          technology meets user-friendly SEO tools.
        </p>
        <div className="mt-5 flex justify-center">
          <ActionButton label="Join Waitlist" />
        </div>
      </div>
    </motion.section>
  );
}
