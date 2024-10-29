"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme,theme } = useTheme();

  return (
    <div onClick={() => {
      if(theme === 'light'){
        setTheme('dark')
      }
      else{
        setTheme('light')
      }
    }} 
    className="cursor-pointer"
    >
      <Sun className="h-6 w-6 transition-all hidden dark:block" />
      <Moon className="h-6 w-6 transition-all dark:hidden" />
    </div>
  );
}
