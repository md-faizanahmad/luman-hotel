import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalIcon } from "lucide-react";
import { TODAY } from "@/utils/booking";
import { BookingSection } from "./BookingSection";
import { Separator } from "./Separator";

type BookingStep = "checkin" | "checkout" | "room" | "guests" | "ready";

interface Props {
  checkIn?: Date;
  checkOut?: Date;
  step: BookingStep;
  open: "checkin" | "checkout" | null;
  onOpenChange: (v: "checkin" | "checkout" | null) => void;
  onCheckInChange: (date: Date) => void;
  onCheckOutChange: (date: Date) => void;
}

export function BookingDates({
  checkIn,
  checkOut,
  step,
  open,
  onOpenChange,
  onCheckInChange,
  onCheckOutChange,
}: Props) {
  return (
    <>
      {/* CHECK-IN */}
      <BookingSection
        label="Check In"
        value={checkIn ? format(checkIn, "dd MMM") : "Add Date"}
        icon={<CalIcon size={16} />}
        isOpen={open === "checkin"}
        onOpenChange={(v) => onOpenChange(v ? "checkin" : null)}
        disabled={false}
        popoverContent={
          <Calendar
            mode="single"
            selected={checkIn}
            disabled={(date) => date < TODAY}
            onSelect={(date) => {
              if (!date) return;
              onCheckInChange(date);
            }}
          />
        }
      />

      <Separator />

      {/* CHECK-OUT */}
      <BookingSection
        label="Check Out"
        value={checkOut ? format(checkOut, "dd MMM") : "Add Date"}
        icon={<CalIcon size={16} />}
        isOpen={open === "checkout"}
        onOpenChange={(v) => onOpenChange(v ? "checkout" : null)}
        disabled={step === "checkin"}
        popoverContent={
          <Calendar
            mode="single"
            selected={checkOut}
            disabled={(date) => !checkIn || date <= checkIn}
            onSelect={(date) => {
              if (!date) return;
              onCheckOutChange(date);
            }}
          />
        }
      />
    </>
  );
}
