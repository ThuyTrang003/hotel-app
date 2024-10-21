"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function NavBar() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        active ? "bg-white shadow-lg py-2 z-50" : "bg-white py-3 z-50"
      } fixed top-0 left-0 right-0 w-full z-50 transition-all duration-200`}
    >
      <div className="px-5 sm:px-8 md:px-10 lg:px-20 flex justify-between items-center gap-4 sm:gap-8 md:gap-5 lg:gap-5">
        <div className="lg:w-20 md:w-20">
          <Link href={"/"}>
            <Image
              src="logo.svg"
              alt="Hotel"
              width={150}
              height={150}
              priority
              className="w-[90px] sm:w-[120px] md:w-[150px] lg:w-[200px]"
            />
          </Link>
        </div>

        <nav className="hidden lm:block">
          <ul className="flex items-center gap-4 sm:gap-6 md:gap-10 lg:gap-12">
            <li>
              <Link
                href={"/"}
                className="text-[#606060] no-underline tracking-wide flex items-center text-sm sm:text-base md:text-base"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href={"/room"}
                className="text-[#606060] no-underline tracking-wide flex items-center text-sm sm:text-base md:text-base"
              >
                ROOM
              </Link>
            </li>
            <li>
              <Link
                href={"/contact-us"}
                className="text-[#606060] no-underline tracking-wide flex items-center text-sm sm:text-base md:text-base"
              >
                CONTACT US
              </Link>
            </li>
            <li>
              <Link
                href={"/search"}
                className="bg-[#deb666] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-[30px] md:py-[10px] rounded-md font-bold flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out hover:bg-[#c19a52]"
              >
                BOOK ONLINE
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden lm:flex items-center gap-4 sm:gap-6">
          <Link
            href={"/login"}
            className="text-[#606060] font-medium hover:text-black transition duration-300"
          >
            Log In
          </Link>
          <Link
            href={"/signup"}
            className="bg-white text-black px-4 py-2 sm:px-6 sm:py-2 md:items-center rounded-full font-medium hover:bg-gray-200 transition duration-300 border border-solid border-[#606060]"
          >
            Sign Up
          </Link>
        </div>

        <div className=" lm:hidden flex items-center">
          <button className="text-black" onClick={() => setActive(!active)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {active && (
        <div className=" lm:hidden bg-white shadow-lg">
          <nav>
            <ul className="flex flex-col items-center gap-4 sm:gap-6 p-6">
              <li>
                <Link
                  href={"/"}
                  className="text-[#606060] no-underline tracking-wide flex items-center"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href={"/room"}
                  className="text-[#606060] no-underline tracking-wide flex items-center"
                >
                  ROOM
                </Link>
              </li>
              <li>
                <Link
                  href={"/contact-us"}
                  className="text-[#606060] no-underline tracking-wide flex items-center"
                >
                  CONTACT US
                </Link>
              </li>
              <li>
                <Link
                  href={"/search"}
                  className="bg-[#deb666] text-white px-[30px] py-[10px] rounded-md font-bold flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out hover:bg-[#c19a52]"
                >
                  BOOK ONLINE
                </Link>
              </li>
              <li>
                <Link
                  href={"/login"}
                  className="text-[#606060] font-medium hover:text-black transition duration-300"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href={"/signup"}
                  className="bg-white text-black px-[20px] py-[8px] rounded-full font-medium hover:bg-gray-200 transition duration-300 border border-solid border-[#606060]"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
