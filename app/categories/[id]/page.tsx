import Blogs from "@/components/blog/Blogs";
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchConfig } from "@/lib/fetchconfig";

async function fetchBlogs(id: number) {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(
      `${process.env.CMS_URL}/api/blogs?filters[categories]=${id}&populate=*`,
      {
        ...headers,
        next: { tags: ['collection'] }
      }
    );
    const response = await res.json();
    return response;
  } catch (err) {}
}

async function fetchCategoryName(id: number) {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(`${process.env.CMS_URL}/api/categories/${id}`, {
      ...headers,
      next: { tags: ['collection'] }
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}


export async function generateMetadata({ params }: any): Promise<Metadata> {
  const category = await fetchCategoryName(params.id);
  const config = await fetchConfig();

  if (category.data === null) {
    return {
      title: `404 – ${config.data.attributes.BlogTitle}`,
      description: "",
    };
  } else {
    if (!category.data.attributes.AllowSeoIndex) {
      return {
        robots:
          "noindex, nofollow, noarchive, nosnippet, noimageindex, nofollow",
        title: `${category.data.attributes.Title} – ${config.data.attributes.BlogTitle}`,
        description: "",
      };
    } else {
      return {
        title: `${category.data.attributes.Title} – ${config.data.attributes.BlogTitle}`,
        description: "",
      };
    }
  }
}
const categoriesPage = async ({ params }: any) => {
  const blogs = await fetchBlogs(params.id);
  const config = await fetchConfig();
  const category = await fetchCategoryName(params.id);

  if (blogs.data === null || category.data === null) {
    notFound();
  }

  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <div className="flex">
          <p>filtered by: </p>
          <span className="ml-3 underline">
            {category.data.attributes.Title}
          </span>
        </div>
        <div className="text-right">
          <Link href="/">
            <Button variant="link">reset filter</Button>
          </Link>
        </div>
      </div>
      <div>
      <Blogs blogs={blogs} config={config} />
      </div>
    </div>
  );
};

export default categoriesPage;
