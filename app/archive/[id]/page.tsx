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
    const res = await fetch(
      `${process.env.CMS_URL}/api/blogs?pagination[page]=${page}&sort[0]=updatedAt:desc&populate=*`,
      {
        ...headers,
        next: { tags: ["collection"] },
      }
    );
    const response = await res.json();
    return response;
  } catch (err) {}
}

const Home = async ({ params }: any) => {
  const blogs = await fetchBlogs(params.id);
  const config = await fetchConfig();
  if (blogs.data === null) {
    notFound();
  }

  return (
    <div>
      <Blogs
        blogs={blogs}
        config={config}
        currentapipage={params.id}
        maxpages={blogs.meta.pagination.pageCount}
        isarchive={true}
      />
    </div>
  );
};

export default Home;
