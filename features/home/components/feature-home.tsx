import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const Feature = () => {
  return (
    <section className="max_padd_container py-20 xl:py-32 bg-white">
      <div className="w-[90%] m-auto relative lg:flex lg:flex-col">
        <div className="mx-4 mb-6">
          <h4 className="bold-18 text-[32px] leading-tight md:text-[36px] font-semibold">
            HOTEL ZANTE SINCE 1992
          </h4>
          <h3 className="text-[20px] mb-9 max-w-lg">
            High quality accommodation services
          </h3>
          <p className="leading-[1.3] text-black-50 text-[15px] max-w-lg mb-10">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan.
          </p>
          <div className="text-left">
            <Link
              href="/about-us"
              className="inline-block px-6 py-3 text-white font-semibold bg-[#d7b263] rounded-md shadow-md hover:bg-[#caa354] transition-colors"
            >
              More Details
              <ChevronRight className="w-5 h-5 ml-2 inline-block" />
            </Link>
          </div>
        </div>
        <div className="hidden ld:block absolute top-0 right-0 z-0">
          <div className="hover-effect relative h-full perspective-1000 group">
            <div className="relative z-50">
              <Image
                src="/image1.jpg"
                width={500}
                height={300}
                alt="Hình 1"
                className="w-[500px] h-[300px] object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:rotateY-6 hover:scale-105"
                style={{ transform: "translate(-100px, -10px)" }}
              />
            </div>
            <div className="absolute top-[40px] z-10">
              <Image
                src="/image2.jpg"
                width={500}
                height={300}
                alt="Hình 2"
                className="w-[500px] h-[300px] object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:rotateY-6 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
