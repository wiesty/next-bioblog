"use server";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/other/navbar";
import Image from "next/image";
import { config } from "process";

export async function fetchConfig() {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const [configRes] = await Promise.all([
      fetch(`${process.env.CMS_URL}/api/cmsconfig?populate=*`, {
        ...headers,
        next: { tags: ['collection'] }
      }),
    ]);

    const [configData] = await Promise.all([configRes.json()]);

    return {
      configData,
    };
  } catch (err) {
    return {
      configData: null,
    };
  }
}

const Header = async () => {
  const { configData } = await fetchConfig();
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-shadn3"></div>
      <div className="relative bg-opacity-75 bg-dark p-6">
        <div className="flex w-full justify-center">
          <Navbar />
        </div>
        <div className="mt-8 text-center">
          <Image
            className="w-24 h-24 rounded-full mx-auto"
            width={96}
            height={96}
            alt="avatar"
            src={`${process.env.CMS_URL}${configData.data.attributes.BlogAvatar.data.attributes.url}`}
          />
          <h1 className="text-2xl font-semibold text-gray-100 mt-4">
            {configData.data.attributes.BlogTitle}
          </h1>
          <p className="text-gray-100">
            {configData.data.attributes.BlogDescSecondary}
          </p>
          <p className="text-gray-400 mt-2">
            {configData.data.attributes.BlogDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
