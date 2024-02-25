import Blogs from "@/components/blog/Blogs";
import Image from "next/image";

async function fetchConfig() {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: "no-store",
  };

  try {
    const res = await fetch(`${process.env.CMS_URL}/api/cmsconfig?populate=*`, {
      ...options,
      cache: "no-store" as RequestCache,
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}

async function fetchBlogs() {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: 'no-store',
  };

  try {
    const res = await fetch(
      `${process.env.CMS_URL}/api/blogs?populate=*`,
      {
        ...options,
        cache: 'no-store' as RequestCache,
      }
    );
    const response = await res.json();
    return response;
  } catch (err) {
  }
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