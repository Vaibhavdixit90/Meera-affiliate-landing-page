"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AmbientColor } from "./ambient-color";
import { Container } from "./container";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Define the structure of the data from the API
interface MeeraAffiliateLandingPageData {
  Contact_Number: string;
  Video_Link: string;
  Contact_Email: string;
}

export const CTA = () => {
  const [data, setData] = useState<MeeraAffiliateLandingPageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cms.flowautomate.io/api/meera-affiliate-landing-page"
        );
        const result = await response.json();
        setData(result.data.attributes);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      <AmbientColor />
      <Container className="flex flex-col md:flex-row justify-between items-center w-full px-8 mb-10">
        <div className="flex flex-col">
          <div className="relative flex flex-col items-start overflow-hidden">
            <h2 className="mt-9 text-white text-left text-3xl font-bold md:text-5xl">
              Contact Us
            </h2>
            <div className="mt-10 flex items-center gap-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Email
              </p>
              <div className="h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-400" />
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {data ? data.Contact_Email : "Loading..."}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Phone
              </p>
              <div className="h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-400" />
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {data ? data.Contact_Number : "Loading..."}
              </p>
            </div>
            <div className="relative mt-10 hidden w-[600px] -translate-x-10 items-center justify-center [perspective:800px] [transform-style:preserve-3d] lg:flex lg:-translate-x-32">
              {/* Assuming Pin is a valid component */}
              <Pin className="right-1 top-0" />
              <Image
                src="https://assets.aceternity.com/pro/world.svg"
                width={500}
                loading="lazy"
                height={500}
                alt="world map"
                className="[transform:rotateX(45deg)_translateZ(0px)] dark:invert dark:filter"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-8 relative">
          {data ? (
            <video
              className="w-full rounded-xl border-2 border-white shadow-lg"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={data.Video_Link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <video
              className="w-full rounded-xl border-2 border-white shadow-lg"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src=" https://cms.flowautomate.io/uploads/Meera_placeholed_animation_302da24a28.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </Container>
    </div>
  );
};

const Pin = ({ className }: { className?: string }) => {
  return (
    <motion.div
      style={{
        transform: "translateZ(1px)",
      }}
      className={cn(
        "pointer-events-none absolute z-[60] flex h-40 w-96 items-center justify-center opacity-100 transition duration-500",
        className
      )}
    >
      <div className="h-full w-full">
        <div className="absolute inset-x-0 top-0 z-20 mx-auto inline-block w-fit rounded-lg bg-neutral-200 px-2 py-1 text-xs font-normal text-neutral-700 dark:bg-neutral-800 dark:text-white">
          We are here
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-blue-400/0 via-blue-400/90 to-blue-400/0 transition-opacity duration-500"></span>
        </div>

        <div
          style={{
            perspective: "800px",
            transform: "rotateX(70deg) translateZ(0px)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,

                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-500/[0.2]"
            ></motion.div>
          </>
        </div>

        <>
          <motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-blue-500 blur-[2px]" />
          <motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-blue-500" />
          <motion.div className="absolute bottom-1/2 right-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-blue-600 blur-[3px]" />
          <motion.div className="absolute bottom-1/2 right-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-blue-300" />
        </>
      </div>
    </motion.div>
  );
};
