"use client";

import { useState } from "react";
import doctorsData from "@/data/doctors.json";
import DoctorCard from "@/components/_components/DoctorCard";
import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  const categories = [
    "All",
    "Cardiology",
    "Dermatology",
    "Dentist",
    "Neurology",
    "Pediatrics",
    "Ophthalmology"
  ];

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSearch = 
      doc.doctor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.specialty === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white/10 backdrop-blur-sm p-4 rounded-xl">

      <div className="container mx-auto px-4 py-12 mb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-lime-600 to-lime-800 bg-clip-text text-transparent">Explore</span>{" "}
            <span className="text-gray-900">Doctors</span>
          </h1>
          <div className="flex justify-center mb-6">
            <div className="h-1.5 w-32 bg-gradient-to-r from-lime-500 to-lime-700 rounded-full"></div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our comprehensive directory of healthcare professionals
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by name or specialty"
            className="w-full bg-white max-w-2xl p-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 shadow-sm hover:shadow-md transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
                selectedCategory === cat 
                  ? "bg-gradient-to-r from-lime-600 to-lime-700 text-white shadow-lg scale-105" 
                  : "bg-white text-gray-700 hover:bg-lime-50 border-2 border-gray-200 hover:border-lime-300 shadow-sm hover:shadow-md"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
            <p className="text-gray-500 text-lg mb-2">No doctors found.</p>
            <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
