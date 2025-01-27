import { useEffect, useState } from "react";
import HeroVideoDialog from "./magicui/HeroVideoDialog";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { CiVideoOn } from "react-icons/ci";

export function HeroVideoDialogDemo() {
  const [videoSrc, setVideoSrc] = useState("");
  const [videoPreviewSrc, setVideoPreviewSrc] = useState("");
  const [videoHeading, setVideoHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cms.flowautomate.io/api/meera-affiliate-landing-page"
        );
        const data = await response.json();

        const videoSrc = data?.data?.attributes?.Demo_Video_Link;
        const videoPreviewSrc = data?.data?.attributes?.Demo_VideoPreview_Link;
        const videoHeading = data?.data?.attributes?.Demo_Video_Heading;

        if (videoSrc) setVideoSrc(videoSrc);
        if (videoPreviewSrc) setVideoPreviewSrc(videoPreviewSrc);
        if (videoHeading) setVideoHeading(videoHeading);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative mx-auto max-w-7xl">
      <div className="max-w-7xl mx-auto py-20 px-8 ">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <CiVideoOn className="h-6 w-6 text-[#facc15]" />
        </FeatureIconContainer>
        <h1 className="text-4xl md:text-4xl lg:text-8xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-10 py-6 leading-10 lg:leading-[7rem]">
          {videoHeading || "Demo Video"}
        </h1>
      </div>
      <HeroVideoDialog
        // animationStyle="from-center"
        videoSrc={videoSrc}
        videoPreviewSrc={videoPreviewSrc}
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
