import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()
    const { date, time } = body

    if (!date || !time) {
      return NextResponse.json(
        { message: "Missing data" },
        { status: 400 }
      )
    }

    // 🧪 هنا مؤقتًا (بدون DB)
    console.log("Appointment booked:", date, time)

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}
