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
    <section className="w-full py-6 md:py-10 bg-black border-t border-b border-gray-dark overflow-hidden flex flex-col justify-center relative">
      {/* Gradient fades */}
      <div className="absolute top-0 bottom-0 left-0 w-[100px] z-[2] pointer-events-none bg-gradient-to-r from-black to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-[100px] z-[2] pointer-events-none bg-gradient-to-l from-black to-transparent" />

      <div className="group flex w-full overflow-hidden relative">
        <div className="flex items-center gap-[60px] animate-scroll whitespace-nowrap pl-[60px] will-change-transform md:gap-[100px] md:pl-[100px] group-hover:[animation-play-state:paused]">
          {BRAND_DATA.map((brand, index) => (
            <span key={`original-${index}`} className="flex items-center shrink-0">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={240}
                height={90}
                className="w-auto h-[50px] max-w-[120px] object-contain brightness-0 invert-[0.3] opacity-70 transition-all duration-500 hover:brightness-0 hover:invert hover:opacity-100 hover:scale-110 md:h-[70px] md:max-w-[200px]"
              />
            </span>
          ))}
          {/* Duplicate set for seamless loop */}
          {BRAND_DATA.map((brand, index) => (
            <span key={`duplicate-${index}`} className="flex items-center shrink-0">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={240}
                height={90}
                className="w-auto h-[50px] max-w-[120px] object-contain brightness-0 invert-[0.3] opacity-70 transition-all duration-500 hover:brightness-0 hover:invert hover:opacity-100 hover:scale-110 md:h-[70px] md:max-w-[200px]"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
