"use client";

import { useState } from "react";
import doctorsData from "@/data/doctors.json";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Cardiology",
    "Dermatology",
    "Dentist",
    "Neurology",
    "Pediatrics",
    "Gynecology"
  ];

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.specialty === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Doctors</h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or specialty"
          className="w-full max-w-md p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-lg border ${
              selectedCategory === cat ? "bg-lime-600 text-white" : "bg-white"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No doctors found.
          </div>
        ) : (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white p-6 rounded-xl shadow-lg">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
              <p className="text-gray-500 mb-2">{doctor.specialty}</p>
              <p className="text-gray-600 mb-4">{doctor.description}</p>
              <button className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
                Book Appointment
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
