'use client'

import Image from "next/image";
import { useDispatch } from 'react-redux'
import { toggleTheme } from './features/theme/themeSlice'  // adjust the import based on your file structure
import { Button } from "@/components/ui/button"
import Demo from "@/components/site/MovingLines/Demo";

export default function Home() {

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme())  // dispatch the toggleTheme action
  }

  return (
    <div className="grid grid-cols-1 content-center">
      <main className="">
        <Demo/>
      </main>
      <footer className="grid grid-cols-1 gap-3 pt-5">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/pages/dashboard"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Dash Board
          </a>
        <Button variant="outline" onClick={handleToggle}>Change Theme</Button>
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </footer>
    </div>
  );
}
