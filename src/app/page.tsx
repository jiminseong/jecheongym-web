import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import MachineLineup from "./components/MachineLineup";
import BrandMarquee from "./components/BrandMarquee";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            SERIOUS
            <br />
            TRAINING
            <br />
            ONLY.
          </h1>
          <p className={styles.heroSubtitle}>
            제천남여헬스장은 모두를 위한 헬스장이 아닙니다.
            <br />
            오직 진지하게 훈련하는 분들만을 위한 공간입니다.
          </p>
          <div className={styles.heroActions}>
            <Link href="https://open.kakao.com" target="_blank" className={styles.ctaButton}>
              입관 문의하기
            </Link>
            <Link href="#machine-lineup" className={`${styles.ctaButton} ${styles.ctaSecondary}`}>
              기구 리스트 보기
            </Link>
            <Link href="#info" className={`${styles.ctaButton} ${styles.ctaSecondary}`}>
              위치 확인하기
            </Link>
          </div>
        </div>

        {/* New Arrival Update Card */}
        <div className={styles.newUpdateCard}>
          <div className={styles.newUpdateBadge}>NEW ARRIVAL</div>
          <div className={styles.newUpdateMedia}>
            {/* Placeholder for Video/Image */}
            <div className={styles.mediaPlay}>▶</div>
          </div>
          <div className={styles.newUpdateInfo}>
            <h3 className={styles.newUpdateTitle}>
              Arsenal Strength
              <br />
              Reloaded ISO-Row
            </h3>
            <p className={styles.newUpdateDesc}>2024.03 입고 완료. 등 하부 타겟.</p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Identity</h2>
        <p className={styles.sectionText}>
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
      <section className={`${styles.section} ${styles.rules}`}>
        <div className={styles.letterContainer}>
          <div className={styles.letterTitle}>Message from Gym</div>
          <div className={styles.letterBody}>
            <div className={styles.letterSection}>
              본 센타는 <span className={styles.highlight}>웨이트트레이닝 전문점</span> 입니다.
            </div>

            <div className={styles.letterSection}>
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

            <div className={styles.importantBox}>
              <span className={styles.importantTitle}>!필수사항!</span>
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

            <div className={styles.letterSection}>
              다수가 이용하는 공간입니다.
              <br />
              본인만을 위한 행동은 타인을 불쾌하게 합니다
            </div>

            <div className={styles.letterSection}>
              최고의강사진, 관장이력 이런게 본인운동 대신해 주지 않습니다~
              <br />
              본 센타는 자율운동을 하는 곳 입니다. 피티강요는(눈치) 일절 하지않는,
              <br />
              웨이트 전문점입니다.
            </div>

            <div className={styles.closing}>오늘도 득근 하십시요~^^</div>
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
      <section className={styles.section} id="info">
        <h2 className={styles.sectionTitle}>LOCATION & INFO</h2>
        <div className={styles.sectionText} style={{ marginBottom: "40px" }}>
          <p style={{ marginBottom: "24px" }}>
            <strong style={{ color: "var(--color-white)" }}>
              충청북도 제천시 의림대로18길 3 행운빌딩 5층
            </strong>
            <br />
            (충북 제천시 중앙로2가 79-26)
          </p>

          <p
            style={{
              marginBottom: "24px",
              color: "var(--color-red)",
              fontWeight: "700",
              fontSize: "1.25rem",
              letterSpacing: "0.05em",
            }}
          >
            0507-1405-1134
          </p>

          <p>
            <span style={{ display: "block", marginBottom: "4px" }}>평일 09:00 - 23:00</span>
            <span style={{ display: "block", marginBottom: "8px" }}>주말 10:00 - 18:00</span>
            <span style={{ fontSize: "0.9rem", color: "var(--color-gray)", display: "block" }}>
              * 연중무휴 (마감 1시간 30분 전 입장 마감)
            </span>
          </p>
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="https://open.kakao.com" target="_blank" className={styles.ctaButton}>
            KakaoTalk 문의
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerInfo}>
          &copy; {new Date().getFullYear()} 제천남여헬스장. All rights reserved.
          <br />
          Created by{" "}
          <Link href="https://mildolab.com" target="_blank" style={{ textDecoration: "underline" }}>
            Mildo
          </Link>
        </p>
      </footer>
    </main>
  );
}
