"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  type ValueAnimationTransition,
} from "motion/react";
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";
import ProductImage from "@/assets/product-image.png";
import { Icons } from "@/components/icons";

const tabs = [
  {
    icon: Icons.gauge,
    title: "User-friendly dashboard",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: Icons.click,
    title: "One-click optimization",
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSizeX: 135,
  },
  {
    icon: Icons.stars,
    title: "Smart keyword generator",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
];

type FeatureTabProps = (typeof tabs)[number] &
  ComponentPropsWithoutRef<"div"> & { selected: boolean };

const FeatureTab = (props: FeatureTabProps) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const xPercentage = useMotionValue(0);
  const yPercentage = useMotionValue(0);

  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

  useEffect(() => {
    if (!tabRef.current || !props.selected) return;

    xPercentage.set(0);
    yPercentage.set(0);
    const { height, width } = tabRef.current.getBoundingClientRect();

    const circumference = height * 2 + width * 2;
    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ];

    const options: ValueAnimationTransition = {
      times,
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "linear",
    };

    animate(xPercentage, [0, 100, 100, 0, 0], options);
    animate(yPercentage, [0, 0, 100, 100, 0], options);
  }, [props.selected, xPercentage, yPercentage]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <div> element required for the animation to work
    <div
      className="relative flex cursor-pointer items-center gap-2.5 rounded-xl border border-muted p-2.5 hover:bg-muted/30"
      ref={tabRef}
      onClick={props.onClick}
    >
      {props.selected && (
        <motion.div
          style={{ maskImage }}
          className="absolute inset-0 -m-px rounded-xl border border-[#A369FF]"
        />
      )}
      <div className="inline-flex size-12 items-center justify-center rounded-lg border border-muted">
        <props.icon className="size-5" />
      </div>
      <div className="font-medium">{props.title}</div>
      {props.isNew && (
        <div className="rounded-full bg-[#8c44ff] px-2 py-0.5 font-semibold text-white text-xs">
          New
        </div>
      )}
    </div>
  );
};

export function Features() {
  const [selectedTab, setSelectedTab] = useState(0);

  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);

  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);

    const animateOptions: ValueAnimationTransition = {
      duration: 2,
      ease: "easeInOut",
    };
    animate(
      backgroundSizeX,
      [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX],
      animateOptions,
    );
    animate(
      backgroundPositionX,
      [backgroundPositionX.get(), tabs[index].backgroundPositionX],
      animateOptions,
    );
    animate(
      backgroundPositionY,
      [backgroundPositionY.get(), tabs[index].backgroundPositionY],
      animateOptions,
    );
  };

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-center font-medium text-5xl tracking-tighter md:text-6xl">
          Elevate your SEO efforts.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-white/70 tracking-tight md:text-xl">
          From small startups to large enterprises, our AI-driven tool has
          revolutionized the way businesses approach SEO.
        </p>
        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          {tabs.map((tab, index) => (
            <FeatureTab
              {...tab}
              key={tab.title}
              onClick={() => handleSelectTab(index)}
              selected={selectedTab === index}
            />
          ))}
        </div>
        <motion.div className="mt-3 rounded-xl border border-muted p-2.5">
          <div
            className="aspect-video rounded-lg border border-muted bg-cover"
            style={{
              backgroundPosition: backgroundPosition.get(),
              backgroundSize: backgroundSize.get(),
              backgroundImage: `url(${ProductImage.src})`,
            }}
          ></div>
        </motion.div>
      </div>
    </section>
  );
}
