"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

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
                active ? "z-50 bg-white py-2 shadow-lg" : "z-50 bg-white py-3"
            } fixed left-0 right-0 top-0 z-50 w-full transition-all duration-200`}
        >
            <div className="flex items-center justify-between gap-4 px-5 sm:gap-8 sm:px-8 md:gap-5 md:px-10 lg:gap-5 lg:px-20">
                <div className="md:w-20 lg:w-20">
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
                                className="flex items-center text-sm tracking-wide text-[#606060] no-underline sm:text-base md:text-base"
                            >
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/room"}
                                className="flex items-center text-sm tracking-wide text-[#606060] no-underline sm:text-base md:text-base"
                            >
                                ROOM
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/contact-us"}
                                className="flex items-center text-sm tracking-wide text-[#606060] no-underline sm:text-base md:text-base"
                            >
                                CONTACT US
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/search"}
                                className="flex items-center justify-center gap-2 rounded-md bg-amber-1 px-4 py-2 font-bold text-white transition-colors duration-300 ease-in-out hover:bg-amber-1/80 sm:px-6 sm:py-3 md:px-[30px] md:py-[10px]"
                            >
                                BOOK ONLINE
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="hidden items-center gap-4 sm:gap-6 lm:flex">
                    <Link
                        href={"/login"}
                        className="font-medium text-[#606060] transition duration-300 hover:text-black"
                    >
                        Log In
                    </Link>
                    <Link
                        href={"/signup"}
                        className="rounded-full border border-solid border-[#606060] bg-white px-4 py-2 font-medium text-black transition duration-300 hover:bg-gray-200 sm:px-6 sm:py-2 md:items-center"
                    >
                        Sign Up
                    </Link>
                </div>

                <div className="flex items-center lm:hidden">
                    <button
                        className="text-black"
                        onClick={() => setActive(!active)}
                    >
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
                <div className="bg-white shadow-lg lm:hidden">
                    <nav>
                        <ul className="flex flex-col items-center gap-4 p-6 sm:gap-6">
                            <li>
                                <Link
                                    href={"/"}
                                    className="flex items-center tracking-wide text-[#606060] no-underline"
                                >
                                    HOME
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/room"}
                                    className="flex items-center tracking-wide text-[#606060] no-underline"
                                >
                                    ROOM
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/contact-us"}
                                    className="flex items-center tracking-wide text-[#606060] no-underline"
                                >
                                    CONTACT US
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/search"}
                                    className="flex items-center justify-center gap-2 rounded-md bg-amber-1 px-[30px] py-[10px] font-bold text-white transition-colors duration-300 ease-in-out hover:bg-[#c19a52]"
                                >
                                    BOOK ONLINE
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/login"}
                                    className="font-medium text-[#606060] transition duration-300 hover:text-black"
                                >
                                    Log In
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/signup"}
                                    className="rounded-full border border-solid border-[#606060] bg-white px-[20px] py-[8px] font-medium text-black transition duration-300 hover:bg-gray-200"
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
