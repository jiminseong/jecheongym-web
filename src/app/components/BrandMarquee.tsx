import Image from "next/image";
import styles from "./BrandMarquee.module.css";

const BRAND_DATA = [
  { name: "HAMMER STRENGTH", logo: "/logos/hammer-strength.png" },
  { name: "PANATTA", logo: "/logos/panata.png" },
  { name: "NAUTILUS", logo: "/logos/nautilus.png" },
  { name: "ICARIAN", logo: "/logos/icarian.png" },
  { name: "BODY MASTERS", logo: "/logos/body-masters.png" },
  { name: "ATLANTIS", logo: "/logos/atlantis.png" },
  { name: "ARSENAL STRENGTH", logo: "/logos/arsenal-strength.png" },
];

export default function BrandMarquee() {
  return (
    <section className={styles.marqueeSection}>
      <div className={styles.marqueeContainer}>
        {/* We duplicate the list to create a seamless infinite scroll effect */}
        <div className={styles.marqueeTrack}>
          {BRAND_DATA.map((brand, index) => (
            <span key={`original-${index}`} className={styles.brandLogo}>
              <Image
                src={brand.logo}
                alt={brand.name}
                width={200}
                height={80}
                className={styles.brandImage}
              />
            </span>
          ))}
          {/* Duplicate set */}
          {BRAND_DATA.map((brand, index) => (
            <span key={`duplicate-${index}`} className={styles.brandLogo}>
              <Image
                src={brand.logo}
                alt={brand.name}
                width={200}
                height={80}
                className={styles.brandImage}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
