"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import MachineListItem from "./MachineListItem";
import { useTranslations } from "next-intl";

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
  | "Arsenal Strength"
  | "Life Fitness";

const BRAND_LOGOS: Record<string, string> = {
  Panatta: "/logos/panata.png",
  Nautilus: "/logos/nautilus.png",
  Icarian: "/logos/icarian.png",
  "Body Masters": "/logos/body-masters.png",
  "Hammer Strength": "/logos/hammer-strength.png",
  Cybex: "/logos/cybex.png",
  "Arsenal Strength": "/logos/arsenal-strength.png",
  "Life Fitness": "/logos/life-fitness.png",
};

interface Machine {
  id: number;
  name: string;
  brand: MachineBrand | string;
  part: MachinePart;
  status: MachineStatus;
  date: string;
  image?: string;
}

const MACHINES: Machine[] = [
  // Panatta
  {
    id: 101,
    name: "Super High Row",
    brand: "Panatta",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/101-super-high-row.webp",
  },
  {
    id: 102,
    name: "Super Rowing Machine Circular",
    brand: "Panatta",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/102-super-rowing-circular.webp",
  },
  { id: 103, name: "Super Low Row", brand: "Panatta", part: "Back", status: "arrived", date: "" },
  { id: 104, name: "Super Rowing", brand: "Panatta", part: "Back", status: "arrived", date: "" },
  {
    id: 105,
    name: "Super Lat Machine Convert",
    brand: "Panatta",
    part: "Back",
    status: "arrived",
    date: "",
  },
  {
    id: 106,
    name: "Incline Split 45 Degree Leg Press Trainer",
    brand: "Panatta",
    part: "Legs",
    status: "arrived",
    date: "",
  },

  // Cybex
  {
    id: 107,
    name: "Smith Machine",
    brand: "Cybex",
    part: "Etc",
    status: "arrived",
    date: "",
    image: "/machines/107-smith-machine.webp",
  },
  {
    id: 108,
    name: "Squat Machine",
    brand: "Cybex",
    part: "Legs",
    status: "arrived",
    date: "",
    image: "/machines/108-squat-machine.webp",
  },
  {
    id: 109,
    name: "Hack Squat Old",
    brand: "Cybex",
    part: "Legs",
    status: "arrived",
    date: "",
    image: "/machines/109-hack-squat-old.webp",
  },
  {
    id: 110,
    name: "Leg Press Old",
    brand: "Cybex",
    part: "Legs",
    status: "arrived",
    date: "",
    image: "/machines/110-leg-press-old.webp",
  },
  {
    id: 111,
    name: "Cable Tower Old",
    brand: "Cybex",
    part: "Etc",
    status: "arrived",
    date: "",
    image: "/machines/111-cable-tower-old.webp",
  },
  {
    id: 112,
    name: "Seated Row Old",
    brand: "Cybex",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/112-seated-row-old.webp",
  },
  {
    id: 113,
    name: "Lateral Raise Old",
    brand: "Cybex",
    part: "Shoulder",
    status: "arrived",
    date: "",
    image: "/machines/113-lateral-raise-old.webp",
  },
  {
    id: 114,
    name: "Seated Leg Press",
    brand: "Cybex",
    part: "Legs",
    status: "arrived",
    date: "",
    image: "/machines/114-seated-leg-press.webp",
  },
  {
    id: 115,
    name: "Arm Curl Machine Old",
    brand: "Cybex",
    part: "Etc",
    status: "arrived",
    date: "",
    image: "/machines/115-arm-curl-old.webp",
  },
  {
    id: 116,
    name: "Shoulder Press Machine",
    brand: "Cybex",
    part: "Shoulder",
    status: "arrived",
    date: "",
    image: "/machines/116-shoulder-press.webp",
  },

  // Nautilus
  {
    id: 117,
    name: "Seated Dip",
    brand: "Nautilus",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/117-seated-dip.webp",
  },
  {
    id: 118,
    name: "Nitro Plus Lat Pulldown",
    brand: "Nautilus",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/118-nitro-plus-lat-pulldown.webp",
  },
  {
    id: 119,
    name: "Nitro Plus Incline Press",
    brand: "Nautilus",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/119-nitro-plus-incline-press.webp",
  },
  {
    id: 120,
    name: "Nitro Plus Vertical Press",
    brand: "Nautilus",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/120-nitro-plus-vertical-press.webp",
  },
  {
    id: 121,
    name: "Multi Biceps",
    brand: "Nautilus",
    part: "Etc",
    status: "arrived",
    date: "",
    image: "/machines/121-multi-biceps.webp",
  },
  {
    id: 122,
    name: "Nitro Plus Pullover",
    brand: "Nautilus",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/122-nitro-plus-pullover.webp",
  },

  // Hammer Strength
  {
    id: 123,
    name: "ISO Lateral Shoulder Press",
    brand: "Hammer Strength",
    part: "Shoulder",
    status: "arrived",
    date: "",
    image: "/machines/123-iso-lateral-shoulder-press.webp",
  },
  {
    id: 124,
    name: "Iso Lateral Bench Press",
    brand: "Hammer Strength",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/124-iso-lateral-bench-press.webp",
  },
  {
    id: 125,
    name: "Iso Lateral Decline Press",
    brand: "Hammer Strength",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/125-iso-lateral-decline-press.webp",
  },
  {
    id: 126,
    name: "Iso Lateral Incline Press",
    brand: "Hammer Strength",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/126-iso-lateral-incline-press.webp",
  },
  {
    id: 127,
    name: "Iso Incline Press",
    brand: "Hammer Strength",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/127-iso-incline-press.webp",
  },
  {
    id: 128,
    name: "Iso Low Row",
    brand: "Hammer Strength",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/128-iso-low-row.webp",
  },
  {
    id: 129,
    name: "Iso Lateral Row",
    brand: "Hammer Strength",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/129-iso-lateral-row.webp",
  },
  {
    id: 130,
    name: "Seated Biceps Curl",
    brand: "Hammer Strength",
    part: "Etc",
    status: "arrived",
    date: "",
    image: "/machines/130-seated-biceps-curl.webp",
  },
  {
    id: 131,
    name: "Seated Triceps Extension",
    brand: "Hammer Strength",
    part: "Etc",
    status: "arrived",
    date: "",
    image: "/machines/131-seated-triceps-extension.webp",
  },
  {
    id: 132,
    name: "Hip Abduction",
    brand: "Hammer Strength",
    part: "Legs",
    status: "arrived",
    date: "",
    image: "/machines/132-hip-abduction.webp",
  },
  {
    id: 133,
    name: "Leg Extension",
    brand: "Hammer Strength",
    part: "Legs",
    status: "arrived",
    date: "",
    image: "/machines/133-leg-extension.webp",
  },
  {
    id: 134,
    name: "Leg Curl",
    brand: "Hammer Strength",
    part: "Legs",
    status: "arrived",
    date: "",
    image: "/machines/134-leg-curl.webp",
  },
  {
    id: 135,
    name: "Iso Lateral Wide Pulldown",
    brand: "Hammer Strength",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/135-iso-lateral-wide-pulldown.webp",
  },
  {
    id: 136,
    name: "Iso Lateral Front Pulldown",
    brand: "Hammer Strength",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/136-iso-lateral-front-pulldown.webp",
  },
  {
    id: 137,
    name: "Iso Lateral DY Row",
    brand: "Hammer Strength",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/137-iso-lateral-dy-row.webp",
  },
  {
    id: 138,
    name: "MTS High Row",
    brand: "Hammer Strength",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/138-mts-high-row.webp",
  },
  {
    id: 139,
    name: "MTS Incline Press",
    brand: "Hammer Strength",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/139-mts-incline-press.webp",
  },
  {
    id: 140,
    name: "MTS Decline Press",
    brand: "Hammer Strength",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/140-mts-decline-press.webp",
  },
  {
    id: 141,
    name: "MTS Shoulder Press",
    brand: "Hammer Strength",
    part: "Shoulder",
    status: "arrived",
    date: "",
    image: "/machines/141-mts-shoulder-press.webp",
  },
  {
    id: 142,
    name: "Fixed Pulldown",
    brand: "Hammer Strength",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/142-fixed-pulldown.webp",
  },

  // Life Fitness
  {
    id: 143,
    name: "Seated Leg Curl",
    brand: "Life Fitness",
    part: "Legs",
    status: "arrived",
    date: "",
    image: "/machines/143-seated-leg-curl.webp",
  },

  // Arsenal Strength
  {
    id: 144,
    name: "Low Row",
    brand: "Arsenal Strength",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/144-low-row.webp",
  },

  // Icarian
  {
    id: 145,
    name: "V Squat",
    brand: "Icarian",
    part: "Legs",
    status: "arrived",
    date: "",
    image: "/machines/145-v-squat.webp",
  },
  {
    id: 146,
    name: "Lat Pulldown 304",
    brand: "Icarian",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/146-lat-pulldown-304.webp",
  },
  {
    id: 147,
    name: "Long Pull",
    brand: "Icarian",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/147-long-pull.webp",
  },
  {
    id: 148,
    name: "Pec Deck Fly",
    brand: "Icarian",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/148-pec-deck-fly.webp",
  },

  // Body Masters
  {
    id: 149,
    name: "MD504 Vertical Pec Control Rear Deltoid Machine",
    brand: "Body Masters",
    part: "Shoulder",
    status: "arrived",
    date: "",
  },
  { id: 150, name: "T-Bar Row", brand: "Body Masters", part: "Back", status: "arrived", date: "" },
  {
    id: 151,
    name: "Pull Down Machine",
    brand: "Body Masters",
    part: "Back",
    status: "arrived",
    date: "",
  },

  // Others
  {
    id: 152,
    name: "Gymleco Side Lateral Machine",
    brand: "Others",
    part: "Shoulder",
    status: "arrived",
    date: "",
    image: "/machines/152-gymleco-lateral.webp",
  },
  {
    id: 153,
    name: "Newtech Low Pulley",
    brand: "Others",
    part: "Back",
    status: "arrived",
    date: "",
    image: "/machines/153-newtech-low-pulley.webp",
  },
  {
    id: 154,
    name: "Power Rack x1",
    brand: "Others",
    part: "Etc",
    status: "arrived",
    date: "",
    image: "/machines/154-power-rack.webp",
  },
  {
    id: 155,
    name: "Bench Press Rack",
    brand: "Others",
    part: "Chest",
    status: "arrived",
    date: "",
    image: "/machines/155-bench-press-rack.webp",
  },
  {
    id: 156,
    name: "Dumbbells 2 ~ 22.8kg",
    brand: "Others",
    part: "Etc",
    status: "arrived",
    date: "",
    image: "/machines/156-dumbbells-set-1.webp",
  },
  {
    id: 157,
    name: "Dumbbells 30lb ~ 50lb",
    brand: "Others",
    part: "Etc",
    status: "arrived",
    date: "",
    image: "/machines/157-dumbbells-set-2.webp",
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
  "Life Fitness",
  "Arsenal Strength",
  "Others",
];

export default function MachineLineup() {
  const t = useTranslations();
  const [selectedBrand, setSelectedBrand] = useState<MachineBrand>("All");
  const [selectedPart, setSelectedPart] = useState<MachinePart>("All");

  const PARTS: { key: MachinePart; label: string }[] = [
    { key: "All", label: t("sections.machineLineup.parts.all") },
    { key: "Legs", label: t("sections.machineLineup.parts.legs") },
    { key: "Back", label: t("sections.machineLineup.parts.back") },
    { key: "Chest", label: t("sections.machineLineup.parts.chest") },
    { key: "Shoulder", label: t("sections.machineLineup.parts.shoulder") },
    { key: "Etc", label: t("sections.machineLineup.parts.etc") },
  ];

  const filteredMachines = useMemo(() => {
    return MACHINES.filter((machine) => {
      let brandMatch = false;
      if (selectedBrand === "All") {
        brandMatch = true;
      } else if (selectedBrand === "Others") {
        brandMatch = ![
          "Panatta",
          "Nautilus",
          "Icarian",
          "Body Masters",
          "Hammer Strength",
          "Cybex",
          "Arsenal Strength",
          "Life Fitness",
        ].includes(machine.brand as MachineBrand); // Use explicit type assertion if needed or just string check
      } else {
        brandMatch = machine.brand === selectedBrand;
      }

      const partMatch = selectedPart === "All" ? true : machine.part === selectedPart;
      return brandMatch && partMatch;
    });
  }, [selectedBrand, selectedPart]);

  return (
    <div
      className="w-full max-w-300 mx-auto mt-20 px-6 flex flex-col items-center md:px-0"
      id="machine-lineup"
    >
      <h3 className="text-2xl text-white mb-8 text-center uppercase tracking-widest md:px-6 md:mb-6">
        {t("sections.machineLineup.title")}
      </h3>

      <div className="flex flex-col gap-6 mb-12 w-full items-start md:px-6">
        {/* Brand Filter */}
        <div className="w-full">
          <span className="text-gray-text text-[0.75rem] font-bold ml-6 mb-3 uppercase tracking-widest block md:ml-0">
            {t("sections.machineLineup.filters.brand")}
          </span>
          <div className="flex flex-nowrap overflow-x-auto w-full gap-3 px-6 pt-2 pb-4 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:px-0 md:flex-wrap md:overflow-visible md:pb-0">
            {BRANDS.map((brand) => {
              const logoPath = BRAND_LOGOS[brand];
              const isSelected = selectedBrand === brand;

              return (
                <button
                  key={brand}
                  className={`h-14 px-6 flex items-center justify-center min-w-35 bg-transparent border rounded-full transition-all duration-300 whitespace-nowrap ${
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
                        className={`object-contain w-30 h-auto transition-all duration-300 ${
                          isSelected
                            ? "brightness-0 opacity-100"
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
            {t("sections.machineLineup.filters.part")}
          </span>
          <div className="flex flex-nowrap overflow-x-auto w-full gap-2 px-6 pb-2 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:px-0 md:flex-wrap md:overflow-visible">
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

      <div className="flex overflow-x-auto gap-4 w-full px-6 pb-10 scroll-snap-type-x scroll-snap-type-mandatory [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-6 md:px-0 md:pb-0 md:overflow-visible">
        {filteredMachines.map((machine) => {
          const logoPath = BRAND_LOGOS[machine.brand];
          const partLabel = PARTS.find((p) => p.key === machine.part)?.label;
          const translatedName = t(`machines.${machine.id}`);

          return (
            <MachineListItem
              key={machine.id}
              machine={{ ...machine, name: translatedName }}
              logoPath={logoPath}
              partLabel={partLabel}
            />
          );
        })}
      </div>
    </div>
  );
}
