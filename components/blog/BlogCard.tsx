import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BlogCard = ({ blog, config }: any) => {
  const truncateBlogDesc = !(blog.attributes.Description === null)
      ? blog.attributes.Description.substring(0, 50) + "..."
      : "No description available";

    const imageUrl = !(blog.attributes.img.data === null)
    ? config.data.attributes.StrapiUrl + blog.attributes.img.data
    : config.data.attributes.StrapiUrl +
      config.data.attributes.DefaultBlogImage.data.attributes.url;

  return (
    <Card>
      <CardHeader>
        <div className="mb-4 text-center">
          {blog.attributes.categories.data.map((category: any) => (
            <React.Fragment key={category.id}>
              <Link href={`/categories/${category.id}`}>
                <Badge variant="destructive">{category.attributes.Title}</Badge>{" "}
              </Link>
            </React.Fragment>
          ))}
        </div>
        <Link className="justify-center" href={`/blog/${blog.id}`}>
          {imageUrl && (
            <Image
              className="bg-cover bg-center backdrop-filter backdrop-blur-3xl h-32"
              width={1280}
              height={720}
              alt="Blog card image"
              src={imageUrl}
            />
          )}
        </Link>
      </CardHeader>
      <Link className="justify-center" href={`/blog/${blog.id}`}>
        <CardContent>
          <CardTitle className="text-center">{blog.attributes.Title}</CardTitle>
          <CardDescription className="mt-4">{truncateBlogDesc}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
};

export default BlogCard;
