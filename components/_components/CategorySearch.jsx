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
    <div id="search-section" className="mb-20 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-64 bg-gradient-to-b from-lime-50 to-transparent -z-10"></div>
      
      {/* Title + Search */}
      <div className="flex flex-col items-center mb-16 relative z-10">
        <div className="text-center space-y-4 mb-10">
          <h2 className="font-bold text-4xl md:text-5xl mb-2">
            <span className="bg-gradient-to-r from-lime-600 to-lime-800 bg-clip-text text-transparent">Search</span>{" "}
            <span className="text-gray-900">Category</span>
          </h2>
          <div className="flex justify-center">
            <div className="h-1.5 w-32 bg-gradient-to-r from-lime-500 to-lime-700 rounded-full"></div>
          </div>
          <p className="text-gray-600 text-lg mb-8 text-center max-w-2xl mx-auto">
            Find doctors by specialty or name easily. Browse through our comprehensive directory of healthcare professionals.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by doctor name or specialty"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-center py-6 text-lg border-2 border-gray-200 focus:border-lime-500 rounded-xl shadow-sm hover:shadow-md transition-all"
            />
          </div>
          <Button 
            variant="outline" 
            className="bg-gradient-to-r from-lime-600 to-lime-700 hover:from-lime-700 hover:to-lime-800 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            Subscribe
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16 place-items-center relative z-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="flex flex-col items-center justify-center rounded-2xl w-28 h-28 transition-all duration-300 bg-gradient-to-br from-lime-100 to-lime-200 hover:from-lime-200 hover:to-lime-300 hover:scale-110 shadow-md hover:shadow-xl border border-lime-200 group"
            onClick={() => {
              router.push(`/search/${encodeURIComponent(cat.name)}`);
            }}
          >
            <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
              <img src={cat.icon} alt={cat.name} className="w-16 h-16 object-contain" />
            </div>
            <span className="text-xs font-semibold text-center text-gray-700 group-hover:text-lime-700 transition-colors">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
      
      {/* Popular Doctors Section */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-lime-600 to-lime-800 bg-clip-text text-transparent">Popular</span>{" "}
          <span className="text-gray-900">Doctors</span>
        </h2>
        <div className="flex justify-center mb-6">
          <div className="h-1.5 w-32 bg-gradient-to-r from-lime-500 to-lime-700 rounded-full"></div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our most trusted healthcare professionals
        </p>
      </div>


      {/* Doctors */}
      <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
