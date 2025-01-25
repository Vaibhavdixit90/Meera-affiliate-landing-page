"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { IconTool } from "@tabler/icons-react";

export function VideoModal() {
  const [isMobile, setIsMobile] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchVideoLink = async () => {
      try {
        const response = await fetch("https://cms.flowautomate.io/api/meera-affiliate-landing-page?populate=*");
        const data = await response.json();
        const demoVideoLink = data.data.attributes.Demo_Video_Link;
        setVideoLink(demoVideoLink);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video link:", error);
        setLoading(false);
      }
    };
    
    fetchVideoLink();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="md:h-32 md:w-32 h-16 w-16 bg-black/50 rounded-full backdrop-blur-sm flex items-center justify-center">
          <FaPlay className="md:h-10 md:w-10 h-6 w-6 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="h-[50vh] w-[90vw] md:h-[90vh] md:w-[90vw] max-w-none border-none">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ReactPlayer
            url={videoLink || ""}
            width="90%"
            height={isMobile ? "100%" : "100%"}
            style={{
              margin: "auto",
            }}
            controls
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
