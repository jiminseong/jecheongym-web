"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import styles from "./MachineLineup.module.css";

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
  | "Arsenal Strength";

const BRAND_LOGOS: Record<string, string> = {
  Panatta: "/logos/panata.png",
  Nautilus: "/logos/nautilus.png",
  Icarian: "/logos/icarian.png",
  "Body Masters": "/logos/body-masters.png",
  "Hammer Strength": "/logos/hammer-strength.png",
  Cybex: "/logos/cybex.png",
  Atlantis: "/logos/atlantis.png",
  "Arsenal Strength": "/logos/arsenal-strength.png",
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
];

const BRANDS: MachineBrand[] = [
  "All",
  "Panatta",
  "Nautilus",
  "Icarian",
  "Body Masters",
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
                "Atlantis",
                "Arsenal Strength",
              ].includes(machine.brand)
            : machine.brand === selectedBrand;
      const partMatch = selectedPart === "All" ? true : machine.part === selectedPart;
      return brandMatch && partMatch;
    });
  }, [selectedBrand, selectedPart]);

  return (
    <div className={styles.section} id="machine-lineup">
      <h3 className={styles.title}>Machine Lineup Updates</h3>

      <div className={styles.filterContainer}>
        {/* Brand Filter */}
        <div className={`${styles.filterGroup} ${styles.brandFilterGroup}`}>
          <span className={styles.filterLabel}>BRAND</span>
          <div className={styles.brandButtons}>
            {BRANDS.map((brand) => {
              const logoPath = BRAND_LOGOS[brand];
              const isSelected = selectedBrand === brand;

              return (
                <button
                  key={brand}
                  className={`${styles.filterBtn} ${styles.brandBtn} ${isSelected ? styles.active : ""}`}
                  onClick={() => setSelectedBrand(brand)}
                  title={brand}
                >
                  {logoPath ? (
                    <div className={styles.brandLogoWrapper}>
                      <Image
                        src={logoPath}
                        alt={brand}
                        width={120}
                        height={40}
                        className={styles.brandFilterImg}
                      />
                    </div>
                  ) : (
                    <span className={styles.brandText}>{brand}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Part Filter */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>PART</span>
          {PARTS.map((part) => (
            <button
              key={part.key}
              className={`${styles.filterBtn} ${selectedPart === part.key ? styles.active : ""}`}
              onClick={() => setSelectedPart(part.key)}
            >
              {part.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredMachines.map((machine) => {
          const logoPath = BRAND_LOGOS[machine.brand];

          return (
            <div key={machine.id} className={styles.card}>
              {/* Image Placeholder */}
              <div className={styles.imagePlaceholder}>{machine.brand} Image</div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  {logoPath ? (
                    <div className={styles.cardBrandLogo}>
                      <Image
                        src={logoPath}
                        alt={machine.brand}
                        width={100}
                        height={40}
                        className={styles.brandLogoImg}
                      />
                    </div>
                  ) : (
                    <span className={styles.brand}>{machine.brand}</span>
                  )}

                  {machine.status === "arrived" ? (
                    <span className={`${styles.badge} ${styles.badgeArrived}`}>입고 완료</span>
                  ) : (
                    <span className={`${styles.badge} ${styles.badgeScheduled}`}>입고 예정</span>
                  )}
                </div>
                <p className={styles.name}>{machine.name}</p>

                <div className={styles.meta}>
                  <span className={styles.part}>
                    {PARTS.find((p) => p.key === machine.part)?.label}
                  </span>
                  {machine.date && <span className={styles.date}>{machine.date}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
