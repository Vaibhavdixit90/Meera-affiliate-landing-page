import { forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  videoSrc: string;
  videoPreviewSrc?: string;
  thumbnailAlt?: string;
  className?: string;
}

const HeroVideoDialog = forwardRef<HTMLVideoElement, HeroVideoProps>(
  function HeroVideoDialog(
    { videoSrc, videoPreviewSrc, thumbnailAlt = "Video thumbnail", className },
    ref
  ) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0; // Restart the video
        videoRef.current.play();
        setIsPlaying(true);
      }
    };

    const handlePause = () => {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    return (
      <div className={cn("relative", className)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
          className="rounded-[32px] backdrop-blur-lg"
        >
          <div className="relative rounded-[24px] p-2">
            <video
              ref={videoRef}
              src={videoSrc}
              width={1920}
              height={1080}
              className="w-full rounded-[20px] border shadow-lg transition-all duration-200 ease-out"
              controls={isPlaying}
              loop
              muted
              autoPlay
              playsInline
              onPause={handlePause}
            />
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={handlePlay}
              >
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
            )}
          </div>
        </motion.div>
      </div>
    );
  }
);

export default HeroVideoDialog;
