"use client";

import { useState } from "react";
import Link from "next/link";
import MachineLineup from "./components/MachineLineup";
import BrandMarquee from "./components/BrandMarquee";
import KakaoMap from "./components/KakaoMap";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

const KAKAO_ID = "muscle2020";
const ADDRESS = "충청북도 제천시 의림대로18길 3 행운빌딩 5층";
const NAVER_MAP_URL = "https://map.naver.com/p/entry/place/13146435";
const KAKAO_MAP_URL = "https://map.kakao.com/link/search/충청북도 제천시 의림대로18길 3";

export default function Home() {
  const t = useTranslations();
  const [copiedKakao, setCopiedKakao] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyToClipboard = async (text: string, type: "kakao" | "address") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "kakao") {
        setCopiedKakao(true);
        setTimeout(() => setCopiedKakao(false), 2000);
      } else {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

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
                <button
                  onClick={() => copyToClipboard(KAKAO_ID, "kakao")}
                  className="block w-full bg-red-primary text-white px-10 py-5 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-red-hover hover:scale-105 text-center cursor-pointer"
                >
                  {copiedKakao ? t("common.copied") : t("hero.cta.inquiry")}
                </button>
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
            <div className="relative w-full h-[280px] bg-[#1a1a1a] border-b border-[#222]">
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
      <section className="py-20 px-6" id="info">
        <h2 className="text-3xl font-bold mb-12 uppercase tracking-wider text-center">
          {t("sections.location.title")}
        </h2>

        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left: Info */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <p className="text-white text-lg whitespace-pre-line font-bold mb-2">
                {t("sections.location.address")}
              </p>
              <p className="text-[#888] text-sm mb-3">{t("sections.location.addressSub")}</p>
              <button
                onClick={() => copyToClipboard(ADDRESS, "address")}
                className="inline-flex items-center gap-2 text-sm text-[#ccc] hover:text-white transition-colors cursor-pointer border border-[#444] px-3 py-1.5 hover:border-[#888]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                {copiedAddress ? t("common.copied") : t("common.copyAddress")}
              </button>
            </div>

            <p className="text-[#cc0000] font-bold text-2xl tracking-wider mb-6">
              {t("sections.location.phone")}
            </p>

            <div className="text-[#ccc] mb-8">
              <span className="block mb-1">{t("sections.location.weekday")}</span>
              <span className="block mb-2">{t("sections.location.weekend")}</span>
              <span className="text-sm text-[#888] block">{t("sections.location.note")}</span>
            </div>

            {/* KakaoTalk ID */}
            <div className="bg-[#111] border border-[#333] px-6 py-4 mb-4">
              <p className="text-sm text-[#888] mb-2">{t("common.kakaoGuide")}</p>
              <p className="text-xl font-bold text-[#FEE500] tracking-wider">{KAKAO_ID}</p>
            </div>
            <button
              onClick={() => copyToClipboard(KAKAO_ID, "kakao")}
              className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-[#000] px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#FFD700] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              {copiedKakao ? t("common.copied") : t("common.copyKakaoId")}
            </button>
          </div>

          {/* Right: Map */}
          <div className="flex-1 flex flex-col">
            <div className="border border-[#333] overflow-hidden flex-1">
              <KakaoMap />
            </div>

            {/* Map Buttons */}
            <div className="flex gap-3 mt-4">
              <Link
                href={KAKAO_MAP_URL}
                target="_blank"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FEE500] text-[#000] px-4 py-3 text-sm font-bold transition-all duration-300 hover:bg-[#FFD700]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 5.58 2 10c0 2.84 1.86 5.32 4.64 6.72-.14.52-.58 2.08-.66 2.4-.1.39.14.38.3.28.12-.08 1.94-1.32 2.72-1.86.64.1 1.32.16 2 .16 5.52 0 10-3.58 10-8S17.52 2 12 2z" />
                </svg>
                {t("common.openKakaoMap")}
              </Link>
              <Link
                href={NAVER_MAP_URL}
                target="_blank"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#03C75A] text-white px-4 py-3 text-sm font-bold transition-all duration-300 hover:bg-[#02b350]"
              >
                <span className="text-lg font-extrabold">N</span>
                {t("common.openNaverMap")}
              </Link>
            </div>
          </div>
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
