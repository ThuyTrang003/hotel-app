import { FavoriteRooms } from "@/features/home/components/favorite-rooms";
import Feature from "@/features/home/components/feature-home";
import Hero from "@/features/home/components/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <FavoriteRooms />
    </main>
  );
}
