"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface Machine {
  id: number;
  name: string;
  brand: string;
  part: string;
  status: "arrived" | "scheduled";
  date: string;
  image?: string;
}

interface MachineListItemProps {
  machine: Machine;
  logoPath?: string;
  partLabel?: string;
}

export default function MachineListItem({ machine, logoPath, partLabel }: MachineListItemProps) {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex-[0_0_85%] scroll-snap-align-center bg-[#0c0c0c] border border-gray-dark shadow-lg overflow-hidden flex flex-col transition-all duration-200 relative hover:-translate-y-1 hover:border-[#444] md:flex-1 md:scroll-snap-align-none"
    >
      {/* Image Area */}
      <div className="w-full h-[280px] md:h-[350px] bg-[#1a1a1a] flex items-center justify-center text-gray-text text-[0.8rem] border-b border-gray-dark relative overflow-hidden group">
        {machine.image ? (
          <Image
            src={machine.image}
            alt={machine.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 85vw, 33vw"
          />
        ) : (
          <span>{machine.brand} Image</span>
        )}
      </div>

      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-2 min-h-8">
          {logoPath ? (
            <div className="flex items-center">
              <Image
                src={logoPath}
                alt={machine.brand}
                width={100}
                height={40}
                className="brightness-0 invert object-contain max-w-25 max-h-7 w-auto"
              />
            </div>
          ) : (
            <span className="text-[0.85rem] font-bold text-red-primary uppercase tracking-[0.05em]">
              {machine.brand}
            </span>
          )}

          {machine.status === "arrived" ? (
            <span className="inline-block px-2.5 py-1 text-[0.65rem] font-black rounded bg-red-primary/10 text-red-primary border border-red-primary/30 self-start uppercase tracking-wider">
              {t("sections.machineLineup.status.arrived")}
            </span>
          ) : (
            <span className="inline-block px-2 py-1 text-[0.6rem] font-black rounded bg-white/5 text-gray-text border border-gray-dark self-start uppercase tracking-tight">
              {machine.date
                ? machine.date.startsWith("dates.")
                  ? `${t(machine.date)} ${t("dates.scheduled")}`
                  : `${machine.date} ${t("dates.scheduled")}`
                : t("sections.machineLineup.status.scheduled")}
            </span>
          )}
        </div>
        <p className="text-[1.1rem] font-bold text-white leading-[1.3] mb-3">{machine.name}</p>
        <div className="mt-auto flex flex-col gap-1.5">
          <span className="text-[0.8rem] text-[#666]">{partLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}
