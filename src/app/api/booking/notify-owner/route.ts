import { BookingPayload } from "@/types/booking";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data: BookingPayload = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.BOOKING_EMAIL_USER,
      pass: process.env.BOOKING_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Hotel Booking" <${process.env.BOOKING_EMAIL_USER}>`,
    to: process.env.HOTEL_OWNER_EMAIL,
    subject: "Booking Confirmed by Guest",
    html: `<p>Guest confirmed booking for ${data.room.name}</p>`,
  });

  return NextResponse.json({ success: true });
}
