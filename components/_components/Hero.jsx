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
        <section className="relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 mb-20 relative z-10">
                <div className="max-w-3xl">
                    <div className="space-y-6">
                        <div className="max-w-prose">
                            <div className="inline-block mb-4">
                                <span className="text-sm font-semibold text-lime-600 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md">
                                    Welcome to HealthCare
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-600 drop-shadow-lg leading-tight">
                                Your Health, Just a Click Away
                            </h2>
                            
                            <p className="text-lg text-gray-600 drop-shadow-md leading-relaxed mb-8">
                                Search, compare, and book appointments with top doctors anytime,
                                anywhere. Access quality healthcare from the comfort of your home.
                            </p>
                            <Button 
                                onClick={handleExploreClick}
                                className="bg-gradient-to-r from-lime-600 to-lime-700 hover:from-lime-700 hover:to-lime-800 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                Explore Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
