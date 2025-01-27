"use client";
import React, { useEffect, useState } from "react";

export const Footer = () => {
  const [footerText, setFooterText] = useState("");

  useEffect(() => {
    const fetchFooterText = async () => {
      try {
        const response = await fetch(
          "https://cms.flowautomate.io/api/meera-affiliate-landing-page?populate=*"
        );
        const data = await response.json();
        const text = data?.data?.attributes?.Footer_Copyright_Text;
        if (text) {
          setFooterText(text);
        }
      } catch (error) {
        console.error("Failed to fetch footer text:", error);
      }
    };

    fetchFooterText();
  }, []);

  return (
    <div className="relative">
      <div className="border-t border-neutral-900 py-10 relative flex justify-center items-center">
        <p className="text-sm sm:text-xl text-gray-400">{footerText}</p>
      </div>
    </div>
  );
};
