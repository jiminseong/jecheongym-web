# ASSETS & SOURCES POLICY

## 1. ASSET POLICY (기구 이미지 사용 정책)

### 1) 허용 소스 (Allowed Sources) - **Strictly Enforced**
*   **제조사(브랜드) 공식 홈페이지**의 제품 페이지 이미지
*   **제조사 공식 PDF 카탈로그/브로셔**에 포함된 제품 이미지
*   **제조사가 배포한 Media/Press/Downloads** 자산

> **목적**: “헬스장 보유 기구 소개/시설 안내” 용도에 한해 사용합니다.
> **금지**: 판매/구매 유도(가격/장바구니/구매 링크 등) 목적의 사용은 금지합니다.

### 2) 금지 소스 (Disallowed Sources)
*   타 헬스장/유통사/커뮤니티/블로그/쇼핑몰/중고장터 이미지 (출처 불명 포함)
*   워터마크가 포함된 이미지
*   자동 크롤링으로 대량 수집한 이미지

### 3) 표기 및 운영 원칙 (Attribution & Takedown)
*   기구 카드에 **Brand Name + Model Name**을 기본 노출합니다.
*   (선택) 이미지 하단 또는 상세 페이지에 `Image courtesy of {Brand}` 표기를 사용할 수 있습니다.
*   **권리자 요청(삭제/교체 요청)**이 접수될 경우 해당 이미지는 즉시 비노출 처리하고, 공식 대체 이미지로 교체합니다.

### 4) 저장 규칙 (Storage & Naming)
*   **경로**: `/public/machines/`
*   **파일명**: `{id}-{slug}.webp` (예: `123-iso-lateral-shoulder-press.webp`)

---

## 2. MACHINE ASSETS LOG (기구 자산 기록)

**기록 필수 항목**: `ID`, `Brand`, `Model`, `Source URL`, `Acquired At`

### Panatta
| ID | Brand | Model | File Name | Source URL | Acquired At | Status |
|---|---|---|---|---|---|---|
| 101 | Panatta | Super High Row | `101-super-high-row.webp` | https://www.panattasport.com/wp-content/uploads/2023/03/1fw003-2-jpg-webp.webp | 2026-02-14 | ✅ Collected |
| 102 | Panatta | Super Rowing Machine Circular | `102-super-rowing-circular.webp` | https://www.panattasport.com/wp-content/uploads/2022/08/pic_1FW204_01-jpg.webp | 2026-02-14 | ✅ Collected |
| 103 | Panatta | Super Low Row | `103-super-low-row.webp` | | | ❌ Required |
| 104 | Panatta | Super Rowing | `104-super-rowing.webp` | | | ❌ Required |
| 105 | Panatta | Super Lat Machine Convert | `105-super-lat-convert.webp` | | | ❌ Required |
| 106 | Panatta | Incline Split 45 Degree Leg Press | `106-incline-split-leg-press.webp` | | | ❌ Required |

### Cybex
| ID | Brand | Model | File Name | Source URL | Acquired At | Status |
|---|---|---|---|---|---|---|
| 107 | Cybex | Smith Machine | `107-smith-machine.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/366-03-plate-loaded-smith-press-1-1-.png | 2026-02-14 | ✅ Collected |
| 108 | Cybex | Squat Machine | `108-squat-machine.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/268-139-plate-loaded-squat-press-1-1-.png | 2026-02-14 | ✅ Collected |
| 109 | Cybex | Hack Squat Old | `109-hack-squat-old.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/259-082-plate-loaded-hack-squat-1-1-.png | 2026-02-14 | ✅ Collected |
| 110 | Cybex | Leg Press Old | `110-leg-press-old.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/266-129-plate-loaded-leg-press-1-1-.png | 2026-02-14 | ✅ Collected |
| 111 | Cybex | Cable Tower Old | `111-cable-tower-old.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/256-166-cybex-bravo-advanced-1-1-.png | 2026-02-14 | ✅ Collected |
| 112 | Cybex | Seated Row Old | `112-seated-row-old.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/337-552-ci-rw-cybex-ion-seated-row.png | 2026-02-14 | ✅ Collected |
| 113 | Cybex | Lateral Raise Old | `113-lateral-raise-old.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/397-369-prestige-strength-vrs-lateral-raise-1-.png | 2026-02-14 | ✅ Collected |
| 114 | Cybex | Seated Leg Press | `114-seated-leg-press.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/356-628-eagle-nx-leg-press-1.png | 2026-02-14 | ✅ Collected |
| 115 | Cybex | Arm Curl Machine Old | `115-arm-curl-old.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/397-834-eagle-nx-arm-curl-1-1-.png | 2026-02-14 | ✅ Collected |
| 116 | Cybex | Shoulder Press Machine | `116-shoulder-press.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/306-295-ci-sp-cybex-ion-shoulder-press.png | 2026-02-14 | ✅ Collected |

### Nautilus
| ID | Brand | Model | File Name | Source URL | Acquired At | Status |
|---|---|---|---|---|---|---|
| 117 | Nautilus | Seated Dip | `117-seated-dip.webp` | http://shop.corehandf.com/cdn/shop/files/Nautilus-Impact-TricepDip-9NA-S5303-6-Product-Image-Web-e1655747063746.png?v=1731874951 | 2026-02-14 | ✅ Collected |
| 118 | Nautilus | Nitro Plus Lat Pulldown | `118-nitro-plus-lat-pulldown.webp` | http://shop.corehandf.com/cdn/shop/files/Nautilus-Impact-Lat-Pull-Down-9NA-S3305-1-Product-Image-Web-e1655748827297.png?v=1731874893 | 2026-02-14 | ✅ Collected |
| 119 | Nautilus | Nitro Plus Incline Press | `119-nitro-plus-incline-press.webp` | http://shop.corehandf.com/cdn/shop/files/Nautilus-Impact-Incline-Press-9NA-S2301-1-Product-Image-Web-e1655747666242.png?v=1731874868 | 2026-02-14 | ✅ Collected |
| 120 | Nautilus | Nitro Plus Vertical Press | `120-nitro-plus-vertical-press.webp` | http://shop.corehandf.com/cdn/shop/files/Instinct_DualMultiPress_-60AR.png?v=1761681731 | 2026-02-14 | ✅ Collected |
| 121 | Nautilus | Multi Biceps | `121-multi-biceps.webp` | http://shop.corehandf.com/cdn/shop/files/Instinct_Dual_Biceps_Curl_Triceps_Extension_-60AR.png?v=1761683280 | 2026-02-14 | ✅ Collected |
| 122 | Nautilus | Nitro Plus Pullover | `122-nitro-plus-pullover.webp` | http://shop.corehandf.com/cdn/shop/files/Nautilus-Inspiration-Pull-Over-IPPO3-60-Black-33-Product-Image-Web-e1654551993619.png?v=1731875572 | 2026-02-14 | ✅ Collected |

### Hammer Strength
| ID | Brand | Model | File Name | Source URL | Acquired At | Status |
|---|---|---|---|---|---|---|
| 123 | Hammer Strength | ISO Lateral Shoulder Press | `123-iso-lateral-shoulder-press.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Iso-Lateral%20Shoulder%20Press/Strength-PlateLoaded-IsoLateralShoulderPress-Render-2.png?ext=.png | 2026-02-14 | ✅ Collected |
| 124 | Hammer Strength | Iso Lateral Bench Press | `124-iso-lateral-bench-press.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Bench%20Press/Strength-PlateLoaded-IsoLateral-BenchPress-9.png?ext=.png | 2026-02-14 | ✅ Collected |
| 125 | Hammer Strength | Iso Lateral Decline Press | `125-iso-lateral-decline-press.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Decline%20Chest%20Press/Strength-PlateLoaded-DeclineChestPress-1.png?ext=.png | 2026-02-14 | ✅ Collected |
| 126 | Hammer Strength | Iso Lateral Incline Press | `126-iso-lateral-incline-press.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Iso%20Lateral%20Incline%20Press/Strength-PlateLoaded-IsoLateralInclinePress-8.png?ext=.png | 2026-02-14 | ✅ Collected |
| 127 | Hammer Strength | Iso Incline Press | `127-iso-incline-press.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Super%20Incline%20Press/Strength-PlateLoaded-SuperInclinePress-Thumbnail-1.png?ext=.png | 2026-02-14 | ✅ Collected |
| 128 | Hammer Strength | Iso Low Row | `128-iso-low-row.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Iso-Lateral%20Low%20Row/Strength-PlateLoaded-IsoLateralLowRow-8.png?ext=.png | 2026-02-14 | ✅ Collected |
| 129 | Hammer Strength | Iso Lateral Row | `129-iso-lateral-row.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Iso-Lateral%20Row/Strength-PlateLoaded-IsoLateral-Row-Thumbnail-1.png?ext=.png | 2026-02-14 | ✅ Collected |
| 130 | Hammer Strength | Seated Biceps Curl | `130-seated-biceps-curl.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Seated%20Biceps/Strength-PlateLoaded-SeatedBiceps-Thumbnail-1.png?ext=.png | 2026-02-14 | ✅ Collected |
| 131 | Hammer Strength | Seated Triceps Extension | `131-seated-triceps-extension.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/357-078-hammer-strength-mts-iso-lateral-triceps-extension-image.png | 2026-02-14 | ✅ Collected |
| 132 | Hammer Strength | Hip Abduction | `132-hip-abduction.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/29-76-hammer-strength-select-hip-abduction-image-new.jpg | 2026-02-14 | ✅ Collected |
| 133 | Hammer Strength | Leg Extension | `133-leg-extension.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/27-028-hammer-strength-select-leg-extension-image-new.jpg | 2026-02-14 | ✅ Collected |
| 134 | Hammer Strength | Leg Curl | `134-leg-curl.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/28-585-hammer-strength-select-leg-curl-image-new.jpg | 2026-02-14 | ✅ Collected |
| 135 | Hammer Strength | Iso Lateral Wide Pulldown | `135-iso-lateral-wide-pulldown.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Iso-Lateral%20Wide%20Pulldown/Strength-PlateLoaded-IsoLateralWidePulldown-Render-2.png?ext=.png | 2026-02-14 | ✅ Collected |
| 136 | Hammer Strength | Iso Lateral Front Pulldown | `136-iso-lateral-front-pulldown.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/Font%20Lat%20Pulldown/Strength-PlateLoaded-IsoLateral-FrontLatPulldown-7.png?ext=.png | 2026-02-14 | ✅ Collected |
| 137 | Hammer Strength | Iso Lateral DY Row | `137-iso-lateral-dy-row.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/DY%20Row/Strength-PlateLoaded-IsoLateral-DYRow-Thumbnail-1.png?ext=.png | 2026-02-14 | ✅ Collected |
| 138 | Hammer Strength | MTS High Row | `138-mts-high-row.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/28-98-mts-iso-lateral-high-row-image.jpg | 2026-02-14 | ✅ Collected |
| 139 | Hammer Strength | MTS Incline Press | `139-mts-incline-press.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/32-568-mts-iso-lateral-incline-press-image.jpg | 2026-02-14 | ✅ Collected |
| 140 | Hammer Strength | MTS Decline Press | `140-mts-decline-press.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/33-61-mts-iso-lateral-decline-press-image.jpg | 2026-02-14 | ✅ Collected |
| 141 | Hammer Strength | MTS Shoulder Press | `141-mts-shoulder-press.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/281-249-mts-shldrpress-01cpr-1000x1000.png | 2026-02-14 | ✅ Collected |
| 142 | Hammer Strength | Fixed Pulldown | `142-fixed-pulldown.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/28-055-hammer-strength-select-fixed-pulldown-image-new.jpg | 2026-02-14 | ✅ Collected |

### Life Fitness
| ID | Brand | Model | File Name | Source URL | Acquired At | Status |
|---|---|---|---|---|---|---|
| 143 | Life Fitness | Seated Leg Curl | `143-seated-leg-curl.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/449-992-hs-plate-loaded-seated-leg-curl-l.png | 2026-02-14 | ✅ Collected |

### Arsenal Strength
| ID | Brand | Model | File Name | Source URL | Acquired At | Status |
|---|---|---|---|---|---|---|
| 144 | Arsenal Strength | Low Row | `144-low-row.webp` | https://resources.myarsenalstrength.com/hubfs/My_Arsenal_Strength_2022/Product%20Gallery%20Images/9020_WG_BG_1.jpg | 2026-02-14 | ✅ Collected |

### Icarian
| ID | Brand | Model | File Name | Source URL | Acquired At | Status |
|---|---|---|---|---|---|---|
| 145 | Icarian | V Squat | `145-v-squat.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/Equipment/Strength/Plate-Loaded/V-Squat/Strength-PlateLoaded-VSquat-8.png?ext=.png | 2026-02-14 | ✅ Collected |
| 146 | Icarian | Lat Pulldown 304 | `146-lat-pulldown-304.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/349-949-eagle-nx-lat-pulldown-1-1-.png | 2026-02-14 | ✅ Collected |
| 147 | Icarian | Long Pull | `147-long-pull.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/422-138-eagle-nx-row-1-1-.png | 2026-02-14 | ✅ Collected |
| 148 | Icarian | Pec Deck Fly | `148-pec-deck-fly.webp` | https://www.lifefitness.com/Kentico13CoreBase/media/LFMedia/LifeFitnessImages/MediaSync/239-202-ci-fly-cybex-ion-pectoral-fly-rear-deltoid.png | 2026-02-14 | ✅ Collected |

### Body Masters
| ID | Brand | Model | File Name | Source URL | Acquired At | Status |
|---|---|---|---|---|---|---|
| 149 | Body Masters | Vertical Pec Control | `149-md504-vertical-pec.webp` | | | ❌ Required |
| 150 | Body Masters | T-Bar Row | `150-t-bar-row.webp` | | | ❌ Required |
| 151 | Body Masters | Pull Down Machine | `151-pull-down-machine.webp` | | | ❌ Required |

### Others
| ID | Brand | Model | File Name | Source URL | Acquired At | Status |
|---|---|---|---|---|---|---|
| 152 | Gymleco | Side Lateral Machine | `152-gymleco-lateral.webp` | http://gymleco.com/cdn/shop/files/334StandingSideLateral.png?crop=center&height=1200&v=1768383496&width=1200 | 2026-02-14 | ✅ Collected |
| 153 | Newtech | Low Pulley | `153-newtech-low-pulley.webp` | http://newtechworldwide.com/cdn/shop/files/0ac1f0e6814dd_7bae1e13-4d69-498f-9395-71171d5aab9d.png?v=1732071087 | 2026-02-14 | ✅ Collected |
| 154 | Others | Power Rack | `154-power-rack.webp` | http://newtechworldwide.com/cdn/shop/files/power_rack.jpg?v=1764119071 | 2026-02-14 | ✅ Collected |
| 155 | Others | Bench Press Rack | `155-bench-press-rack.webp` | http://newtechworldwide.com/cdn/shop/files/5bbf1b0503d50_1.png?v=1732083473 | 2026-02-14 | ✅ Collected |
| 156 | Others | Dumbbells Set 1 | `156-dumbbells-set-1.webp` | http://newtechworldwide.com/cdn/shop/files/b8125fbe0e1d9.png?v=1732085093 | 2026-02-14 | ✅ Collected |
| 157 | Others | Dumbbells Set 2 | `157-dumbbells-set-2.webp` | http://newtechworldwide.com/cdn/shop/files/2176047aebaa5.png?v=1732085089 | 2026-02-14 | ✅ Collected |

---

## 3. OTHER ASSETS (Logo, Icon, etc.)

### Brand Logos (`/public/logos`)
| Brand | File Name | Status |
|---|---|---|
| Arsenal Strength | `arsenal-strength.png` | ✅ OK |
| Atlantis | `atlantis.png` | ✅ OK |
| Body Masters | `body-masters.png` | ✅ OK |
| Cybex | `cybex.png` | ✅ OK |
| Hammer Strength | `hammer-strength.png` | ✅ OK |
| Icarian | `icarian.png` | ✅ OK |
| Life Fitness | `life-fitness.png` | ✅ OK |
| Nautilus | `nautilus.png` | ✅ OK |
| Panatta | `panata.png` | ✅ OK |
| Precor | `precor.png` | ✅ OK |

### General Assets (`/public`)
| Type | File/Path | Status |
|---|---|---|
| Favicon | `favicon.png` | ✅ OK |
| OG Image | `og-image.png` | ✅ OK |
| Video | `/videos/intro.mp4` | ⚠️ Verify |
| Poster | `/images/video-placeholder.jpg` | ⚠️ Verify |
