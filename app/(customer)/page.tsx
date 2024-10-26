"use client"
import { FavoriteRooms } from "@/features/home/components/favorite-rooms";
import Feature from "@/features/home/components/feature-home";
import Hero from "@/features/home/components/hero";
import { useEffect, useState } from "react";
import {
  ChevronUp
} from "lucide-react";
export default function Home() {
  const [showScrollToTop, setShowScrollToTop]=useState(false);
  useEffect(()=>{
    const handleScroll=()=>{
      if(window.scrollY>300){
        setShowScrollToTop(true);
      }
      else{
        setShowScrollToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return ()=>{
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  const scrollToTop = ()=>{
    window.scrollTo({ top:0, behavior:"smooth"});
  }
  return (
    <main>
      <Hero />
      <Feature />
      <FavoriteRooms />
      {
        showScrollToTop && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition">
            <ChevronUp className="h-6 w-6"/>
          </button>
        )
      }
    </main>
  );
}
