'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"


function BookAppointment({ doctorId }) {
  const { user } = useKindeBrowserClient();
  const [date, setDate] = useState(new Date())
  const [timeSlot, setTimeSlot] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTime()
  }, [])


  const pastDay=(day)=>{
return day<new Date()
  }



  const getTime = () => {
    const timeList = []

    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: `${i}:00 AM` })
      timeList.push({ time: `${i}:30 AM` })
    }

    for (let i = 1; i <= 5; i++) {
      timeList.push({ time: `${i}:00 PM` })
      timeList.push({ time: `${i}:30 PM` })
    }

    setTimeSlot(timeList)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
  
    if (!date || !selectedTime) return
    if (!user) {
      toast({
        title: "❌ Error",
        description: "Please log in to book an appointment",
        variant: "destructive",
      })
      return
    }
  
    setLoading(true)
  
    try {
      const res = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          time: selectedTime,
          doctorId: doctorId,
        }),
      })
  
      if (!res.ok) {
        throw new Error("Failed to book appointment")
      }

      // Store appointment in localStorage
      const appointment = {
        id: Date.now().toString(),
        doctorId: parseInt(doctorId),
        date: date.toISOString(),
        time: selectedTime,
        createdAt: new Date().toISOString(),
      };

      const existingAppointments = JSON.parse(
        localStorage.getItem(`appointments_${user.id}`) || "[]"
      );
      existingAppointments.push(appointment);
      localStorage.setItem(`appointments_${user.id}`, JSON.stringify(existingAppointments));
  
      toast({
        title: "✅ Appointment booked",
        description: `Your appointment is on ${date.toDateString()} at ${selectedTime}`,
      })
  
      setSelectedTime(null)
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Something went wrong, please try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-lime-600 hover:bg-lime-700 text-white py-4 sm:py-6 text-base sm:text-lg mb-6">
          Book Appointment
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[600px] md:max-w-[800px] mx-auto p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold">Book Appointment</DialogTitle>
          <DialogDescription className="text-sm sm:text-base mt-2">
            Select date and time for your appointment
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 sm:mt-6">
          {/* Layout */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* Calendar */}
            <div className="w-full md:w-[55%] flex justify-center items-start">
              <div className="w-full max-w-[280px] sm:max-w-sm">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(day) => day < new Date()}
                  className="rounded-lg border w-full"
                />
              </div>
            </div>

            {/* Time Slots */}
            <div className="w-full md:w-[45%]">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">
                Select Time
              </h3>
              
              {!date && (
                <p className="text-xs sm:text-sm text-gray-500 mb-4 p-2 bg-gray-50 rounded">
                  Please select a date first
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-h-[300px] sm:max-h-none overflow-y-auto">
                {timeSlot.map((time) => (
                  <Button
                    key={time.time}
                    type="button"
                    disabled={!date}
                    onClick={() => setSelectedTime(time.time)}
                    className={`text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4 transition-all ${
                      selectedTime === time.time
                        ? "bg-lime-600 text-white shadow-md scale-105"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-lime-600 hover:text-white hover:border-lime-600"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {time.time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Info */}
          {date && selectedTime && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-lime-50 border border-lime-200 rounded-lg">
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-semibold">Selected:</span> {date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} at {selectedTime}
              </p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading || !(date && selectedTime)}
            className="w-full bg-lime-600 hover:bg-lime-700 text-white py-4 sm:py-5 text-base sm:text-lg mt-4 sm:mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BookAppointment
