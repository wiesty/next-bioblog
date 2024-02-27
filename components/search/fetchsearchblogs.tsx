'use server'
import Blogs from "@/components/blog/Blogs";
import React from "react";

async function fetchBlogs({items, term }: any) {
    console.log(items, term)

  if (!term) return;

  const queryString = items
    .map((item: string) => `filters[$or][][${item}][$contains]=${term}`)
    .join("&");
  const url = `${process.env.CMS_URL}/api/blogs?${queryString}&populate=*`;

  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, {
      ...headers,
      cache: "no-store",
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}

async function fetchConfig() {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(`${process.env.CMS_URL}/api/cmsconfig?populate=*`, {
      ...headers,
      next: { tags: ["collection"] },
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}

const Fetchsearchblogs = async ({ items, term }: any) => {
  const blogs = await fetchBlogs({ items, term });
  const config = await fetchConfig();

  return (
    <div>
      <Blogs blogs={blogs} config={config} />
    </div>
  );
};

export default Fetchsearchblogs;
