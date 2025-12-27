"use client";

import React from "react";
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
            Welcome to <span className="text-lime-600">Doctor Appointment</span>
          </DialogTitle>
          <DialogDescription className="text-base">
            Sign in to book your appointment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Registration Link - At Top */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-3">
              Don't have an account?
            </p>
            <RegisterLink>
              <Button 
                variant="outline" 
                className="w-full border-2 border-lime-600 text-lime-600 hover:bg-lime-50 py-6 text-lg font-semibold transition-all"
              >
                Create Account / Sign Up
              </Button>
            </RegisterLink>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Sign In Button - At Bottom */}
          <LoginLink>
            <Button className="w-full bg-gradient-to-r from-lime-600 to-lime-700 hover:from-lime-700 hover:to-lime-800 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              Sign In
            </Button>
          </LoginLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;

