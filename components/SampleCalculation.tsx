import React from "react";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { RiContactsLine } from "react-icons/ri";

const SampleCalculation = () => {
  return (
    <div className="px-6 max-w-7xl mx-auto" id="sample-calculation">
      <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
        <RiContactsLine className="h-6 w-6 text-[#facc15]" />
      </FeatureIconContainer>
      <h1 className="text-4xl md:text-4xl lg:text-8xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-10 py-6 leading-10 lg:leading-[7rem]">
        Sample Calculation
      </h1>
    </div>
  );
};

export default SampleCalculation;
