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
import { headers } from 'next/headers'

const Navbar = async () => {
  const { menuData } = await fetchMenu(parseInt(`${process.env.HeaderMenuId}`));
const nonce = headers().get('x-nonce')
  return (
    <Menubar nonce={nonce ?? ""}>
      <MenubarMenu>
        <MenubarTrigger>site menu</MenubarTrigger>
        <MenubarContent nonce={nonce ?? ""}>
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
        <MenubarContent nonce={nonce ?? ""}>
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
