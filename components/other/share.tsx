"use client";
import React from "react";
import {
    ContextMenuItem,
  } from "@/components/ui/context-menu"

import { FaDiscord } from "react-icons/fa";
import { toast, useToast } from "@/components/ui/use-toast";
import { useCopyToClipboard } from 'usehooks-ts';
import { useState } from 'react';

export function Share() {
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
          <ContextMenuItem onClick={handleCopy(window.location.href)}>
            share
          </ContextMenuItem>
  );
}
