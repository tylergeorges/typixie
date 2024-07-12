"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  return (
    <div className=" flex gap-2 p-2">
      <Button
        onClick={() => {
          setTheme("theme0");
        }}
      >
        Default
      </Button>
      <Button
        onClick={() => {
          setTheme("theme1");
        }}
      >
        Theme 1
      </Button>
      <Button
        onClick={() => {
          setTheme("theme2");
        }}
      >
        Theme 2
      </Button>
    </div>
  );
};
