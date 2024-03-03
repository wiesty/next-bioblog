import React from "react";
import { fetchConfig } from "@/lib/fetchconfig";

const Maintenance: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const result = await fetchConfig();

  if (result.data.attributes.BlogEnabled) {
    return <>{children}</>;
  }

  return (
        <div className="flex justify-center items-center h-screen">
        <div className="text-white text-4xl text-center">
        Site is under maintenance 
          <div className="text-white text-xl mt-1 text-center">Come back later</div>
        </div>
      </div>
  );
};

export default Maintenance;
