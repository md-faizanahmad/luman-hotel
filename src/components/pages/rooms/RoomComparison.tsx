"use client";

import { Check, Minus } from "lucide-react";

const comparisonData = [
  { feature: "Floor Area", ocean: "65m²", royal: "120m²", garden: "85m²" },
  { feature: "Private Pool", ocean: false, royal: true, garden: true },
  { feature: "Butler Service", ocean: false, royal: true, garden: false },
  { feature: "Ocean View", ocean: true, royal: true, garden: false },
  { feature: "Smart Home Tech", ocean: true, royal: true, garden: true },
];

export default function RoomComparison() {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-16">
          Compare Our Collections
        </h2>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="py-6 font-serif text-xl italic text-zinc-400">
                  Features
                </th>
                <th className="py-6 font-serif text-xl">Ocean Suite</th>
                <th className="py-6 font-serif text-xl">Royal Penthouse</th>
                <th className="py-6 font-serif text-xl">Garden Villa</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-zinc-100 group hover:bg-white transition-colors"
                >
                  <td className="py-5 text-sm font-bold uppercase tracking-widest text-zinc-500">
                    {item.feature}
                  </td>
                  <td className="py-5">
                    {typeof item.ocean === "boolean" ? (
                      item.ocean ? (
                        <Check className="text-orange-600" />
                      ) : (
                        <Minus className="text-zinc-200" />
                      )
                    ) : (
                      item.ocean
                    )}
                  </td>
                  <td className="py-5 font-bold">
                    {typeof item.royal === "boolean" ? (
                      item.royal ? (
                        <Check className="text-orange-600" />
                      ) : (
                        <Minus className="text-zinc-200" />
                      )
                    ) : (
                      item.royal
                    )}
                  </td>
                  <td className="py-5">
                    {typeof item.garden === "boolean" ? (
                      item.garden ? (
                        <Check className="text-orange-600" />
                      ) : (
                        <Minus className="text-zinc-200" />
                      )
                    ) : (
                      item.garden
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
