import Link from "next/link";
import MachineLineup from "./components/MachineLineup";
import BrandMarquee from "./components/BrandMarquee";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
        <div className="max-w-300 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left max-w-125 md:max-w-none">
            <h1 className="text-[5rem] md:text-[6.5rem] font-black leading-[0.9] mb-8 tracking-tighter">
              SERIOUS
              <br />
              TRAINING
              <br />
              ONLY.
            </h1>
            <p className="text-xl md:text-lg text-[#ccc] mb-10 leading-relaxed max-w-150 mx-auto md:mx-0">
              제천남여헬스장은 모두를 위한 헬스장이 아닙니다.
              <br />
              오직 진지하게 훈련하는 분들만을 위한 공간입니다.
            </p>
            <div className="flex md:flex-row flex-col gap-4 justify-center md:justify-start w-full md:max-w-[800px]">
              <Link
                href="https://open.kakao.com"
                target="_blank"
                className="block bg-red-primary text-white px-10 py-5 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-red-hover hover:scale-105 text-center"
              >
                입관 문의하기
              </Link>
              <Link
                href="#machine-lineup"
                className="block bg-transparent border border-white text-white px-10 py-5 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black text-center"
              >
                기구 리스트 보기
              </Link>
              <Link
                href="#info"
                className="block bg-transparent border border-white text-white px-10 py-5 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black text-center"
              >
                위치 확인하기
              </Link>
            </div>
          </div>

          {/* New Arrival Update Card */}
          <div className="flex-1 max-w-[500px] w-full bg-[#0a0a0a] border border-[#222] overflow-hidden transition-all duration-300 hover:border-[#cc0000] hover:scale-105">
            <div className="bg-[#cc0000] text-white text-xs font-bold px-4 py-2 uppercase tracking-wider">
              NEW ARRIVAL
            </div>
            <div className="relative w-full h-[280px] bg-[#1a1a1a] flex items-center justify-center border-b border-[#222]">
              <div className="w-16 h-16 rounded-full bg-[rgba(204,0,0,0.2)] border-2 border-[#cc0000] flex items-center justify-center text-[#cc0000] text-2xl cursor-pointer transition-all duration-300 hover:bg-[rgba(204,0,0,0.4)] hover:scale-110">
                ▶
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 leading-tight">
                Arsenal Strength
                <br />
                Reloaded ISO-Row
              </h3>
              <p className="text-[#888] text-sm">2024.03 입고 완료. 등 하부 타겟.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6 text-center max-w-225 mx-auto">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">Identity</h2>
        <p className="text-lg text-[#ccc] leading-relaxed">
          우리는 화려한 인테리어나 편안한 휴게 공간을 제공하지 않습니다.
          <br />
          오로지 최고의 훈련 환경을 만드는데 집중했습니다.
          <br />
          <br />
          타협하지 않는 무거운 분위기 속에서
          <br />
          당신의 한계를 시험해 보십시오.
        </p>
      </section>

      {/* Rules Section (Letter Style) */}
      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto bg-[#0a0a0a] border border-[#222] p-8 md:p-12">
          <div className="text-center text-xl font-bold mb-8 uppercase tracking-wider text-[#cc0000]">
            Message from Gym
          </div>
          <div className="space-y-6 text-[#ccc] leading-relaxed">
            <div>
              본 센타는 <span className="text-white font-bold">웨이트트레이닝 전문점</span> 입니다.
            </div>

            <div>
              유산소기구 없습니다,
              <br />
              뜀박질(유산소) 목적이신 분들은 (신백동 위너스휘트니스)제천에서 유산소기구,환기시설이
              제일 잘 되어 있어 ,쾌적하게 이용 하실 수 있습니다.
              <br />
              <br />
              그외 분들은,, 야외에서 양껏 즐겨주십시요~
              <br />
              웨이트로 진심 털어 버리면 유산소 할 시간조차 없습니다.
              <br />
              기어나갈 각오로 운동하세요.. 입으로 운동X
            </div>

            <div className="bg-[rgba(204,0,0,0.1)] border-l-4 border-[#cc0000] p-6 my-6">
              <span className="block text-[#cc0000] font-bold mb-3 text-lg">!필수사항!</span>
              외부신발 입장금지.적발시 강퇴~!! CCTV촬영중
              <br />
              (차에서 갈아신었다는둥,밑에서 갈아신었다는둥 이런말씀 하지마세요. 티 많이
              납니다)안가져오시면 빌려드립니다.
              <br />
              <br />
              본인이 사용한 원판정리 안될시 이유불문 강퇴!!
              <br />
              <br />
              bcaa,보충제,캔음료,커피등등 티테이블에서만 섭취~!!
              <br />
              매너 부탁드립니다..제발..~~
            </div>

            <div>
              다수가 이용하는 공간입니다.
              <br />
              본인만을 위한 행동은 타인을 불쾌하게 합니다
            </div>

            <div>
              최고의강사진, 관장이력 이런게 본인운동 대신해 주지 않습니다~
              <br />
              본 센타는 자율운동을 하는 곳 입니다. 피티강요는(눈치) 일절 하지않는,
              <br />
              웨이트 전문점입니다.
            </div>

            <div className="text-center text-white font-bold text-lg mt-8">
              오늘도 득근 하십시요~^^
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
        <h2 className="text-3xl font-bold mb-12 uppercase tracking-wider">LOCATION & INFO</h2>
        <div className="max-w-[600px] mx-auto mb-10">
          <p className="mb-6">
            <strong className="text-white text-lg">
              충청북도 제천시 의림대로18길 3 행운빌딩 5층
            </strong>
            <br />
            (충북 제천시 중앙로2가 79-26)
          </p>

          <p className="text-[#cc0000] font-bold text-2xl tracking-wider mb-6">0507-1405-1134</p>

          <p className="text-[#ccc]">
            <span className="block mb-1">평일 09:00 - 23:00</span>
            <span className="block mb-2">주말 10:00 - 18:00</span>
            <span className="text-sm text-[#888] block">
              * 연중무휴 (마감 1시간 30분 전 입장 마감)
            </span>
          </p>
        </div>

        <div className="flex gap-5 flex-wrap justify-center">
          <Link
            href="https://open.kakao.com"
            target="_blank"
            className="inline-block bg-[#cc0000] text-white px-8 py-4 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#ff3333] hover:scale-105"
          >
            KakaoTalk 문의
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 text-center border-t border-[#222]">
        <p className="text-sm text-[#666]">
          &copy; {new Date().getFullYear()} 제천남여헬스장. All rights reserved.
          <br />
          Created by{" "}
          <Link href="https://mildolab.com" target="_blank" className="underline hover:text-white">
            Mildo
          </Link>
        </p>
      </footer>
    </main>
  );
}
