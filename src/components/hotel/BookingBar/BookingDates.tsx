import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalIcon } from "lucide-react";
import { TODAY } from "@/utils/booking";
import { BookingSection } from "./BookingSection";
import { Separator } from "./Separator";

interface Props {
  checkIn?: Date;
  checkOut?: Date;
  onCheckInChange: (date?: Date) => void;
  onCheckOutChange: (date?: Date) => void;
}

export function BookingDates({
  checkIn,
  checkOut,
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
        popoverContent={
          <Calendar
            mode="single"
            selected={checkIn}
            disabled={(date) => date < TODAY}
            onSelect={(date) => {
              onCheckInChange(date);
              onCheckOutChange(undefined); // reset checkout
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
        popoverContent={
          <Calendar
            mode="single"
            selected={checkOut}
            disabled={(date) => !checkIn || date < checkIn}
            onSelect={onCheckOutChange}
          />
        }
      />
    </>
  );
}
