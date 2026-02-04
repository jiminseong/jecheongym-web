import Image from "next/image";

const BRAND_DATA = [
  { name: "HAMMER STRENGTH", logo: "/logos/hammer-strength.png" },
  { name: "PANATTA", logo: "/logos/panata.png" },
  { name: "NAUTILUS", logo: "/logos/nautilus.png" },
  { name: "ICARIAN", logo: "/logos/icarian.png" },
  { name: "BODY MASTERS", logo: "/logos/body-masters.png" },
  { name: "CYBEX", logo: "/logos/cybex.png" },
  { name: "PRECOR", logo: "/logos/precor.png" },
  { name: "ATLANTIS", logo: "/logos/atlantis.png" },
  { name: "ARSENAL STRENGTH", logo: "/logos/arsenal-strength.png" },
];

export default function BrandMarquee() {
  return (
    <section className="w-full py-[60px] bg-black border-t border-b border-[#1a1a1a] overflow-hidden flex flex-col justify-center relative">
      {/* Gradient fades */}
      <div className="absolute top-0 bottom-0 left-0 w-[100px] z-[2] pointer-events-none bg-gradient-to-r from-black to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-[100px] z-[2] pointer-events-none bg-gradient-to-l from-black to-transparent" />

      <div className="flex w-full overflow-hidden relative">
        <div className="flex items-center gap-[80px] animate-scroll whitespace-nowrap pl-[80px] will-change-transform md:gap-[40px] md:pl-[40px]">
          {BRAND_DATA.map((brand, index) => (
            <span key={`original-${index}`} className="flex items-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={200}
                height={80}
                className="w-[200px] h-auto object-contain brightness-0 invert-[0.3] transition-all duration-300 opacity-80 hover:brightness-0 hover:invert hover:opacity-100 hover:scale-110 group-hover:opacity-40"
              />
            </span>
          ))}
          {/* Duplicate set */}
          {BRAND_DATA.map((brand, index) => (
            <span key={`duplicate-${index}`} className="flex items-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={200}
                height={80}
                className="w-[200px] h-auto object-contain brightness-0 invert-[0.3] transition-all duration-300 opacity-80 hover:brightness-0 hover:invert hover:opacity-100 hover:scale-110 group-hover:opacity-40"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
