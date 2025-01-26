import Link from "next/link";
import React from "react";
import { Logo } from "@/components/logo";

export const Footer = () => {
  return (
    <div className="relative">
      <div className="border-t border-neutral-900 py-10  relative flex justify-center items-center">
        <p className="text-xl  text-gray-400">
          All right reserved © 2025 Flow Automate
        </p>
      </div>
    </div>
  );
};
