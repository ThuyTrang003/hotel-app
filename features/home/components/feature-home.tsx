import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Feature = () => {
    return (
        <section className="max_padd_container bg-white py-20 xl:py-32">
            <div className="relative m-auto w-[90%] lg:flex lg:flex-col">
                <div className="mx-4 mb-6">
                    <h4 className="bold-18 text-[32px] font-semibold leading-tight md:text-[36px]">
                        HOTEL ZANTE SINCE 1992
                    </h4>
                    <h3 className="mb-9 max-w-lg text-[20px]">
                        High quality accommodation services
                    </h3>
                    <p className="text-black-50 mb-10 max-w-lg text-[15px] leading-[1.3]">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud exerci tation ullamcorper
                        suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat. Duis autem vel eum iriure dolor in hendrerit
                        in vulputate velit molestie consequat, vel illum dolore
                        eu feugiat nulla facilisis at vero eros et accumsan.
                    </p>
                    <div className="text-left">
                        <Link
                            href="/about-us"
                            className="bg-amber-1 hover:bg-amber-1/80 inline-block rounded-md px-6 py-3 font-semibold text-white shadow-md transition-colors"
                        >
                            More Details
                            <ChevronRight className="ml-2 inline-block h-5 w-5" />
                        </Link>
                    </div>
                </div>
                <div className="absolute right-0 top-0 z-0 hidden ld:block">
                    <div className="hover-effect perspective-1000 group relative h-full">
                        <div className="relative z-50">
                            <Image
                                src="/image1.jpg"
                                width={500}
                                height={300}
                                alt="Hình 1"
                                className="hover:rotateY-6 h-[300px] w-[500px] rounded-lg object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                                style={{
                                    transform: "translate(-100px, -10px)",
                                }}
                            />
                        </div>
                        <div className="absolute top-[40px] z-10">
                            <Image
                                src="/image2.jpg"
                                width={500}
                                height={300}
                                alt="Hình 2"
                                className="hover:rotateY-6 h-[300px] w-[500px] rounded-lg object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feature;
