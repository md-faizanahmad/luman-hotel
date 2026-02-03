import { RoomType } from "./rooms";

/**
 * Used only inside React components (state).
 * Dates stay as Date objects here.
 */
export interface BookingData {
  checkIn?: Date;
  checkOut?: Date;
  guests: number;
}

/**
 * Sent to API / email / WhatsApp.
 * Must be JSON-serializable.
 */
export interface BookingPayload {
  checkIn: string; // ISO string
  checkOut: string; // ISO string
  guests: number;
  nights: number;

  room: RoomType; // clean room object

  roomTotal: number; // nights * room.price
  gstAmount: number; // calculated
  totalAmount: number; // final payable
}
