"use client";
import React, { useEffect, useState } from "react";

// Define the types for the API response data
interface ProgramData {
  attributes: {
    Program_For_Heading: string;
    Program_For_Tagline: string; // Added tagline key
    Points: Point[];
  };
}

interface Point {
  id: number;
  Point: string;
}

export const ProgramFor = () => {
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch the data from the API
  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await fetch(
          "https://cms.flowautomate.io/api/meera-affiliate-landing-page?populate=*"
        );
        const data = await response.json();
        setProgramData(data.data); // Assign the data structure
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };

    fetchProgramData();
  }, []);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set mobile breakpoint
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Return loading state until the data is fetched
  if (!programData) {
    return <div>Loading...</div>;
  }

  // Extract points and tagline from the API response
  const { Points: points, Program_For_Tagline: tagline } =
    programData.attributes;

  // Limit points to 6 on mobile
  const visiblePoints = isMobile ? points.slice(0, 6) : points;

  return (
    <div className="max-w-7xl mx-auto py-20 px-8" id="program-for">
      <h1 className="text-4xl md:text-4xl lg:text-8xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-10 py-6 leading-10 lg:leading-[7rem]">
        {programData.attributes.Program_For_Heading}
      </h1>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {visiblePoints.map((point) => (
          <div
            key={point.id}
            className="bg-[#facc15] bg-opacity-30 rounded-[20px] shadow-md border-2 border-[#facc15] p-6 hover:shadow-lg transition-shadow flex justify-center items-center"
          >
            <h3 className="text-lg text-center font-semibold text-white">
              {point.Point}
            </h3>
          </div>
        ))}
      </div>
      {tagline && <h2 className="text-xl text-center mt-10">{tagline}</h2>}
    </div>
  );
};
