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
        <Button className="w-full bg-lime-600 hover:bg-lime-700 text-white py-6 text-lg mb-6">
          Book Appointment
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[90vw] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Select date and time
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
  <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6">

    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={(day) => day < new Date()}
      className="rounded-lg border"
    />

    <div className="grid grid-cols-3 gap-3">
      {timeSlot.map((time) => (
        <Button
          key={time.time}
          type="button"
          disabled={!date}
          onClick={() => setSelectedTime(time.time)}
          className={`text-sm
            ${selectedTime === time.time
              ? "bg-lime-600 text-white"
              : "hover:bg-lime-600 hover:text-white"}
          `}
        >
          {time.time}
        </Button>
      ))}
    </div>

  </div>

  <Button
    type="submit"
    disabled={loading || !(date && selectedTime)}
    className="w-full bg-lime-600 hover:bg-lime-700 text-white py-5 text-lg mt-6"
  >
    {loading ? "Booking..." : "Book Appointment"}
  </Button>
</form>


       
      </DialogContent>
    </Dialog>
  )
}

export default BookAppointment
