import Image from "next/image";
import { Button } from "../components/ui/button"
import Hero from "../components/_components/Hero"
import CategorySearch from "../components/_components/CategorySearch"





export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero/>
      <div className="container mx-auto px-4">
        <CategorySearch/>
      </div>
    </div>
  );
}
