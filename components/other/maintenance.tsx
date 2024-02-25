import React from "react";

async function getMaintenanceStatus() {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: "no-store",
  };

  try {
    const res = await fetch(`${process.env.CMS_URL}/api/cmsconfig`, {
      ...options,
      cache: "no-store" as RequestCache,
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}

const Maintenance: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const result = await getMaintenanceStatus();

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
