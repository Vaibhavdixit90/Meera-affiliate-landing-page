"use client";
import React, { useEffect, useState } from "react";

// Define the types for the API response data
interface ProgramData {
  attributes: {
    Program_For_Heading: string;
    Points: Point[];
  };
}

interface Point {
  id: number;
  Point: string;
}

export const ProgramFor = () => {
  const [programData, setProgramData] = useState<ProgramData | null>(null);

  // Fetch the data from the API
  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await fetch(
          "https://cms.flowautomate.io/api/meera-affiliate-landing-page?populate=*"
        );
        const data = await response.json();
        setProgramData(data.data); // TypeScript now knows the structure
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };

    fetchProgramData();
  }, []);

  // Return loading state until the data is fetched
  if (!programData) {
    return <div>Loading...</div>;
  }

  // Extract points from the API response
  const points = programData.attributes.Points;

  return (
    <div className="max-w-7xl mx-auto py-20 px-8" id="program-for">
      <h1 className="text-4xl md:text-4xl lg:text-8xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-10 py-6 leading-10 lg:leading-[7rem]">
        {programData.attributes.Program_For_Heading}
      </h1>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-6">
        {points.map((point) => (
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
    </div>
  );
};
