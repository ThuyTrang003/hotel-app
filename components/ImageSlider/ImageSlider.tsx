"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Zoom } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import Image from "next/image";

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg"
];

const zoomInProperties = {
  scale: 1,
  duration: 5000,
  transitionDuration: 300,
  infinity: true,

  prevArrow: (
    <div className="ml-10 top-50 md:top-62">
      <ArrowLeftIcon className="h-8 w-8 text-white cursor-pointer" />
    </div>
  ),
  nextArrow: (
    <div className="mr-10 top-50 md:top-62">
      <ArrowRightIcon className="h-8 w-8 text-white cursor-pointer" />
    </div>
  ),
};

export default function ImageSlider() {
  return (
    <div className="w-full h-full">
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div key={index} className="flex justify-center md:items-center items-start w-full h-full relative">
            <Image
              src={each}
              alt={`Slide ${index + 1}`}
              width={2560}
              height={500}
              priority
            />
            <h1 className="absolute md:top-50 top-54 insect-x-1/5 text-center z-10 md:text-6xl text-4xl bold text-white">Hello, user</h1>
          </div>
        ))}
      </Zoom>
    </div>
  );
}
