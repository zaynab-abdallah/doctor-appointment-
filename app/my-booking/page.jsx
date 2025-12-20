"use client";

import React, { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import doctors from "@/data/doctors.json";

export default function MyBookingPage() {
  const { user, isLoading } = useKindeBrowserClient();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("upcoming"); // "upcoming" or "past"

  useEffect(() => {
    if (user) {
      // Get appointments from localStorage
      const storedAppointments = localStorage.getItem(`appointments_${user.id}`);
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    }
  }, [user]);

  // Filter appointments based on selected filter
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset time to start of day for comparison

    if (filter === "upcoming") {
      return appointmentDate >= now;
    } else {
      return appointmentDate < now;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6 bg-white rounded shadow">
          Loading...
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4">
            Please log in to view your bookings
          </h2>
        </div>
      </div>
    );
  }
  

  const handleCancelAppointment = (appointmentId) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      const updatedAppointments = appointments.filter((apt) => apt.id !== appointmentId);
      setAppointments(updatedAppointments);
      localStorage.setItem(`appointments_${user.id}`, JSON.stringify(updatedAppointments));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">My Booking</h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        <Button
          onClick={() => setFilter("upcoming")}
          className={`px-6 py-2 rounded-lg transition-all ${
            filter === "upcoming"
              ? "bg-lime-600 text-white hover:bg-lime-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Upcoming
        </Button>
        <Button
          onClick={() => setFilter("past")}
          className={`px-6 py-2 rounded-lg transition-all ${
            filter === "past"
              ? "bg-lime-600 text-white hover:bg-lime-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Past
        </Button>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-2xl w-full">
          <p className="text-gray-500 text-lg mb-6">
            {appointments.length === 0
              ? "You don't have any appointments yet."
              : filter === "upcoming"
              ? "You don't have any upcoming appointments."
              : "You don't have any past appointments."}
          </p>
          {appointments.length === 0 && (
            <Button
              onClick={() => router.push("/")}
              className="bg-lime-600 hover:bg-lime-700 text-white"
            >
              Book an Appointment
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {appointments.map((appointment) => {
            const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
            return (
              <div
                key={appointment.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                {doctor && (
                  <div className="mb-4">
                    <img
                      src={doctor.image}
                      alt={doctor.doctor_name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900">{doctor.doctor_name}</h3>
                    <span className="inline-block bg-lime-100 text-lime-700 text-sm px-3 py-1 rounded-full mt-2">
                      {doctor.specialty}
                    </span>
                  </div>
                )}

                <div className="space-y-3 mt-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase">Date</label>
                    <p className="text-lg text-gray-900 mt-1">
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase">Time</label>
                    <p className="text-lg text-gray-900 mt-1">{appointment.time}</p>
                  </div>

                  {doctor && (
                    <>
                      <div>
                        <label className="text-sm font-semibold text-gray-500 uppercase">Location</label>
                        <p className="text-gray-700 mt-1">{doctor.address}, {doctor.city}</p>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-gray-500 uppercase">Phone</label>
                        <p className="text-gray-700 mt-1">{doctor.phone}</p>
                      </div>
                    </>
                  )}

                  {filter === "upcoming" && (
                    <Button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      variant="outline"
                      className="w-full mt-4 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Cancel Appointment
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
