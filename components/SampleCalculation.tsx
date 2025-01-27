"use client";
import React, { useEffect, useState } from "react";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { RiContactsLine } from "react-icons/ri";

// Define the types for the API data
interface SampleCalculationItem {
  id: string;
  Heading: string;
  Description: string;
}

interface ApiResponse {
  data: {
    attributes: {
      Sample_Calculation: SampleCalculationItem[];
      Sample_Calculation_Heading: string;
      Sample_Calculation_Cta_Tagline: string;
    };
  };
}

const SampleCalculation = () => {
  const [data, setData] = useState<ApiResponse["data"]["attributes"] | null>(
    null
  );

  useEffect(() => {
    // Fetch data from the API on component mount
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cms.flowautomate.io/api/meera-affiliate-landing-page?populate=*"
        );
        const result: ApiResponse = await response.json();
        setData(result.data.attributes); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data once on mount

  // If data is not available, show loading message
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-6 max-w-7xl mx-auto mb-[85px]">
      <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
        <RiContactsLine className="h-6 w-6 text-[#facc15]" />
      </FeatureIconContainer>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-10 py-6 leading-10 lg:leading-[5rem]">
        {data.Sample_Calculation_Heading}
      </h1>
      {/* Table */}
      <div className="overflow-x-auto my-10">
        <table className="min-w-full border-collapse border border-gray-300 text-sm text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-base sm:text-lg md:text-xl">
                Referrals in 1-Year
              </th>
              <th className="border border-gray-300 px-4 py-2 text-base sm:text-lg md:text-xl">
                One-Time Commission
              </th>
              <th className="border border-gray-300 px-4 py-2 text-base sm:text-lg md:text-xl">
                Recurring Income
              </th>
              <th className="border border-gray-300 px-4 py-2 text-base sm:text-lg md:text-xl">
                Retention Bonuses
              </th>
              <th className="border border-gray-300 px-4 py-2 text-base sm:text-lg md:text-xl">
                Performance Bonuses
              </th>
              <th className="border border-gray-300 px-4 py-2 text-base sm:text-lg md:text-xl">
                Total Earnings
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">50 Referrals</td>
              <td className="border border-gray-300 px-4 py-2">$5,000</td>
              <td className="border border-gray-300 px-4 py-2">$9,000</td>
              <td className="border border-gray-300 px-4 py-2">$7,500</td>
              <td className="border border-gray-300 px-4 py-2">$1,000</td>
              <td className="border border-gray-300 px-4 py-2">$22,500</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                100 Referrals
              </td>
              <td className="border border-gray-300 px-4 py-2">$10,000</td>
              <td className="border border-gray-300 px-4 py-2">$18,000</td>
              <td className="border border-gray-300 px-4 py-2">$15,000</td>
              <td className="border border-gray-300 px-4 py-2">$4,000</td>
              <td className="border border-gray-300 px-4 py-2">$47,000</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                200 Referrals
              </td>
              <td className="border border-gray-300 px-4 py-2">$20,000</td>
              <td className="border border-gray-300 px-4 py-2">$36,000</td>
              <td className="border border-gray-300 px-4 py-2">$30,000</td>
              <td className="border border-gray-300 px-4 py-2">$11,000</td>
              <td className="border border-gray-300 px-4 py-2">$97,000</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                500 Referrals
              </td>
              <td className="border border-gray-300 px-4 py-2">$50,000</td>
              <td className="border border-gray-300 px-4 py-2">$90,000</td>
              <td className="border border-gray-300 px-4 py-2">$75,000</td>
              <td className="border border-gray-300 px-4 py-2">$31,000</td>
              <td className="border border-gray-300 px-4 py-2">$246,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Dynamic Calculation Info */}
      <div className="mt-8 text-sm sm:text-base lg:text-lg space-y-8">
        {data.Sample_Calculation.map((item) => (
          <div key={item.id}>
            <p>
              <span className="font-semibold text-lg md:text-xl mb-2 text-[#facc15]">
                {item.Heading}:
              </span>
            </p>
            <p>{item.Description}</p>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto bg-[#facc15] bg-opacity-30 rounded-[20px] p-4 md:p-8 relative z-10 my-5 border-2 border-[#facc15] mt-10">
        <div>
          <p className="text-center text-base md:text-2xl text-white font-normal leading-snug md:leading-[32px]">
            {data.Sample_Calculation_Cta_Tagline}
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-[#facc15] font-semibold text-black text-sm md:text-xl transition duration-200 rounded-[10px] px-8 py-2">
            Start Earning Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SampleCalculation;
