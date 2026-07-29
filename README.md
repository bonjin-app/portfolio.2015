# Choi Taeho Portfolio Archive

2015년에 제작한 포트폴리오의 화면과 인터랙션을 보존하면서 실행 환경을
React 19, Vite 8, Tailwind CSS 4로 옮긴 정적 아카이브입니다.

- 운영 사이트: [portfolio2015.uulab.co.kr](https://portfolio2015.uulab.co.kr/)
- 기본 브랜치: `main`
- 배포 방식: GitHub push → Cloudflare Workers Builds

## 빠른 시작

Node.js 20.19 이상 또는 22.12 이상과 npm 10.9.2가 필요합니다.

```bash
npm ci
npm run dev
```

브라우저에서 `http://localhost:5173`을 열면 됩니다. 처음 실행하는 경우
[시작 가이드](docs/GETTING_STARTED.md)를 따라가세요.

## 주요 명령

```bash
npm run dev      # 개발 서버
npm test         # 회귀 테스트
npm run lint     # ESLint
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 문서

| 문서 | 목적 |
| --- | --- |
| [문서 안내](docs/README.md) | 상황별 문서 찾기 |
| [시작 가이드](docs/GETTING_STARTED.md) | 설치부터 첫 화면 확인까지 |
| [개발 가이드](docs/DEVELOPMENT.md) | 콘텐츠·스타일·정적 작업물 수정 |
| [배포 가이드](docs/DEPLOYMENT.md) | 빌드, Cloudflare 배포, 운영 확인 |
| [기술 참조](docs/REFERENCE.md) | 명령, 경로, 파일 책임, 런타임 규칙 |
| [아키텍처](docs/ARCHITECTURE.md) | 원본 디자인 보존 구조와 설계 이유 |
| [품질 관리](docs/QA.md) | 자동 검사, 수동 회귀 검사, 정적 한계 |

## 프로젝트 원칙

- 원본 레이아웃, 색상, 폰트와 인터랙션을 재설계하지 않습니다.
- 보존 화면은 `public/legacy`, React 셸과 신규 UI는 `src`에서 관리합니다.
- Tailwind Preflight는 원본 reset CSS와 충돌하므로 사용하지 않습니다.
- `public/legacy/index.html`을 수정하면 `src/legacy-index.html`도 동일하게
  맞춰야 합니다. `npm test`가 두 파일의 일치를 검사합니다.
- 배포 전 `npm test`, `npm run lint`, `npm run build`를 모두 통과해야 합니다.

## 저장소 구조

```text
.
├── docs/                  # 사용·개발·운영 문서
├── public/legacy/         # 2015년 원본 사이트와 정적 작업물
├── src/                   # React 진입점, 원본 로더, Tailwind 셸
├── tests/                 # 회귀 테스트
├── index.html             # Vite 진입 HTML과 사이트 메타데이터
└── vite.config.js         # React·Tailwind Vite 설정
```

세부 파일 책임과 공개 경로는 [기술 참조](docs/REFERENCE.md)에 정리되어
있습니다.
