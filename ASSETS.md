# 자산 목록 (Asset List)

이 문서는 프로젝트에서 현재 사용 중이거나 필요한 모든 이미지 및 미디어 자산을 정리한 목록입니다.

## 1. 브랜드 로고 (`/public/logos`)
`BrandMarquee.tsx` 및 `MachineLineup.tsx` 컴포넌트에서 사용됩니다.

| 브랜드 (Brand) | 파일명 (File Name) | 상태 (Status) | 비고 (Note) |
|---|---|---|---|
| Arsenal Strength | `arsenal-strength.png` | ✅ 보유중 | |
| Atlantis | `atlantis.png` | ✅ 보유중 | |
| Body Masters | `body-masters.png` | ✅ 보유중 | |
| Cybex | `cybex.png` | ✅ 보유중 | |
| Hammer Strength | `hammer-strength.png` | ✅ 보유중 | |
| Icarian | `icarian.png` | ✅ 보유중 | |
| Life Fitness | `life-fitness.png` | ✅ 보유중 | |
| Nautilus | `nautilus.png` | ✅ 보유중 | |
| Panatta | `panata.png` | ✅ 보유중 | 파일명 `panata.png` (코드 내 사용) |
| Precor | `precor.png` | ✅ 보유중 | |

## 2. 마케팅 및 SEO 자산 (`/public`)

| 설명 | 파일명 | 상태 | 비고 |
|---|---|---|---|
| 파비콘 (Favicon) | `favicon.png` | ✅ 보유중 | 브라우저 탭 아이콘 |
| 오픈 그래프 이미지 | `og-image.png` | ✅ 보유중 | 소셜 미디어 공유 미리보기 |

## 3. 미디어 자산 (비디오/포스터)
`HeroSection.tsx` 등에서 참조되나 확인이 필요한 자산입니다.

| 컴포넌트 | 자산 유형 | 경로 | 상태 | 비고 |
|---|---|---|---|---|
| `HeroSection.tsx` | 비디오 | `/videos/intro.mp4` | ⚠️ 확인 필요 | 신규 입고 섹션 배경 비디오 |
| `HeroSection.tsx` | 이미지 (포스터) | `/images/video-placeholder.jpg` | ⚠️ 확인 필요 | 비디오 로딩 전 표시될 썸네일 |

## 4. UI 아이콘/SVG (`/public`)
기본 Next.js 또는 UI 아이콘입니다.

- `file.svg`
- `globe.svg`
- `next.svg`
- `vercel.svg`
- `window.svg`

## 5. 머신 이미지 (필요 리스트)
각 머신 항목에 들어갈 실제 이미지 파일이 필요합니다.
권장 경로: `/public/machines/` (폴더 생성 필요)
권장 규격: 16:9 또는 4:3 비율의 고화질 이미지 (WebP 권장)

### Panatta
| ID | 기구명 | 권장 파일명 | 상태 |
|---|---|---|---|
| 101 | Super High Row | `101-super-high-row.webp` | ❌ 미보유 |
| 102 | Super Rowing Machine Circular | `102-super-rowing-circular.webp` | ❌ 미보유 |
| 103 | Super Low Row | `103-super-low-row.webp` | ❌ 미보유 |
| 104 | Super Rowing | `104-super-rowing.webp` | ❌ 미보유 |
| 105 | Super Lat Machine Convert | `105-super-lat-convert.webp` | ❌ 미보유 |
| 106 | Incline Split 45 Degree Leg Press | `106-incline-split-leg-press.webp` | ❌ 미보유 |

### Cybex
| ID | 기구명 | 권장 파일명 | 상태 |
|---|---|---|---|
| 107 | Smith Machine | `107-smith-machine.webp` | ❌ 미보유 |
| 108 | Squat Machine | `108-squat-machine.webp` | ❌ 미보유 |
| 109 | Hack Squat Old | `109-hack-squat-old.webp` | ❌ 미보유 |
| 110 | Leg Press Old | `110-leg-press-old.webp` | ❌ 미보유 |
| 111 | Cable Tower Old | `111-cable-tower-old.webp` | ❌ 미보유 |
| 112 | Seated Row Old | `112-seated-row-old.webp` | ❌ 미보유 |
| 113 | Lateral Raise Old | `113-lateral-raise-old.webp` | ❌ 미보유 |
| 114 | Seated Leg Press | `114-seated-leg-press.webp` | ❌ 미보유 |
| 115 | Arm Curl Machine Old | `115-arm-curl-old.webp` | ❌ 미보유 |
| 116 | Shoulder Press Machine | `116-shoulder-press.webp` | ❌ 미보유 |

### Nautilus
| ID | 기구명 | 권장 파일명 | 상태 |
|---|---|---|---|
| 117 | Seated Dip | `117-seated-dip.webp` | ❌ 미보유 |
| 118 | Nitro Plus Lat Pulldown | `118-nitro-plus-lat-pulldown.webp` | ❌ 미보유 |
| 119 | Nitro Plus Incline Press | `119-nitro-plus-incline-press.webp` | ❌ 미보유 |
| 120 | Nitro Plus Vertical Press | `120-nitro-plus-vertical-press.webp` | ❌ 미보유 |
| 121 | Multi Biceps | `121-multi-biceps.webp` | ❌ 미보유 |
| 122 | Nitro Plus Pullover | `122-nitro-plus-pullover.webp` | ❌ 미보유 |

### Hammer Strength
| ID | 기구명 | 권장 파일명 | 상태 |
|---|---|---|---|
| 123 | ISO Lateral Shoulder Press | `123-iso-lateral-shoulder-press.webp` | ❌ 미보유 |
| 124 | Iso Lateral Bench Press | `124-iso-lateral-bench-press.webp` | ❌ 미보유 |
| 125 | Iso Lateral Decline Press | `125-iso-lateral-decline-press.webp` | ❌ 미보유 |
| 126 | Iso Lateral Incline Press | `126-iso-lateral-incline-press.webp` | ❌ 미보유 |
| 127 | Iso Incline Press | `127-iso-incline-press.webp` | ❌ 미보유 |
| 128 | Iso Low Row | `128-iso-low-row.webp` | ❌ 미보유 |
| 129 | Iso Lateral Row | `129-iso-lateral-row.webp` | ❌ 미보유 |
| 130 | Seated Biceps Curl | `130-seated-biceps-curl.webp` | ❌ 미보유 |
| 131 | Seated Triceps Extension | `131-seated-triceps-extension.webp` | ❌ 미보유 |
| 132 | Hip Abduction | `132-hip-abduction.webp` | ❌ 미보유 |
| 133 | Leg Extension | `133-leg-extension.webp` | ❌ 미보유 |
| 134 | Leg Curl | `134-leg-curl.webp` | ❌ 미보유 |
| 135 | Iso Lateral Wide Pulldown | `135-iso-lateral-wide-pulldown.webp` | ❌ 미보유 |
| 136 | Iso Lateral Front Pulldown | `136-iso-lateral-front-pulldown.webp` | ❌ 미보유 |
| 137 | Iso Lateral DY Row | `137-iso-lateral-dy-row.webp` | ❌ 미보유 |
| 138 | MTS High Row | `138-mts-high-row.webp` | ❌ 미보유 |
| 139 | MTS Incline Press | `139-mts-incline-press.webp` | ❌ 미보유 |
| 140 | MTS Decline Press | `140-mts-decline-press.webp` | ❌ 미보유 |
| 141 | MTS Shoulder Press | `141-mts-shoulder-press.webp` | ❌ 미보유 |
| 142 | Fixed Pulldown | `142-fixed-pulldown.webp` | ❌ 미보유 |

### Life Fitness
| ID | 기구명 | 권장 파일명 | 상태 |
|---|---|---|---|
| 143 | Seated Leg Curl | `143-seated-leg-curl.webp` | ❌ 미보유 |

### Arsenal Strength
| ID | 기구명 | 권장 파일명 | 상태 |
|---|---|---|---|
| 144 | Low Row | `144-low-row.webp` | ❌ 미보유 |

### Icarian
| ID | 기구명 | 권장 파일명 | 상태 |
|---|---|---|---|
| 145 | V Squat | `145-v-squat.webp` | ❌ 미보유 |
| 146 | Lat Pulldown 304 | `146-lat-pulldown-304.webp` | ❌ 미보유 |
| 147 | Long Pull | `147-long-pull.webp` | ❌ 미보유 |
| 148 | Pec Deck Fly | `148-pec-deck-fly.webp` | ❌ 미보유 |

### Body Masters
| ID | 기구명 | 권장 파일명 | 상태 |
|---|---|---|---|
| 149 | MD504 Vertical Pec Control | `149-md504-vertical-pec.webp` | ❌ 미보유 |
| 150 | T-Bar Row | `150-t-bar-row.webp` | ❌ 미보유 |
| 151 | Pull Down Machine | `151-pull-down-machine.webp` | ❌ 미보유 |

### Others
| ID | 기구명 | 권장 파일명 | 상태 |
|---|---|---|---|
| 152 | Gymleco Side Lateral Machine | `152-gymleco-lateral.webp` | ❌ 미보유 |
| 153 | Newtech Low Pulley | `153-newtech-low-pulley.webp` | ❌ 미보유 |
| 154 | Power Rack x1 | `154-power-rack.webp` | ❌ 미보유 |
| 155 | Bench Press Rack | `155-bench-press-rack.webp` | ❌ 미보유 |
| 156 | Dumbbells 2 ~ 22.8kg | `156-dumbbells-set-1.webp` | ❌ 미보유 |
| 157 | Dumbbells 30lb ~ 50lb | `157-dumbbells-set-2.webp` | ❌ 미보유 |
