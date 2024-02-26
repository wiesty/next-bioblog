import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { NavbarClient } from "./navbarclient";

export async function fetchMenu() {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const [menuRes] = await Promise.all([
      fetch(
        `${process.env.CMS_URL}/api/menus/${process.env.HeaderMenuId}?populate=*`,
        {
          ...headers,
          next: { tags: ['collection'] }
        }
      ),
    ]);

    const [menuData] = await Promise.all([menuRes.json()]);

    return {
      menuData,
    };
  } catch (err) {
    console.error("Error fetching menu and config:", err);
    return {
      menuData: null,
      configData: null,
    };
  }
}

const Navbar = async () => {
  const { menuData } = await fetchMenu();

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>site menu</MenubarTrigger>
        <MenubarContent>
          {menuData.data.attributes.items.data.map((menuItem: any) => (
            <React.Fragment key={menuItem.id}>
              <Link href={menuItem.attributes.url}>
                <MenubarItem>{menuItem.attributes.title}</MenubarItem>
              </Link>
            </React.Fragment>
          ))}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>socials</MenubarTrigger>
        <MenubarContent>
          <Link href="https://github.com/wiesty" target="_blank">
            <MenubarItem>
              <FaGithub className="mr-3" /> Github
            </MenubarItem>
          </Link>
          <NavbarClient />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Navbar;
