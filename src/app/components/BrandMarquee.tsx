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
    <section className="w-full py-[60px] bg-black border-t border-b border-gray-dark overflow-hidden flex flex-col justify-center relative">
      {/* Gradient fades */}
      <div className="absolute top-0 bottom-0 left-0 w-[100px] z-[2] pointer-events-none bg-gradient-to-r from-black to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-[100px] z-[2] pointer-events-none bg-gradient-to-l from-black to-transparent" />

      <div className="flex w-full overflow-hidden relative">
        <div className="flex items-center gap-[120px] animate-scroll whitespace-nowrap pl-[120px] shadow-2xl will-change-transform md:gap-[80px] md:pl-[80px]">
          {BRAND_DATA.map((brand, index) => (
            <span key={`original-${index}`} className="flex items-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={280}
                height={100}
                className="w-[260px] h-auto object-contain brightness-0 invert-[0.3] transition-all duration-500 opacity-70 hover:brightness-0 hover:invert hover:opacity-100 hover:scale-110 md:w-[200px]"
              />
            </span>
          ))}
          {/* Duplicate set */}
          {BRAND_DATA.map((brand, index) => (
            <span key={`duplicate-${index}`} className="flex items-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={280}
                height={100}
                className="w-[260px] h-auto object-contain brightness-0 invert-[0.3] transition-all duration-500 opacity-70 hover:brightness-0 hover:invert hover:opacity-100 hover:scale-110 md:w-[200px]"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
