import React, { useEffect, useState } from "react";
import { FeaturedImages } from "./featured-images";
import { Button } from "./button";
import Link from "next/link";

const HeroForm = () => {
  const [subheading, setSubheading] = useState("");
  const [subheading2, setSubheading2] = useState("");

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cms.flowautomate.io/api/meera-affiliate-landing-page"
        );
        const data = await response.json();
        const attributes = data?.data?.attributes;

        if (attributes) {
          setSubheading(attributes.Subheading);
          setSubheading2(attributes.Subheading2);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12">
      <div>
        {/* Dynamic Subheading */}
        <p className="text-neutral-400 text-sm md:text-lg max-w-2xl text-center sm:text-left">
          {subheading}
        </p>

        <FeaturedImages
          textClassName="text-left"
          className="justify-start items-center"
          showStars
        />

        <div className="max-w-7xl mx-auto bg-[#facc15] bg-opacity-30 rounded-[20px] p-4 md:p-8 mt-4 relative z-10 my-5 border-2 border-[#facc15]">
          {/* Dynamic Subheading 2 */}
          <p className="text-center text-base md:text-2xl text-white font-normal leading-snug md:leading-[32px]">
            {subheading2}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 mb-8">
        <form className="space-y-8 bg-neutral-800 p-8 rounded-lg shadow-lg ">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-300"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                required
                placeholder="Manu Arora"
                className="block w-full bg-white dark:bg-neutral-900 px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm dark:text-white dark:placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-300"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                required
                placeholder="hello@johndoe.com"
                className="block w-full bg-white dark:bg-neutral-900 px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm dark:text-white dark:placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-neutral-300"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="number"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="1234567890"
                className="block w-full bg-white dark:bg-neutral-900 px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm dark:text-white dark:placeholder-gray-500"
                required
              />
              <p className="text-xs text-red-500 mt-1 hidden" id="number-error">
                Please enter a valid 10-digit phone number.
              </p>
            </div>
          </div>
{/* 
          <div>
            <label
              htmlFor="promotion-type"
              className="block text-sm font-medium text-neutral-300"
            >
              Promotion Type
            </label>
            <div className="mt-2">
              <select
                required
                id="promotion-type"
                className="block w-full bg-white dark:bg-neutral-900 px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm dark:text-white dark:placeholder-gray-500"
              >
                <option value="">Select Promotion Type</option>
                <option value="email">Email Marketing</option>
                <option value="seo">Serach Engine Marketing </option>
                <option value="affiliate-network">Affilate Networks</option>
                <option value="mobile-marketing">Mobile Marketing</option>
                <option value="social-media-marketing">
                  Social Media Marketing
                </option>
                <option value="content">Content</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div> */}

          <div className="flex flex-col items-center">
            <Button className="flex space-x-2 items-center group  bg-[#facc15] capitalize">
              <span>Start earning today</span>
              {/* <HiArrowRight className="text-black group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" /> */}
            </Button>
            <p className="text-sm  text-center mt-4 text-neutral-400">
              Already have an Affiliate{" "}
              <Link href="#" className="text-white font-medium">
                Login Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroForm;
