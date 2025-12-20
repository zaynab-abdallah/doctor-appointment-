import React from "react";
import doctors from "../../../data/doctors.json";
import DoctorCard from "../../../components/_components/DoctorCard";

export default async function SpecialtyPage({ params }) {
  // Handle params - in Next.js 16, params might be a Promise
  const resolvedParams = params instanceof Promise ? await params : params;
  const specialtyParam = resolvedParams?.specialty || "";
  
  if (!specialtyParam) {
    return (
      <div className="container mx-auto px-4 py-8 mb-20">
        <h2 className="text-3xl font-bold mb-2 text-red-600">
          Specialty not found
        </h2>
        <p className="text-gray-500">Please select a valid specialty.</p>
      </div>
    );
  }

  // Decode the specialty name from URL
  const specialtyName = decodeURIComponent(specialtyParam);
  
  // Filter doctors by specialty
  const filteredDoctors = doctors.filter(
    (doc) => doc.specialty === specialtyName
  );

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <h2 className="text-3xl font-bold mb-2">
        <span className="text-lime-600">{specialtyName}</span> Doctors
      </h2>
      <p className="text-gray-500 mb-8">
        {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""} found
      </p>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            No doctors found in {specialtyName}
          </p>
          <p className="text-gray-400">
            Please try selecting a different specialty
          </p>
        </div>
      )}
    </div>
  );
}
