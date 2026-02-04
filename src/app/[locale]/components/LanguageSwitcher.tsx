"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="fixed top-4 right-4 z-50 md:top-8 md:right-8">
      <div className="flex gap-2 bg-[#0a0a0a] border border-[#222] rounded-full p-1">
        <button
          onClick={() => switchLocale("ko")}
          className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all ${
            locale === "ko"
              ? "bg-[#cc0000] text-white"
              : "text-[#666] hover:text-white"
          }`}
        >
          KO
        </button>
        <button
          onClick={() => switchLocale("en")}
          className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all ${
            locale === "en"
              ? "bg-[#cc0000] text-white"
              : "text-[#666] hover:text-white"
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}
