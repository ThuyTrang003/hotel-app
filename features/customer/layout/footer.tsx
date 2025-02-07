import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    return (
        <footer className="flex justify-center bg-black py-12 text-white">
            <div className="container">
                <div className="grid gap-8 lg:grid-cols-4">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="text-xl font-bold">
                            <Image
                                src="/logo.svg"
                                width={100}
                                height={100}
                                alt="logo"
                                className="h-6 w-auto"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Welcome to Hotel Zante, where comfort meets
                            elegance. Experience exceptional hospitality,
                            luxurious rooms, and unforgettable moments. Book
                            your stay with us today!
                        </p>
                    </div>

                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">About</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/career"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Career
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/return"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Return
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Get Updates</h3>
                        <form className="flex gap-4">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                            />
                            <Button variant="secondary">Subscribe</Button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-8 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-gray-400">
                        ©2024 Horizone. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                        <Link
                            href="/privacy"
                            className="text-gray-400 transition-colors hover:text-white"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-gray-400 transition-colors hover:text-white"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
