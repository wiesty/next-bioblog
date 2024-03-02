"use client";
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts'

const Blogs = ({ blogs, config, currentapipage, maxpages, isarchive }: any) => {
  const router = useRouter();
  currentapipage = parseInt(currentapipage);
  const [currentPage, setCurrentPage] = useState(1);
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');
  const postsPerPage = isTabletOrMobile ? 6 : 3;
  
  const totalPosts = blogs.data?.length || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.data?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else if (pageNumber > maxpages && currentapipage < maxpages) {
      setCurrentPage(0)
      router.push(`/archive/${currentapipage + 1}`)
    } else if (pageNumber <= maxpages && currentapipage <= maxpages) {
      if ((currentapipage - 1) <= 0) {
        currentapipage = 1
      } else{
        setCurrentPage(0)
        router.push(`/`)
      }

    }
  };

  return (
    <div>
      {totalPosts > postsPerPage && (
        <div className="mb-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => paginate(currentPage + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentPosts?.map((blogs: any) => (
          <div key={blogs.id}>
            <BlogCard blog={blogs} config={config} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
