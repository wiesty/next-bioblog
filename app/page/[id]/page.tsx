import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import { FaAngleLeft } from "react-icons/fa";
import { notFound } from "next/navigation"
import parse from 'html-react-parser';
import { fetchConfig } from "@/lib/fetchconfig";
import { fetchPage } from "@/lib/fetchpagebyid";


export async function generateMetadata({ params }: any): Promise<Metadata> {
  const page = await fetchPage(params.id);
  const config = await fetchConfig();

  if (page.data === null) {
    return {
      title: `404 – ${config.data.attributes.BlogTitle}`,
      description: "",
    };
  } else { if (!page.data.attributes.AllowSeoIndex) {
    return {
      robots: "noindex, nofollow, noarchive, nosnippet, noimageindex, nofollow",
      title: `${page.data.attributes.Title} – ${config.data.attributes.BlogTitle}`,
      description: config.data.attributes.MetaDesc
    };
  } else {
    return {
      title: `${page.data.attributes.Title} – ${config.data.attributes.BlogTitle}`,
      description: page.data.attributes.MetaDesc
    };
  }
}
}

const Page = async ({ params }: any) => {
  const page = await fetchPage(params.id);

  if (page.data === null) {
    notFound();
  }

  return (
    <main>
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <FaAngleLeft />
          <span className="ml-1">back</span>
        </Link>
      </div>
      <div>
        <div className="mt-8">
          <h1 className="text-3xl font-semibold text-primary">
            {page.data.attributes.Title}
          </h1>
          <div className="mt-8 mb-8">
          {parse(page.data.attributes.Content)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
