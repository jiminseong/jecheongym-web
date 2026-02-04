import Image from "next/image";

interface Machine {
  id: number;
  name: string;
  brand: string;
  part: string;
  status: "arrived" | "scheduled";
  date: string;
}

interface MachineListItemProps {
  machine: Machine;
  logoPath?: string;
  partLabel?: string;
}

export default function MachineListItem({ machine, logoPath, partLabel }: MachineListItemProps) {
  return (
    <div className="flex-[0_0_85%] scroll-snap-align-center bg-[#0c0c0c] border border-gray-dark shadow-lg overflow-hidden flex flex-col transition-all duration-200 relative hover:-translate-y-1 hover:border-[#444] md:flex-1 md:scroll-snap-align-none">
      {/* Image Placeholder */}
      <div className="w-full h-45  bg-[#1a1a1a] flex items-center justify-center text-gray-text text-[0.8rem] border-b border-gray-dark">
        {machine.brand} Image
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
              입고 완료
            </span>
          ) : (
            <span className="inline-block px-2.5 py-1 text-[0.65rem] font-black rounded bg-white/5 text-gray-text border border-gray-dark self-start uppercase tracking-wider">
              {machine.date || "입고 예정"}
            </span>
          )}
        </div>
        <p className="text-[1.1rem] font-bold text-white leading-[1.3] mb-3">{machine.name}</p>
        <div className="mt-auto flex flex-col gap-1.5">
          <span className="text-[0.8rem] text-[#666]">{partLabel}</span>
        </div>
      </div>
    </div>
  );
}
