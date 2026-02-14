"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <div className="max-w-300 w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left max-w-125 md:max-w-none">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[5rem] md:text-[6.5rem] font-black leading-[0.9] mb-8 tracking-tighter"
          >
            SERIOUS
            <br />
            TRAINING
            <br />
            ONLY.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-lg text-[#ccc] mb-10 leading-relaxed max-w-150 mx-auto md:mx-0 whitespace-pre-line"
          >
            {t("hero.subtitle")}
            <br />
            {t("hero.subtitle2")}
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex md:flex-row flex-col gap-4 justify-center md:justify-start w-full md:max-w-[800px]"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <Link
                href="https://open.kakao.com"
                target="_blank"
                className="block bg-red-primary text-white px-10 py-5 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-red-hover hover:scale-105 text-center"
              >
                {t("hero.cta.inquiry")}
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <Link
                href="#machine-lineup"
                className="block bg-transparent border border-white text-white px-10 py-5 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black text-center"
              >
                {t("hero.cta.machineList")}
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <Link
                href="#info"
                className="block bg-transparent border border-white text-white px-10 py-5 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black text-center"
              >
                {t("hero.cta.location")}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* New Arrival Update Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex-1 max-w-[500px] w-full bg-[#0a0a0a] border border-[#222] overflow-hidden transition-all duration-300 hover:border-[#cc0000] hover:scale-105"
        >
          <div className="bg-[#cc0000] text-white text-xs font-bold px-4 py-2 uppercase tracking-wider">
            {t("hero.newArrival.badge")}
          </div>
          <div className="relative w-full bg-[#1a1a1a] border-b border-[#222] aspect-video">
            <Image
              src="/machines/122-nitro-plus-pullover.webp"
              alt={t("hero.newArrival.title")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 leading-tight">
              {t("hero.newArrival.title")}
              <br />
              {t("hero.newArrival.subtitle")}
            </h3>
            <p className="text-[#888] text-sm">{t("hero.newArrival.description")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
