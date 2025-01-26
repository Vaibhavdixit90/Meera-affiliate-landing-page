import { forwardRef, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  videoPreviewSrc?: string;
  thumbnailAlt?: string;
  className?: string;
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
};

const HeroVideoDialog = forwardRef<HTMLVideoElement, HeroVideoProps>(
  function HeroVideoDialog(
    {
      animationStyle = "from-center",
      videoSrc,
      videoPreviewSrc,
      thumbnailAlt = "Video thumbnail",
      className,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const selectedAnimation = animationVariants[animationStyle];

    return (
      <div className={cn("relative", className)}>
        <div
          className="group relative cursor-pointer"
          onClick={() => setIsVideoOpen(true)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
            ref={containerRef} // Only ref for the div container
            className="rounded-[32px] backdrop-blur-lg"
          >
            <div className="rounded-[24px] p-2">
              <video
                ref={ref}
                src={videoPreviewSrc}
                width={1920}
                height={1080}
                className="w-full rounded-[20px] border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
                loop
                muted
                autoPlay
                playsInline
              />
            </div>
          </motion.div>

          <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md md:size-28">
              <div className="relative flex size-10 scale-100 items-center justify-center rounded-full bg-black transition-all duration-200 ease-out group-hover:scale-[1.2] md:size-20">
                <Play
                  className="size-5 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105 md:size-8"
                  style={{
                    filter:
                      "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsVideoOpen(false)}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            >
              <motion.div
                {...selectedAnimation}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
              >
                <motion.button
                  className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black"
                  onClick={() => setIsVideoOpen(false)}
                >
                  <XIcon className="size-5" />
                </motion.button>
                <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
                  <iframe
                    src={videoSrc}
                    className="size-full rounded-2xl"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default HeroVideoDialog;
