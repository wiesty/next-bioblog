"use client";
import {
  MenubarItem,
} from "@/components/ui/menubar";
import { FaDiscord } from "react-icons/fa";
import { toast, useToast } from "@/components/ui/use-toast";
import { useCopyToClipboard } from 'usehooks-ts';
import { useState } from 'react';

export function NavbarClient() {
  const [copiedText, setCopiedText] = useState(null);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = (text: any) => () => {
    copyToClipboard(text)
      .then(() => {
        setCopiedText(text);
        toast({
          description: `${text} copied to clipboard!`,
        })
      })
      .catch((error) => {
        toast({
          description: `failed to copy. username: ${text}`,
        })
      });
  };

  return (
          <MenubarItem onClick={handleCopy('@wiesty')}>
            <FaDiscord className="mr-3" /> Discord
          </MenubarItem>
  );
}
