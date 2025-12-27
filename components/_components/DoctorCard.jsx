"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function DoctorCard({ doctor }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/details/${doctor.id}`);
  };

  return (
    <div 
      className="border-2 border-gray-100 rounded-2xl p-2 shadow-md hover:shadow-2xl transition-all duration-300 w-full max-w-sm mb-5 cursor-pointer bg-white hover:border-lime-300 group overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Image with overlay effect */}
      <div className="relative mb-5 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-400 to-lime-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
        <img
          src={doctor.image}
          alt={doctor.doctor_name}
          className="w-full h-60 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Specialty */}
      <div className="mb-4">
        <span className="inline-block bg-gradient-to-r from-lime-100 to-lime-200 text-lime-700 text-sm px-4 py-1.5 rounded-full font-semibold shadow-sm">
          {doctor.specialty}
        </span>
      </div>

      {/* Info with better spacing */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-2">
          <span className="text-lime-600 font-bold min-w-[60px]">Name:</span>
          <p className="text-gray-900 font-semibold flex-1">{doctor.doctor_name}</p>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-lime-600 font-bold min-w-[60px]">📍</span>
          <p className="text-gray-700 text-sm flex-1 line-clamp-2">{doctor.address}</p>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-lime-600 font-bold min-w-[60px]">📞</span>
          <p className="text-gray-700 text-sm flex-1">{doctor.phone}</p>
        </div>
      </div>

      {/* Button */}
      <Button 
        variant="outline" 
        className="w-full bg-gradient-to-r from-lime-600 to-lime-700 hover:from-lime-700 hover:to-lime-800 cursor-pointer hover:scale-105 transition-all duration-300 text-white font-semibold py-6 shadow-lg hover:shadow-xl"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/details/${doctor.id}`);
        }}
      >
        Book Now
      </Button>
    </div>
  );
}

export default DoctorCard;
