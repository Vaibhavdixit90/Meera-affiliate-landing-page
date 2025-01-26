"use client";
import { motion, useMotionValueEvent } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { StickyScroll } from "./ui/sticky-scroll";
import {
  IconTool,
  IconBrandApple,
  IconCurrencyDollar,
  IconCash,
} from "@tabler/icons-react"; // Example icons
import { useScroll } from "framer-motion";
import { BlurImage } from "./blur-image";
import { BsStars } from "react-icons/bs";

// Define a union type for the valid Points
type Point =
  | "No limits on earnings"
  | "Unparalleled technology"
  | "Easy anytime payments";

// Create a map of Points to Icons, ensuring the keys are valid as per the Point type
const pointIconMap: Record<Point, JSX.Element> = {
  "No limits on earnings": (
    <IconCurrencyDollar className="h-8 w-8 text-[#facc15]" />
  ),
  "Unparalleled technology": (
    <BsStars className="h-8 w-8 text-[#facc15]" />
  ),
  "Easy anytime payments": <IconCash className="h-8 w-8 text-[#facc15]" />,
};

export const WhyUs = () => {
  const [content, setContent] = useState<any[]>([]);
  const [heading, setHeading] = useState<string>("");

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgrounds = ["var(--black)", "var(--black)", "var(--black)"];
  const index = Math.round(scrollYProgress.get() * (backgrounds.length - 1));

  const [gradient, setGradient] = useState(backgrounds[0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / content.length);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setGradient(backgrounds[closestBreakpointIndex % backgrounds.length]);
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cms.flowautomate.io/api/meera-affiliate-landing-page?populate[Why_Us][populate]=Related_image"
        );
        const data = await response.json();
        const whyUsData = data?.data?.attributes?.Why_Us || [];
        setHeading(data?.data?.attributes?.Why_Us_Heading || "");

        // Map the API data to the content structure
        const mappedContent = whyUsData.map((item: any) => {
          // Ensure the Point value is a valid key
          const point: Point = item?.Point as Point;

          // Get the icon based on the Point value
          const icon = pointIconMap[point] || (
            <IconTool className="h-8 w-8 text-[#facc15]" />
          );

          return {
            icon: icon, // Use mapped icon
            title: item?.Point || "", // Title from Point
            description: item?.Description || "", // Description from Description
            content: (
              <ImageContainer>
                <BlurImage
                  src={`https://cms.flowautomate.io${item?.Related_image?.data?.attributes?.url}`}
                  alt={item?.Point || "Image"}
                  height="1000"
                  width="1000"
                  className="w-full rounded-lg shadow-xl shadow-brand/[0.2]"
                />
              </ImageContainer>
            ),
          };
        });

        setContent(mappedContent);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      animate={{
        background: gradient,
      }}
      transition={{
        duration: 0.5,
      }}
      ref={ref}
      className="w-full relative h-full pt-20 md:pt-40"
    >
      <div className="px-6" id="why-us">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconTool className="h-6 w-6 text-[#facc15]" />
        </FeatureIconContainer>
        <h1 className="text-4xl md:text-4xl lg:text-8xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-10 py-6 leading-10 lg:leading-[7rem]">
          {heading || ""}
        </h1>
      </div>
      <StickyScroll content={content} />
    </motion.div>
  );
};

const ImageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg relative shadow-2xl">
      {children}
      <div className="absolute bottom-0 w-full h-px inset-x-0 bg-gradient-to-r from-transparent via-[#facc15] to-transparent" />
      <div className="absolute bottom-0 w-40 mx-auto h-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </div>
  );
};
