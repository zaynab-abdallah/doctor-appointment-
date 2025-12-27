"use client";

import React, { useState } from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

function LoginDialog({ isOpen, onOpenChange }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-auto p-6 sm:p-8">
        <DialogHeader className="text-center mb-6">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/img/logo.png"
              alt="Appointment App Logo"
              width={100}
              height={100}
              className="rounded-lg"
            />
          </div>
          
          <DialogTitle className="text-2xl sm:text-3xl font-bold mb-2">
            {isRegisterMode ? (
              <>
                Welcome to <span className="text-lime-600">Doctor Appointment</span>
              </>
            ) : (
              <>
                Welcome to <span className="text-lime-600">Doctor Appointment</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-base">
            {isRegisterMode 
              ? "Create an account to book your appointment" 
              : "Sign in to book your appointment"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isRegisterMode ? (
            <>
              <RegisterLink>
                <Button className="w-full bg-gradient-to-r from-lime-600 to-lime-700 hover:from-lime-700 hover:to-lime-800 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Sign Up
                </Button>
              </RegisterLink>
              <p className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegisterMode(false)}
                  className="text-lime-600 hover:text-lime-700 font-semibold underline"
                >
                  Sign in
                </button>
              </p>
            </>
          ) : (
            <>
              <LoginLink>
                <Button className="w-full bg-gradient-to-r from-lime-600 to-lime-700 hover:from-lime-700 hover:to-lime-800 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Sign In
                </Button>
              </LoginLink>
              <p className="text-center text-gray-600 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsRegisterMode(true)}
                  className="text-lime-600 hover:text-lime-700 font-semibold underline"
                >
                  Sign up
                </button>
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;

