import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Searchbox } from "@/components/search/searchbox";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { set } from "react-hook-form";

async function fetchBlogs({ items, term }: any) {
  if (!term) return;

  const queryString = items
    .map((item: string) => `filters[${item}][$contains]=${term}`)
    .join("&[$or]");
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

const BlogPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const blogs = await fetchBlogs({
    items: searchParams?.types,
    term: searchParams?.term,
  });
  return (
    <main>
      <Searchbox />
      <div className="mt-6">
      <Table>
        <TableCaption>
          There may be more resutls, please specify your search
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Categories</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs?.data?.map((blogs: any) => (
            <TableRow key={blogs.id}>
              <TableCell>
                {" "}
                <Link href={`/blog/${blogs.id}`}>{blogs?.attributes.Title}</Link>
              </TableCell>
              <TableCell> <Link href={`/blog/${blogs.id}`}>{blogs?.attributes.Description}</Link></TableCell>
              <TableCell className="text-right">
                {blogs?.attributes.categories.data.map((category: any) => (
                  <React.Fragment key={category.id}>
                    <Link href={`/categories/${category.id}`}>
                      <Badge variant="destructive">
                        {category.attributes.Title}
                      </Badge>{" "}
                    </Link>
                  </React.Fragment>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </main>
  );
};

export default BlogPage;
