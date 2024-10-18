"use client";

import FavoriteRooms from "@/components/FavoriteRooms";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";

// import ImageSlider from "@/components/ImageSlider/ImageSlider";

export default function Home() {
  return (
    // <>
    // <div className="w-full mt-10"> 
    //     {/* <ImageSlider /> */}
    //     <Hero/>
        
    //   </div>
    // </>
    <main>
      <Hero/>
      <Feature/>
      <FavoriteRooms/>
    </main>
    
  );
}
