import Blogs from "@/components/blog/Blogs";
import Image from "next/image";
import React from "react";
import { fetchConfig } from "@/lib/fetchconfig";
import { notFound } from "next/navigation";

async function fetchBlogs(page: number) {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(`${process.env.CMS_URL}/api/blogs?pagination[page]=${page}&populate=*&sort[0]=updatedAt:desc`, {
      ...headers,
      next: { tags: ["collection"] },
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}


const Home = async ({
  searchParams
}: {
  searchParams: { page: number};
}) => {
  const blogs = await fetchBlogs(searchParams.page || 1);
  const config = await fetchConfig();

  const apipage = searchParams.page || 1;

  if (blogs.data === null) {
    notFound();
  }


  const maxpages = blogs.meta?.pagination.pageCount;
   return (
    <div>
      <Blogs blogs={blogs} config={config} currentapipage={apipage} maxpages={maxpages} isarchive={false}/>
    </div>
  );
};

export default Home;
