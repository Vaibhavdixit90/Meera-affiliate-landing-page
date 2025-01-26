"use client";
import React, { useRef, useEffect, useState } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { Container } from "./container";
import { PlayfulHeroSection } from "./PlayfulHeroSection";
import { VideoModal } from "./video-modal";
import Beam from "./beam";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { CiVideoOn } from "react-icons/ci";
import { HeroVideoDialogDemo } from "./HeroVideoDialog";

// Define the types for the API response
interface ThumbnailFormats {
  medium: {
    url: string;
  };
}

interface ThumbnailImage {
  data: {
    attributes: {
      formats: ThumbnailFormats;
    };
  };
}

interface HeroData {
  data: {
    attributes: {
      Thumbnail_Image: ThumbnailImage;
      Demo_Video_Heading: string;
    };
  };
}

export const Hero = () => {
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);


  console.log(heroData);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1.2];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, 100]);


  return (
    <div
      ref={containerRef}
      className="flex flex-col min-h-[70rem] md:min-h-[100rem] relative pt-20 overflow-hidden"
    >
      <Container className="flex flex-col items-center justify-center ">
        <PlayfulHeroSection />
      </Container>
      <HeroVideoDialogDemo />
    </div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
  title,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <div className="max-w-7xl mx-auto py-20 px-8 ">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <CiVideoOn className="h-6 w-6 text-[#facc15]" />
        </FeatureIconContainer>
        <h1 className="text-4xl md:text-4xl lg:text-8xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-10 py-6 leading-10 lg:leading-[7rem]">
          {title}
        </h1>
      </div>
      <motion.div
        style={{
          rotateX: rotate,
          translateY: translate,
          // scale,
          boxShadow:
            "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        }}
        className="max-w-7xl z-40 group -mt-12 mx-auto isolate group h-[20rem] md:h-[50rem] w-full border-4 border-neutral-900 p-2 md:p-2 bg-charcoal rounded-[30px] shadow-2xl relative"
      >
        <Beam showBeam className="-top-1 block" />
        <div className="absolute h-40 w-full bottom-0 md:-bottom-10 inset-x-0 scale-[1.2] z-20 pointer-events-none bg-charcoal [mask-image:linear-gradient(to_top,white_30%,transparent)]" />
        <div className="absolute inset-0 z-20  bg-transparent group-hover:bg-black/0 transition-all duration-200 flex items-center justify-center">
          <VideoModal />
        </div>
        <div className=" h-full w-full  overflow-hidden rounded-2xl bg-transparent md:rounded-2xl md:p-4 ">
          {children}
        </div>
      </motion.div>
    </>
  );
};
