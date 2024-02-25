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

export async function getStaticProps() {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const [menuRes, configRes] = await Promise.all([
      fetch(
        `${process.env.CMS_URL}/api/menus/${process.env.FooterMenuId}?populate=*`,
        {
          ...options,
          cache: "no-store" as RequestCache,
        }
      ),
      fetch(`${process.env.CMS_URL}/api/cmsconfig?populate=*`, options),
    ]);

    const [menuData, configData] = await Promise.all([
      menuRes.json(),
      configRes.json(),
    ]);

    return {
      menuData,
      configData,
    };
  } catch (err) {
    console.error("Error fetching menu and config:", err);
    return {
      menuData: null,
      configData: null,
    };
  }
}

const Footer = async () => {
  const { menuData, configData } = await getStaticProps();
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
