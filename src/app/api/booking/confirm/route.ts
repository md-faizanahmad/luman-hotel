export const runtime = "nodejs";

import { BookingPayload } from "@/types/booking";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  console.log("ENV DEBUG:", {
    BOOKING_EMAIL_USER: process.env.BOOKING_EMAIL_USER,
    BOOKING_EMAIL_PASS_EXISTS: !!process.env.BOOKING_EMAIL_PASS,
    HOTEL_OWNER_EMAIL: process.env.HOTEL_OWNER_EMAIL,
  });

  try {
    const data: BookingPayload = await req.json();

    // 🔥 HARD GUARD (DO NOT REMOVE)
    if (!data.room || !data.room.name) {
      throw new Error("Room data missing in payload");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.BOOKING_EMAIL_USER,
        pass: process.env.BOOKING_EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("BOOKING PAYLOAD RECEIVED:", data);

    await transporter.sendMail({
      from: `"Hotel Booking" <${process.env.BOOKING_EMAIL_USER}>`,
      to: process.env.HOTEL_OWNER_EMAIL,
      subject: "New Booking Request",
      html: `
        <h3>Room Booking</h3>
        <p><b>Room:</b> ${data.room.name}</p>
        <p><b>Guests:</b> ${data.guests}</p>
        <p><b>Check-in:</b> ${data.checkIn}</p>
        <p><b>Check-out:</b> ${data.checkOut}</p>
        <p><b>Total:</b> ₹${data.totalAmount}</p>
      `,
    });

    const token = Buffer.from(JSON.stringify(data)).toString("base64");

    return NextResponse.json({
      success: true,
      redirectUrl: `/booking/confirm?token=${token}`,
    });
  } catch (error) {
    console.error("🔥 BOOKING CONFIRM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send booking email",
      },
      { status: 500 },
    );
  }
}
