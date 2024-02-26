import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import parse from "html-react-parser";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { notFound } from "next/navigation"

async function fetchBlog(id: number) {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    }
  };

  try {
    const res = await fetch(
      `${process.env.CMS_URL}/api/blogs/${id}?populate=*`,
      {
        ...headers,
        next: { tags: ['collection'] }
      }
    );
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
    const res = await fetch(`${process.env.CMS_URL}/api/cmsconfig`, {
      ...headers,
      next: { tags: ['collection'] }
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const blog = await fetchBlog(params.id);
  const config = await fetchConfig();

  if (blog.data === null) {
    return {
      title: `404 – ${config.data.attributes.BlogTitle}`,
      description: "",
    };
  } else {
    let metakeywords = blog.data.attributes.categories.data
      .map((category: any) => category.attributes.Title)
      .join(", ");

    if (!blog.data.attributes.AllowSeoIndex) {
      return {
        robots:
          "noindex, nofollow, noarchive, nosnippet, noimageindex, nofollow",
        title: `${blog.data.attributes.Title} – ${config.data.attributes.BlogTitle}`,
        description: config.data.attributes.MetaDesc,
      };
    } else {
      return {
        title: `${blog.data.attributes.Title} – ${config.data.attributes.BlogTitle}`,
        description: blog.data.attributes.MetaDesc,
        keywords: metakeywords,
      };
    }
  }
}


const BlogPage = async ({ params }: any) => {
  const blog = await fetchBlog(params.id);

  if (blog.data === null) {
    notFound();
  }

  let imageUrl = "";
  try {
    imageUrl = `${process.env.CMS_URL}${blog.data.attributes.img.data.attributes.url}`;
  } catch (error) {}

  return (
    <main>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <FaAngleLeft />
            <span className="ml-1">back</span>
          </Link>
        </div>
        <div className="items-end text-end">
        {blog.data.attributes.categories.data.map((category: any) => (
              <React.Fragment key={category.id}>
                <Link href={`/categories/${category.id}`}>
                  <Badge variant="destructive">{category.attributes.Title}</Badge>{" "}
                </Link>
              </React.Fragment>
            ))}
        </div>
      </div>
      <div>
        {imageUrl !== "" && (
          <div className="relative w-full h-96 overflow-hidden rounded-lg mt-5">
            <Image
              priority
              width={1280}
              height={720}
              src={imageUrl}
              alt={"Blog post image"}
            />
          </div>
        )}
        <div className="mt-8">
          <h1 className="text-3xl font-semibold text-primary">
            {blog.data.attributes.Title}
          </h1>
          <p className="text-gray-600 mt-6">
            {blog.data.attributes.Description}
          </p>
          <div className="mt-8">{parse(blog.data.attributes.Content)}</div>
          <div className="mt-4 flex items-center text-gray-400 mb-8">
            <span className="text-sm">
              published{" "}
              {new Date(blog.data.attributes.publishedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
