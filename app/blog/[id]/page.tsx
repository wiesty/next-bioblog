import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import parse from "html-react-parser";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchConfig } from "@/lib/fetchconfig";
import { fetchBlog } from "@/lib/fetchblogbyid";

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
  const config = await fetchConfig();

  if (blog.data === null) {
    notFound();
  }

  let imageUrl = "";
  try {
    imageUrl = `${process.env.CMS_URL}${blog.data.attributes.img.data.attributes.url}`;
  } catch (error) {}

  return (
    <main>
      <div className="relative rounded-lg overflow-hidden">
        {imageUrl !== "" && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center filter blur-sm"
            style={{ backgroundImage: `url(${imageUrl})`, opacity: 0.4 }}
          ></div>
        )}
        <div className="absolute mt-2 z-10 top-0 left-0 ml-2">
          <Link href="/" className="flex z-10 items-center">
            <FaAngleLeft />
            <span className="ml-1">back</span>
          </Link>
        </div>
        <div className="absolute mt-2 z-10 top-0 right-0 mr-2">
          <div className="flex z-10 items-center">
            {blog.data.attributes.categories.data.map((category: any) => (
              <React.Fragment key={category.id}>
                <Link href={`/categories/${category.id}`}>
                  <Badge variant="destructive">
                    {category.attributes.Title}
                  </Badge>{" "}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="relative min-h-52 flex justify-between items-center px-4 py-2">
          <h1 className="text-2xl font-semibold text-primary text-center ml-2 mr-2 break-words">
            {blog.data.attributes.Title}
          </h1>
        </div>
      </div>

      <div>
        <div className="mt-8">
          <p className="text-gray-600 mt-6">
            {blog.data.attributes.Description}
          </p>
          <div className="mt-8">{parse(blog.data.attributes.Content)}</div>
          <div className="mt-4 flex flex-col items-center text-gray-400">
            <span className="text-sm">
              published{" "}
              {new Date(blog.data.attributes.publishedAt).toLocaleString()}
            </span>
            <span className="text-sm">
              updated{" "}
              {new Date(blog.data.attributes.updatedAt).toLocaleString()}
            </span>< br/>
            <span className="text-sm w-72 text-center">
            {config.data.attributes.disclaimer}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
