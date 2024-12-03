"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { toggleTheme } from "./features/theme/themeSlice";
import { Button } from "@/components/ui/button";
import Demo from "@/components/site/MovingLines/Demo";
import NumberDemo from "@/components/site/MovingNumbers/NumberDemo";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme()); // dispatch the toggleTheme action
  };

  return (
    <div className="grid grid-cols-1 content-center">
      <main className="">
        <Demo />
        <NumberDemo />
      </main>
      <footer className="grid grid-cols-1 gap-3 pt-5">
        <Link
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          // target="_blank"
          href={"/dashboard"}
        >
          Go to Dash Board
        </Link>
        <Button variant="outline" onClick={handleToggle}>
          Change Theme
        </Button>
      </footer>
    </div>
  );
}
