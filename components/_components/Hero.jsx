"use client";

import React from "react";
import { Button } from "./button"
import { useRouter } from "next/navigation";

function Hero() {
    const router = useRouter();
    
    const handleExploreClick = () => {
        router.push("/explore");
    };
    
    return (
        <section>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mb-20">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                    <div>
                        <div className="max-w-prose md:max-w-none">
                            <h2 className="text-2xl font-semibold text-lime-700 sm:text-3xl">
                                Your Health, Just a Click Away
                            </h2>



                            <p className="mt-4 text-pretty text-gray-600 pb-10" >
                                search, compare, and book appointment with top doctors anytime,
                                anywhere. access quality health care from the comfort your home.
                            </p>
                            <Button onClick={handleExploreClick}>Explore Now</Button>
                        </div>
                    </div>

                    <div>
                        <img src="../assets/img/hero.png" className="rounded" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
