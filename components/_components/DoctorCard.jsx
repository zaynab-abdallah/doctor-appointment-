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
      className="border rounded-xl p-5 shadow-sm hover:shadow-md transition w-105  cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <img
        src={doctor.image}
        alt={doctor.doctor_name}
        className="w-90 h-60  rounded-lg mb-4"
      />

      {/* Specialty */}
      <span className="inline-block bg-lime-100 text-lime-700 text-sm px-3 py-1 rounded-full mb-3">
        {doctor.specialty}
      </span>

      {/* Info */}
      <p className="text-sm mb-1 w-55">
        <span className="font-semibold  text-lime-700">Name:</span> {doctor.doctor_name}
      </p>

      <p className="text-sm mb-1 w-55">
        <span className="font-semibold  text-lime-700">Address:</span> {doctor.address}
      </p>

      <p className="text-sm mb-4 w-55">
        <span className="font-bold  text-lime-700">Phone:</span> {doctor.phone}
      </p>

      {/* Button */}
      <Button 
        variant="outline" 
        className="w-55 bg-lime-600  hover:bg-lime-700  cursor-pointer hover:scale-105 transition-all text-white"
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
