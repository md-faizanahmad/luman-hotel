"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const currencies = [
  { label: "English", code: "EN", currency: "USD", symbol: "$" },
  { label: "English", code: "EN", currency: "INR", symbol: "₹" },
  { label: "Deutsch", code: "DE", currency: "EUR", symbol: "€" },
];

export function CurrencySwitcher({ isMobile = false }: { isMobile?: boolean }) {
  const [selected, setSelected] = React.useState(currencies[1]); // Default to INR

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isMobile ? "outline" : "ghost"}
          size="sm"
          className={`gap-2 ${isMobile ? "w-full justify-start" : ""}`}
        >
          <Globe className="w-4 h-4" />
          <span>
            {selected.code} · {selected.symbol}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isMobile ? "start" : "end"} className="w-56">
        <DropdownMenuLabel>Language & Currency</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currencies.map((item) => (
          <DropdownMenuItem
            key={item.currency}
            onClick={() => setSelected(item)}
            className="flex justify-between items-center"
          >
            <span>
              {item.label} ({item.currency})
            </span>
            {selected.currency === item.currency && (
              <Check className="w-4 h-4 text-orange-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
