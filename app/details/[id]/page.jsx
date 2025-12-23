"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import doctors from "../../../data/doctors.json";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BookAppointment from "../BookAppointment";

export default function DoctorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params?.id || "";

  // Find the doctor by ID
  const doctor = doctors.find((doc) => doc.id.toString() === doctorId);

  // Get other doctors in the same specialty for suggestions (excluding current doctor)
  const suggestions = doctors.filter(
    (doc) => doc.specialty === doctor?.specialty && doc.id !== doctor?.id
  ).slice(0, 4); // Limit to 4 suggestions

  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-8 mb-20">
        <h2 className="text-3xl font-bold mb-2 text-red-600">
          Doctor not found
        </h2>
        <p className="text-gray-500 mb-4">The doctor you're looking for doesn't exist.</p>
        <Button onClick={() => router.push("/")} className="bg-lime-600 hover:bg-lime-700 text-white">
          Go Back Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4  mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Doctor Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Details</h1>

          <div className="flex flex-col   bg-white rounded-xl shadow-xl p-6 items-center justify-center">

            {/* Doctor Image */}
            <div className="mb-6 flex  ">
              <img
                src={doctor.image}
                alt={doctor.doctor_name}
                className="w-full  object-cover rounded-lg"
              />

            </div>
            <div className="doctor details">

              {/* Doctor Name */}
              <h2 className="text-2xl font-bold mb-4">{doctor.doctor_name}</h2>

              {/* Experience */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📚</span>
                <span className="text-gray-700">6 Years Of Experience</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📍</span>
                <span className="text-gray-700">{doctor.address}, {doctor.city}</span>
              </div>

              {/* Specialty Tag */}
              <div className="mb-6">
                <span className="inline-block bg-lime-100 text-lime-700 text-sm px-4 py-2 rounded-full font-medium">
                  {doctor.specialty}
                </span>
              </div>

              {/* Book Appointment Button */}

              <BookAppointment doctorId={doctor.id} />

              {/* About Section */}
              <div>
                <h2 className="text-2xl font-bold mb-3">About</h2>
                <p className="text-gray-700">
                  Specializing in {doctor.specialty}. {doctor.clinic_name && `Currently practicing at ${doctor.clinic_name}.`}
                  {doctor.available_days && ` Available ${doctor.available_days}.`}
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-6 space-y-2">
                <p className="text-gray-700">
                  <span className=" text-lime-700 font-bold">Clinic:</span> {doctor.clinic_name || "Private Practice"}
                </p>
                <p className="text-gray-700">
                  <span className="text-lime-700 font-bold">Phone:</span> {doctor.phone}
                </p>
                <p className="text-gray-700">
                  <span className="text-lime-700 font-bold">Email:</span> {doctor.email}
                </p>
                {doctor.rating && (
                  <p className="text-gray-700">
                    <span className="text-lime-700 font-bold">Rating:</span> ⭐ {doctor.rating}/5
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions Sidebar */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Suggestions</h2>
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
            {suggestions.map((suggestedDoctor) => (
              <div
                key={suggestedDoctor.id}
                onClick={() => router.push(`/details/${suggestedDoctor.id}`)}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="flex gap-4">
                  {/* Doctor Image */}
                  <img
                    src={suggestedDoctor.image}
                    alt={suggestedDoctor.doctor_name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Doctor Info */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block bg-lime-100 text-lime-700 text-xs px-2 py-1 rounded-full mb-2">
                      {suggestedDoctor.specialty}
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {suggestedDoctor.doctor_name}
                    </h3>
                    <p className="text-sm text-gray-600">5 years Experience</p>
                  </div>
                </div>
              </div>
            ))}
            {suggestions.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No other doctors in this specialty
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
