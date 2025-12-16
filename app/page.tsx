import Image from "next/image";
import { Button } from "../components/ui/button"
import Hero from "../components/_components/Hero"
import CategorySearch from "../components/_components/CategorySearch"





export default function Home() {
  return (
    <div >
      <Hero/>
      <CategorySearch/>
    </div>
  );
}
