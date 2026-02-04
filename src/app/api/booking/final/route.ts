export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BookingPayload } from "@/types/booking";

interface FinalBookingRequest {
  booking: BookingPayload;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FinalBookingRequest;

    const { booking, customer } = body;

    // ---------- HARD VALIDATION ----------
    if (
      !booking ||
      !booking.room ||
      !booking.checkIn ||
      !booking.checkOut ||
      !customer?.name ||
      !customer?.phone
    ) {
      return NextResponse.json(
        { message: "Invalid booking data" },
        { status: 400 },
      );
    }

    // ---------- ENV CHECK ----------
    if (
      !process.env.BOOKING_EMAIL_USER ||
      !process.env.BOOKING_EMAIL_PASS ||
      !process.env.HOTEL_OWNER_EMAIL
    ) {
      console.error("❌ Missing email environment variables");
      return NextResponse.json(
        { message: "Server email configuration error" },
        { status: 500 },
      );
    }

    // ---------- MAIL TRANSPORT ----------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.BOOKING_EMAIL_USER,
        pass: process.env.BOOKING_EMAIL_PASS,
      },
    });

    await transporter.verify();

    // ---------- EMAIL HTML ----------
    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2>New Booking Request</h2>

        <h3>Customer Details</h3>
        <p><b>Name:</b> ${customer.name}</p>
        <p><b>Phone:</b> ${customer.phone}</p>
        ${customer.email ? `<p><b>Email:</b> ${customer.email}</p>` : ""}

        <hr />

        <h3>Booking Details</h3>
        <p><b>Room:</b> ${booking.room.name}</p>
        <p><b>Guests:</b> ${booking.guests}</p>
        <p><b>Check-in:</b> ${booking.checkIn}</p>
        <p><b>Check-out:</b> ${booking.checkOut}</p>
        <p><b>Nights:</b> ${booking.nights}</p>

        <hr />

        <h3>Price Breakdown</h3>
        <p>Room Charges: ₹${booking.roomTotal}</p>
        <p>GST (12%): ₹${booking.gstAmount}</p>
        <p><b>Total Amount: ₹${booking.totalAmount}</b></p>

        <hr />

        <p style="font-size:12px;color:#666">
          This is a booking request. Please contact the customer to confirm availability.
        </p>
      </div>
    `;

    // ---------- SEND MAIL ----------
    await transporter.sendMail({
      from: `"Hotel Booking" <${process.env.BOOKING_EMAIL_USER}>`,
      to: process.env.HOTEL_OWNER_EMAIL,
      subject: `New Booking Request - ${booking.room.name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔥 FINAL BOOKING ERROR:", error);

    return NextResponse.json(
      { message: "Failed to send booking email" },
      { status: 500 },
    );
  }
}
