'use server'
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
import { headers } from 'next/headers'
import { fetchMenu } from "@/lib/fetchmenubyid";

  const RightClick: React.FC<{ children: React.ReactNode }> = async ({
    children,
  }) => {
    const { menuData } = await fetchMenu(parseInt(`${process.env.HeaderMenuId}`));
    const nonce = headers().get('x-nonce')
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
