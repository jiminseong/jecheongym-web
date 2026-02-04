"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

type MachineStatus = "arrived" | "scheduled";
type MachinePart = "All" | "Chest" | "Back" | "Legs" | "Shoulder" | "Etc";
type MachineBrand =
  | "All"
  | "Panatta"
  | "Nautilus"
  | "Icarian"
  | "Body Masters"
  | "Others"
  | "Hammer Strength"
  | "Cybex"
  | "Atlantis"
  | "Arsenal Strength"
  | "Precor";

const BRAND_LOGOS: Record<string, string> = {
  Panatta: "/logos/panata.png",
  Nautilus: "/logos/nautilus.png",
  Icarian: "/logos/icarian.png",
  "Body Masters": "/logos/body-masters.png",
  "Hammer Strength": "/logos/hammer-strength.png",
  Cybex: "/logos/cybex.png",
  Atlantis: "/logos/atlantis.png",
  "Arsenal Strength": "/logos/arsenal-strength.png",
  Precor: "/logos/precor.png",
};

interface Machine {
  id: number;
  name: string;
  brand: MachineBrand | string;
  part: MachinePart;
  status: MachineStatus;
  date: string;
}

const MACHINES: Machine[] = [
  // Scheduled (입고 예정)
  {
    id: 1,
    name: "Nitro Pullover",
    brand: "Nautilus",
    part: "Back",
    status: "scheduled",
    date: "2026.01.29 예정",
  },
  {
    id: 2,
    name: "Long Pull",
    brand: "Icarian",
    part: "Back",
    status: "scheduled",
    date: "1월 초 예정",
  },
  {
    id: 3,
    name: "Super Lat Pulldown Circular",
    brand: "Panatta",
    part: "Back",
    status: "scheduled",
    date: "입고 예정",
  },
  {
    id: 4,
    name: "Pendulum Squat",
    brand: "Atlantis",
    part: "Legs",
    status: "scheduled",
    date: "2026.04 예정",
  },
  {
    id: 5,
    name: "Low Row",
    brand: "Arsenal Strength",
    part: "Back",
    status: "arrived",
    date: "",
  },

  // Arrived (입고 완료) - Panatta
  { id: 10, name: "Super Low Row", brand: "Panatta", part: "Back", status: "arrived", date: "" },
  { id: 11, name: "Super High Row", brand: "Panatta", part: "Back", status: "arrived", date: "" },
  {
    id: 12,
    name: "Super Rowing Circular",
    brand: "Panatta",
    part: "Back",
    status: "arrived",
    date: "",
  },
  { id: 13, name: "Super Squat", brand: "Panatta", part: "Legs", status: "arrived", date: "" },

  // Arrived - Nautilus
  {
    id: 20,
    name: "Nitro Incline Chest",
    brand: "Nautilus",
    part: "Chest",
    status: "arrived",
    date: "",
  },
  {
    id: 21,
    name: "Nitro Vertical Chest",
    brand: "Nautilus",
    part: "Chest",
    status: "arrived",
    date: "",
  },
  {
    id: 22,
    name: "Explode Chest Press",
    brand: "Nautilus",
    part: "Chest",
    status: "arrived",
    date: "",
  },
  { id: 23, name: "Nitro Dips", brand: "Nautilus", part: "Chest", status: "arrived", date: "" },

  // Arrived - Icarian / Body Masters / Others
  { id: 30, name: "Super Squat 624", brand: "Icarian", part: "Legs", status: "arrived", date: "" },
  {
    id: 31,
    name: "712CXP Pull Down",
    brand: "Body Masters",
    part: "Back",
    status: "arrived",
    date: "",
  },

  // New Machines - Cybex & Precor
  {
    id: 40,
    name: "Side Lateral Raise Machine",
    brand: "Cybex",
    part: "Shoulder",
    status: "arrived",
    date: "",
  },
  {
    id: 41,
    name: "Shoulder Press",
    brand: "Cybex",
    part: "Shoulder",
    status: "arrived",
    date: "",
  },
  {
    id: 42,
    name: "Row Machine",
    brand: "Cybex",
    part: "Back",
    status: "arrived",
    date: "",
  },
  {
    id: 50,
    name: "Peck Deck Fly Machine",
    brand: "Precor",
    part: "Chest",
    status: "arrived",
    date: "",
  },
];

const BRANDS: MachineBrand[] = [
  "All",
  "Panatta",
  "Nautilus",
  "Icarian",
  "Body Masters",
  "Hammer Strength",
  "Cybex",
  "Precor",
  "Atlantis",
  "Arsenal Strength",
  "Others",
];
const PARTS: { key: MachinePart; label: string }[] = [
  { key: "All", label: "전체" },
  { key: "Legs", label: "하체" },
  { key: "Back", label: "등" },
  { key: "Chest", label: "가슴" },
  { key: "Shoulder", label: "어깨/팔" },
  { key: "Etc", label: "기타" },
];

export default function MachineLineup() {
  const [selectedBrand, setSelectedBrand] = useState<MachineBrand>("All");
  const [selectedPart, setSelectedPart] = useState<MachinePart>("All");

  const filteredMachines = useMemo(() => {
    return MACHINES.filter((machine) => {
      const brandMatch =
        selectedBrand === "All"
          ? true
          : selectedBrand === "Others"
            ? ![
                "Panatta",
                "Nautilus",
                "Icarian",
                "Body Masters",
                "Hammer Strength",
                "Cybex",
                "Precor",
                "Atlantis",
                "Arsenal Strength",
              ].includes(machine.brand)
            : machine.brand === selectedBrand;
      const partMatch = selectedPart === "All" ? true : machine.part === selectedPart;
      return brandMatch && partMatch;
    });
  }, [selectedBrand, selectedPart]);

  return (
    <div
      className="w-full max-w-[1200px] mx-auto mt-20 px-6 flex flex-col items-center md:px-0"
      id="machine-lineup"
    >
      <h3 className="text-2xl text-white mb-8 text-center uppercase tracking-[0.1em] md:px-6 md:mb-6">
        Machine Lineup Updates
      </h3>

      <div className="flex flex-col gap-6 mb-12 w-full items-start md:px-6">
        {/* Brand Filter */}
        <div className="w-full">
          <span className="text-gray-text text-[0.75rem] font-bold ml-6 mb-3 uppercase tracking-widest block md:ml-0">
            BRAND
          </span>
          <div className="flex flex-nowrap overflow-x-auto w-full gap-3 px-6 pt-2 pb-4 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:px-0">
            {BRANDS.map((brand) => {
              const logoPath = BRAND_LOGOS[brand];
              const isSelected = selectedBrand === brand;

              return (
                <button
                  key={brand}
                  className={`h-14 px-6 flex items-center justify-center min-w-[140px] bg-transparent border rounded-full transition-all duration-300 whitespace-nowrap ${
                    isSelected
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "text-gray-text border-gray-dark hover:border-gray-text"
                  }`}
                  onClick={() => setSelectedBrand(brand)}
                  title={brand}
                >
                  {logoPath ? (
                    <div className="relative w-full h-full flex items-center justify-center py-2">
                      <Image
                        src={logoPath}
                        alt={brand}
                        width={140}
                        height={50}
                        className={`object-contain max-h-8 w-auto transition-all duration-300 ${
                          isSelected
                            ? "filter-none"
                            : "brightness-0 invert opacity-40 hover:opacity-100"
                        }`}
                      />
                    </div>
                  ) : (
                    <span className="font-bold text-sm tracking-tighter">{brand}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Part Filter */}
        <div className="w-full">
          <span className="text-gray-text text-[0.75rem] font-bold ml-6 mb-3 uppercase tracking-widest block md:ml-0">
            PART
          </span>
          <div className="flex flex-nowrap overflow-x-auto w-full gap-2 px-6 pb-2 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:px-0">
            {PARTS.map((part) => (
              <button
                key={part.key}
                className={`bg-transparent border px-5 py-2.5 text-sm rounded-full transition-all duration-300 whitespace-nowrap ${
                  selectedPart === part.key
                    ? "bg-white text-black border-white font-bold"
                    : "text-gray-text border-gray-dark hover:border-gray-text"
                }`}
                onClick={() => setSelectedPart(part.key)}
              >
                {part.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-4 w-full px-6 pb-10 scroll-snap-type-x scroll-snap-type-mandatory [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] md:gap-6 md:px-0 md:pb-0 md:overflow-visible">
        {filteredMachines.map((machine) => {
          const logoPath = BRAND_LOGOS[machine.brand];

          return (
            <div
              key={machine.id}
              className="flex-[0_0_85%] scroll-snap-align-center bg-[#0c0c0c] border border-gray-dark shadow-lg overflow-hidden flex flex-col transition-all duration-200 relative hover:-translate-y-1 hover:border-[#444] md:flex-1 md:scroll-snap-align-none"
            >
              {/* Image Placeholder */}
              <div className="w-full h-[180px] bg-[#1a1a1a] flex items-center justify-center text-gray-text text-[0.8rem] border-b border-gray-dark">
                {machine.brand} Image
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 min-h-[32px]">
                  {logoPath ? (
                    <div className="flex items-center">
                      <Image
                        src={logoPath}
                        alt={machine.brand}
                        width={100}
                        height={40}
                        className="brightness-0 invert object-contain max-w-[100px] max-h-[28px] w-auto"
                      />
                    </div>
                  ) : (
                    <span className="text-[0.85rem] font-bold text-red-primary uppercase tracking-[0.05em]">
                      {machine.brand}
                    </span>
                  )}

                  {machine.status === "arrived" ? (
                    <span className="inline-block px-2.5 py-1 text-[0.65rem] font-black rounded bg-red-primary/10 text-red-primary border border-red-primary/30 self-start uppercase tracking-wider">
                      입고 완료
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-1 text-[0.65rem] font-black rounded bg-white/5 text-gray-text border border-gray-dark self-start uppercase tracking-wider">
                      {machine.date || "입고 예정"}
                    </span>
                  )}
                </div>
                <p className="text-[1.1rem] font-bold text-white leading-[1.3] mb-3">
                  {machine.name}
                </p>

                <div className="mt-auto flex flex-col gap-[6px]">
                  <span className="text-[0.8rem] text-[#666]">
                    {PARTS.find((p) => p.key === machine.part)?.label}
                  </span>
                  {machine.date && (
                    <span className="text-[0.8rem] text-gray-text">{machine.date}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
