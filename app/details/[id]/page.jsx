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
    <div className="min-h-screen bg-gradient-to-br from-white/50 via-white/20 to-white/50 backdrop-blur-sm">

      <div className="container mx-auto px-4 py-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Doctor Details */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-lime-600 to-lime-800 bg-clip-text text-transparent">
                Doctor Details
              </h1>

            </div>

            <div className="bg-white/1 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-lime-100">
              <div className="flex flex-col sm:flex-col lg:flex-row gap-8 p-6 sm:p-8">
                {/* Doctor Image */}
                <div className="flex-shrink-0 w-full sm:w-full lg:w-80">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-400 to-lime-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <img
                      src={doctor.image}
                      alt={doctor.doctor_name}
                      className="w-full h-100 aspect-[4/3] object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  {/* Doctor Name */}
                  <div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-900">{doctor.doctor_name}</h2>

                  </div>

                  {/* Experience & Location */}


                  <span className="text-2xl">📚</span>
                  <span className="text-gray-700 font-medium">6 Years Of Experience</span>



                  <span className="text-2xl">📍</span>
                  <span className="text-gray-700 font-medium">{doctor.address}, {doctor.city}</span>



                  {/* Specialty Tag */}
                  <div>
                    <span className="inline-block bg-gradient-to-r from-lime-100 to-lime-200 text-lime-700 text-sm px-5 py-2 m-1.5 rounded-full font-semibold shadow-sm">
                      {doctor.specialty}
                    </span>
                  </div>



                  {/* About Section */}

                  <h2 className="text-2xl font-bold mb-1 text-gray-900">About</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Specializing in {doctor.specialty}. {doctor.clinic_name && `Currently practicing at ${doctor.clinic_name}.`}
                    {doctor.available_days && ` Available ${doctor.available_days}.`}
                  </p>


                  {/* Additional Info */}


                  <p className="text-sm text-lime-600 font-semibold mb-1">Clinic</p>
                  <p className="text-gray-900 font-semibold">{doctor.clinic_name || "Private Practice"}</p>


                  <p className="text-sm text-lime-600 font-semibold mb-1">Phone</p>
                  <p className="text-gray-900 font-semibold">{doctor.phone}</p>


                  <p className="text-sm text-lime-600 font-semibold mb-1">Email</p>
                  <p className="text-gray-900 font-semibold break-all">{doctor.email}</p>

                  {doctor.rating && (
                    <div>
                      <p className="text-sm text-lime-600 font-semibold mb-1">Rating</p>
                      <p className="text-gray-900 font-semibold">⭐ {doctor.rating}/5</p>
                    </div>
                  )}


                  {/* Book Appointment Button */}
                  <div className="pt-2">
                    <BookAppointment doctorId={doctor.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Similar Doctors</h2>
                
              </div>
              <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                {suggestions.map((suggestedDoctor) => (
                  <div
                    key={suggestedDoctor.id}
                    onClick={() => router.push(`/details/${suggestedDoctor.id}`)}
                    className="bg-white rounded-xl shadow-md p-5 cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-lime-300 hover:scale-[1.02] group"
                  >
                    <div className="flex gap-4">
                      {/* Doctor Image */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-lime-400 to-lime-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <img
                          src={suggestedDoctor.image}
                          alt={suggestedDoctor.doctor_name}
                          className="w-20 h-20 object-cover rounded-lg shadow-md"
                        />
                      </div>

                      {/* Doctor Info */}
                      <div className="flex-1 min-w-0">
                        <span className="inline-block bg-gradient-to-r from-lime-100 to-lime-200 text-lime-700 text-xs px-2.5 py-1 rounded-full mb-2 font-medium">
                          {suggestedDoctor.specialty}
                        </span>
                        <h3 className="font-semibold text-gray-900 mb-1 truncate group-hover:text-lime-700 transition-colors">
                          {suggestedDoctor.doctor_name}
                        </h3>
                        <p className="text-sm text-gray-600">5 years Experience</p>
                      </div>
                    </div>
                  </div>
                ))}
                {suggestions.length === 0 && (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
                    <p className="text-gray-500">No other doctors in this specialty</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
