"use client";

import React from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className=" flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/img/logo.png"
            alt="Appointment App Logo"
            width={120}
            height={120}
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome to <span className="text-lime-600">Doctor Appointment</span>
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Sign in to book your appointment
        </p>

        {/* Login Button */}
        <div className="space-y-4">
          <LoginLink>
            <Button className="w-full bg-lime-600 hover:bg-lime-700 text-white py-6 text-lg">
              Sign In
            </Button>
          </LoginLink>

          {/* Register Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <RegisterLink className="text-lime-600 hover:text-lime-700 font-semibold">
              Sign up
            </RegisterLink>
          </p>
        </div>
      </div>
    </div>
  );
}
