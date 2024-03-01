import React from "react";
import Link from "next/link";
import { TbBrandNextjs } from "react-icons/tb";
import { SiStrapi } from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchConfig } from "@/lib/fetchconfig";
import { fetchMenu } from "@/lib/fetchmenubyid";

const Footer = async () => {
  const { menuData } = await fetchMenu(`${process.env.FooterMenuId}`);
  const configData = await fetchConfig();
  return (
    <div>
      <footer className="bg-shadn3 mt-8 p-4 text-white text-center">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          {configData.data.attributes.BlogTitle}.{" "}
          {configData.data.attributes.FooterText}{" "}
          {menuData.data.attributes.items.data.map((menuItem: any) => (
            <React.Fragment key={menuItem.id}>
              {" "}
              <Link href={menuItem.attributes.url}>
                {menuItem.attributes.title}
              </Link>
            </React.Fragment>
          ))}
        </p>
        <div className="flex justify-center items-center mt-2">
          <p className="pr-1">Build with</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <TbBrandNextjs />
              </TooltipTrigger>
              <TooltipContent>
                <p>NEXT.JS</p>
              </TooltipContent>
            </Tooltip>{" "}
            <p className="pr-1 pl-1">and</p>
            <Tooltip>
              <TooltipTrigger>
                <SiStrapi />
              </TooltipTrigger>
              <TooltipContent>
                <p>strapi</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
