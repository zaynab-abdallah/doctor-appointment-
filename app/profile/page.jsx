"use client";

import React from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useKindeBrowserClient();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 mb-20 flex flex-col items-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        {/* Profile Picture/Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-lime-600 mb-4 flex items-center justify-center">
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.given_name || user.email || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-lime-400 flex items-center justify-center text-white font-bold text-4xl">
                {(user.given_name?.[0] || user.family_name?.[0] || user.email?.[0] || "U").toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {user.given_name && user.family_name
              ? `${user.given_name} ${user.family_name}`
              : user.given_name || user.email || "User"}
          </h2>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <label className="text-sm font-semibold text-gray-500 uppercase">Email</label>
            <p className="text-lg text-gray-900 mt-1">{user.email || "Not provided"}</p>
          </div>

          {user.given_name && (
            <div className="border-b border-gray-200 pb-4">
              <label className="text-sm font-semibold text-gray-500 uppercase">First Name</label>
              <p className="text-lg text-gray-900 mt-1">{user.given_name}</p>
            </div>
          )}

          {user.family_name && (
            <div className="border-b border-gray-200 pb-4">
              <label className="text-sm font-semibold text-gray-500 uppercase">Last Name</label>
              <p className="text-lg text-gray-900 mt-1">{user.family_name}</p>
            </div>
          )}

          {user.id && (
            <div className="border-b border-gray-200 pb-4">
              <label className="text-sm font-semibold text-gray-500 uppercase">User ID</label>
              <p className="text-lg text-gray-900 mt-1 font-mono text-sm">{user.id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
