"use server";
import React from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
  } from "@/components/ui/context-menu"

import Link from "next/link";
import { Share } from "@/components/other/share";
  

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

  const RightClick: React.FC<{ children: React.ReactNode }> = async ({
    children,
  }) => {
    const { menuData } = await fetchMenu();
  
    return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
      <ContextMenuSub>
            <ContextMenuSubTrigger>site menu</ContextMenuSubTrigger>
            <ContextMenuSubContent>
            {menuData.data.attributes.items.data.map((menuItem: any) => (
            <React.Fragment key={menuItem.id}>
              <Link href={menuItem.attributes.url}>
              <ContextMenuItem>{menuItem.attributes.title}</ContextMenuItem>
              </Link>
            </React.Fragment>
            ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
        <Share />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default RightClick;
