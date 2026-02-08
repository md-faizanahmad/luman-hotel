export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BookingPayload } from "@/types/booking";
import { HOTEL_INFO } from "@/config/hotel";

interface FinalBookingRequest {
  booking: BookingPayload;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
}
async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<{ district?: string; state?: string }> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    {
      headers: {
        "User-Agent": "HotelBookingApp/1.0 (contact@yourdomain.com)",
      },
    },
  );

  if (!res.ok) return {};

  const data = await res.json();
  const a = data.address || {};

  return {
    district: a.city || a.town || a.village || a.county,
    state: a.state,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FinalBookingRequest;

    const { booking, customer, location } = body;

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
    let locationText: string | null = null;

    if (location?.lat && location?.lng) {
      try {
        const place = await reverseGeocode(location.lat, location.lng);

        locationText =
          [place.district, place.state].filter(Boolean).join(", ") || null;
      } catch {}
    }

    const googleMapsLink =
      location?.lat && location?.lng
        ? `https://www.google.com/maps?q=${location.lat},${location.lng}`
        : null;

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
${
  location
    ? `
  <hr />
  <h3>Customer Location</h3>

    <p>${locationText}</p>

  ${
    googleMapsLink
      ? `<p><a href="${googleMapsLink}" target="_blank">
          📍 View on Google Maps
        </a></p>`
      : ""
  }

  <p style="font-size:12px;color:#666">
    Location shared voluntarily by the customer for reference.
  </p>
`
    : `
  <hr />
  <p style="font-size:12px;color:#666">
    Customer did not share location.
  </p>
`
}

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

    const customerHtml = `
  <div style="font-family: Arial, sans-serif; line-height:1.6">
    <h2>Booking Request Received</h2>

    <p>Dear ${customer.name},</p>

    <p>
      Thank you for choosing <strong>${HOTEL_INFO.name}</strong>.
      We have successfully received your booking request and shared
      the details with the hotel.
    </p>

    <h3>Hotel Contact Details</h3>
    <p>
      <b>Hotel:</b> ${HOTEL_INFO.name}<br />
      <b>Phone:</b> <a href=telto:${HOTEL_INFO.phone}>${HOTEL_INFO.phone}</a><br />
      <b>Email:</b> ${HOTEL_INFO.email}
    </p>

    <p style="margin-top:12px">
      You may also call the hotel directly for quick confirmation
      or any special requests.
    </p>

    <hr />

    <h3>Your Booking Summary</h3>
    <p><b>Room:</b> ${booking.room.name}</p>
    <p><b>Guests:</b> ${booking.guests}</p>
    <p><b>Check-in:</b> ${booking.checkIn}</p>
    <p><b>Check-out:</b> ${booking.checkOut}</p>
    <p><b>Total Amount:</b> ₹${booking.totalAmount}</p>

    <p style="margin-top:16px">
      This is a booking request, not a payment confirmation.
      The hotel team will contact you shortly to confirm availability.
    </p>

    <p style="font-size:12px;color:#666;margin-top:24px">
      If you have already spoken to the hotel, you can ignore this email.
    </p>

    <p>
      Warm regards,<br />
      ${HOTEL_INFO.name} Team
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

    if (customer.email) {
      await transporter.sendMail({
        from: `"${HOTEL_INFO.name}" <${process.env.BOOKING_EMAIL_USER}>`,
        to: customer.email,
        subject: `Booking Request Received – ${HOTEL_INFO.name}`,
        html: customerHtml,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔥 FINAL BOOKING ERROR:", error);

    return NextResponse.json(
      { message: "Failed to send booking email" },
      { status: 500 },
    );
  }
}
