# Machine Asset Collector

공식 제조사 자산만 수집하기 위한 자동화 스크립트입니다.

## 보장하는 정책

- 공식 도메인 allowlist가 아니면 차단
- 모든 요청 전 `robots.txt` 확인 (`Disallow` 차단)
- 요청은 단일 순차 처리 + 요청 간 1.5~3초 지연
- 기구당 최대 1~2장, 브랜드당 최대 수십 장 제한
- 저장 포맷은 WebP, 최대 가로 1600px, 품질 75~85
- `ASSETS_SOURCES.md`에 `source_url`, `acquired_at`, `status` 자동 반영

## 1) 수집 계획 템플릿 생성

```bash
npm run assets:plan
```

생성 파일: `scripts/machine-assets/source-plan.template.json`

이 파일을 복사해 `scripts/machine-assets/source-plan.json`으로 만들고, 공식 URL만 입력합니다.

기본 매핑(공식 도메인 URL) 자동 반영:

```bash
npm run assets:plan:populate
```

## 2) 수집 실행

```bash
npm run assets:collect
```

부분 실행 예시:

```bash
npm run assets:collect -- --ids 123,124
```

드라이런(실제 다운로드/기록 없음):

```bash
npm run assets:collect:dry
```

## 3) 권리자 요청 즉시 비노출(삭제)

```bash
npm run assets:takedown -- --id 144
```

- `public/machines/{id}-{slug}*.webp` 파일 삭제
- `ASSETS_SOURCES.md` 상태를 `🛑 Takedown`으로 변경

## 수집 소스 타입

- `pdf`: 공식 카탈로그/브로셔 PDF URL + `pages`
- `html`: 공식 제품 페이지 URL (정적 파싱, 필요 시 `allow_browser: true`)
- `media`: 제조사 media/press/downloads의 직접 이미지 URL

## 출력

- 이미지 경로: `public/machines/`
- 파일명: `{id}-{slug}.webp` (`2장째부터 {id}-{slug}-2.webp`)
- 로그 반영 파일: `ASSETS_SOURCES.md`

## 권리자 요청 대응

이미지는 `public/machines/`에서 파일 단위로 즉시 비노출/삭제 가능하며, UI에서는 이미지 누락 시 fallback을 유지하도록 운영합니다.
