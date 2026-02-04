"use client";

import Link from "next/link";
import MachineLineup from "./components/MachineLineup";
import BrandMarquee from "./components/BrandMarquee";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Home() {
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
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
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
            <div className="relative w-full h-[280px] bg-[#1a1a1a] flex items-center justify-center border-b border-[#222]">
              <div className="w-16 h-16 rounded-full bg-[rgba(204,0,0,0.2)] border-2 border-[#cc0000] flex items-center justify-center text-[#cc0000] text-2xl cursor-pointer transition-all duration-300 hover:bg-[rgba(204,0,0,0.4)] hover:scale-110">
                ▶
              </div>
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

      {/* Philosophy Section */}
      <section className="py-20 px-6 text-center max-w-225 mx-auto">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">
          {t("sections.identity.title")}
        </h2>
        <p className="text-lg text-[#ccc] leading-relaxed whitespace-pre-line">
          {t("sections.identity.line1")}
          <br />
          {t("sections.identity.line2")}
          <br />
          <br />
          {t("sections.identity.line3")}
          <br />
          {t("sections.identity.line4")}
        </p>
      </section>

      {/* Rules Section (Letter Style) */}
      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto bg-[#0a0a0a] border border-[#222] p-8 md:p-12">
          <div className="text-center text-xl font-bold mb-8 uppercase tracking-wider text-[#cc0000]">
            {t("sections.rules.title")}
          </div>
          <div className="space-y-6 text-[#ccc] leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: t.raw("sections.rules.intro") }} />

            <div>
              {t("sections.rules.cardio.title")}
              <br />
              {t("sections.rules.cardio.line1")}
              <br />
              <br />
              {t("sections.rules.cardio.line2")}
              <br />
              {t("sections.rules.cardio.line3")}
              <br />
              {t("sections.rules.cardio.line4")}
            </div>

            <div className="bg-[rgba(204,0,0,0.1)] border-l-4 border-[#cc0000] p-6 my-6">
              <span className="block text-[#cc0000] font-bold mb-3 text-lg">
                {t("sections.rules.mandatory.title")}
              </span>
              {t("sections.rules.mandatory.rule1")}
              <br />
              {t("sections.rules.mandatory.rule2")}
              <br />
              <br />
              {t("sections.rules.mandatory.rule3")}
              <br />
              <br />
              {t("sections.rules.mandatory.rule4")}
              <br />
              {t("sections.rules.mandatory.rule5")}
            </div>

            <div>
              {t("sections.rules.etiquette1")}
              <br />
              {t("sections.rules.etiquette2")}
            </div>

            <div>
              {t("sections.rules.training1")}
              <br />
              {t("sections.rules.training2")}
              <br />
              {t("sections.rules.training3")}
            </div>

            <div className="text-center text-white font-bold text-lg mt-8">
              {t("sections.rules.closing")}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee Section */}
      <BrandMarquee />

      {/* Machine Updates List Component */}
      <div id="machine-lineup">
        <MachineLineup />
      </div>

      {/* Location & Info Section */}
      <section className="py-20 px-6 text-center" id="info">
        <h2 className="text-3xl font-bold mb-12 uppercase tracking-wider">
          {t("sections.location.title")}
        </h2>
        <div className="max-w-[600px] mx-auto mb-10">
          <p className="mb-6">
            <strong className="text-white text-lg whitespace-pre-line">
              {t("sections.location.address")}
            </strong>
            <br />
            {t("sections.location.addressSub")}
          </p>

          <p className="text-[#cc0000] font-bold text-2xl tracking-wider mb-6">
            {t("sections.location.phone")}
          </p>

          <p className="text-[#ccc]">
            <span className="block mb-1">{t("sections.location.weekday")}</span>
            <span className="block mb-2">{t("sections.location.weekend")}</span>
            <span className="text-sm text-[#888] block">{t("sections.location.note")}</span>
          </p>
        </div>

        <div className="flex gap-5 flex-wrap justify-center">
          <Link
            href="https://open.kakao.com"
            target="_blank"
            className="inline-block bg-[#cc0000] text-white px-8 py-4 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#ff3333] hover:scale-105"
          >
            {t("sections.location.cta")}
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 text-center border-t border-[#222]">
        <p className="text-sm text-[#666]">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
          <br />
          {t("footer.createdBy")}{" "}
          <Link href="https://mildolab.com" target="_blank" className="underline hover:text-white">
            Mildo
          </Link>
        </p>
      </footer>
    </main>
  );
}
