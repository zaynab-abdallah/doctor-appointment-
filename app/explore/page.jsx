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
    <div className="container mx-auto px-4 py-8 mb-20">
      <h1 className="text-3xl font-bold text-center mb-8">
        <span className="text-lime-600">Explore</span> Doctors
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or specialty"
          className="w-full max-w-md p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-4 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === cat 
                ? "bg-lime-600 text-white shadow-md" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No doctors found.
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}
