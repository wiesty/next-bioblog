import Blogs from "@/components/blog/Blogs";
import Image from "next/image";
import { fetchConfig } from "@/lib/fetchconfig";

async function fetchBlogs() {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(`${process.env.CMS_URL}/api/blogs?populate=*`, {
      ...headers,
      next: { tags: ["collection"] },
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}

export default async function Home() {
  const blogs = await fetchBlogs();
  const config = await fetchConfig();
  return (
    <div>
      <Blogs blogs={blogs} config={config} />
    </div>
  );
}
