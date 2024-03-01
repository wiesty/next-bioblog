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
import { fetchMenu } from "@/lib/fetchmenubyid";

const Navbar = async () => {
  const { menuData } = await fetchMenu(`${process.env.HeaderMenuId}`);

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
