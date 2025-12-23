"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import doctors from "../../data/doctors.json";
import DoctorCard from "../_components/DoctorCard";
import { categories } from "../../data/categories.js";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";




function CategorySearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doc.doctor_name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div id="search-section" className="mb-20">
      {/* Title + Search */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="font-bold text-4xl mb-4">
          <span className="text-lime-600">Search</span> Category
        </h2>
        <p className="text-gray-500 mb-6 text-center max-w-lg">
          Find doctors by specialty or name easily
        </p>
        <div className="flex flex-col items-center gap-10">
        <div className="flex w-70 max-w-md">
          <Input
            placeholder="Search by doctor name or specialty"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-center"
          />
          
        </div>
        <Button variant="outline" className="w-20  bg-lime-600  hover:bg-lime-700  cursor-pointer hover:scale-105 transition-all text-white">
        Subscribe
      </Button>

        </div>
      </div>

      {/* Categories */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8 place-items-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="flex flex-col items-center justify-center rounded-xl w-24 h-24 transition-all duration-200 bg-lime-200 hover:bg-lime-300 hover:scale-105"
            onClick={() => {
              router.push(`/search/${encodeURIComponent(cat.name)}`);
            }}
          >
            <img src={cat.icon} alt={cat.name} className="w-14 h-14 mb-1 object-contain" />
            <span className="text-xs font-medium text-center">
            {cat.name}
            </span>
          </button>
        ))}
      </div>
<h2 className="text-2xl text-lime-600 font-bold mt-20 mb-20">
  Popular Doctors
</h2>


      {/* Doctors */}
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No doctors found
          </p>
        )}
      </div>
    </div>
  );
}

export default CategorySearch;
