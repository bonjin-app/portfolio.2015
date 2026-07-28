# Choi Taeho — Portfolio Archive

2015년에 제작한 개인 포트폴리오를 React와 Vite로 다시 구성한 프로젝트입니다.
당시 작업물은 지우지 않고 `public/legacy`에 보존했으며, 새 포트폴리오에서
원본 웹 데모와 이미지 갤러리를 계속 확인할 수 있습니다.

## 주요 기능

- React 컴포넌트 기반의 단일 페이지 포트폴리오
- Web, App, Backend 카테고리별 프로젝트 필터
- 기존 웹 프로젝트를 새 탭에서 여는 원본 데모 링크
- 키보드 방향키와 `Escape`를 지원하는 프로젝트 이미지 갤러리
- 데스크톱, 태블릿, 모바일 반응형 레이아웃
- 모바일 전체 화면 내비게이션
- `prefers-reduced-motion` 접근성 대응
- favicon, description, Open Graph, Twitter Card 메타데이터
- 2015년 원본 포트폴리오와 모든 정적 자산 보존

## 기술 구성

| 구분 | 기술 |
| --- | --- |
| UI | React 19 |
| 개발 서버·빌드 | Vite 8 |
| 스타일 | Plain CSS, CSS Grid, Custom Properties |
| 코드 품질 | ESLint 10, React Hooks 규칙 |
| 기존 작업물 | HTML, CSS, jQuery 정적 아카이브 |

## 시작하기

요구 환경:

- Node.js 20.19 이상 또는 22.12 이상
- npm 10 이상

```bash
npm install
npm run dev
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## 명령어

```bash
# 개발 서버
npm run dev

# ESLint 검사
npm run lint

# 프로덕션 빌드
npm run build

# 빌드 결과 로컬 미리보기
npm run preview
```

`npm run build` 결과는 `dist` 디렉터리에 생성됩니다.

## 프로젝트 구조

```text
.
├── docs/
│   └── ARCHITECTURE.md       # 구조와 유지보수 가이드
├── public/
│   ├── favicon.png
│   └── legacy/               # 2015년 원본 사이트와 프로젝트
├── src/
│   ├── App.jsx               # 화면 구성과 인터랙션
│   ├── data.js               # 프로젝트·소개 데이터
│   ├── main.jsx              # React 진입점
│   └── styles.css            # 디자인 시스템과 반응형 스타일
├── eslint.config.js
├── index.html                # Vite HTML 및 SEO/소셜 메타데이터
├── package.json
└── vite.config.js
```

## 콘텐츠 수정

프로젝트 카드의 제목, 설명, 태그, 이미지와 링크는
[`src/data.js`](src/data.js)에 모여 있습니다.

- `href`: 새 탭에서 열 원본 웹 데모 경로
- `gallery`: 모달에서 보여 줄 이미지 경로 배열
- `type`: 필터에 사용할 `Web`, `App`, `Backend` 중 하나

정적 이미지와 원본 데모는 `public/legacy` 아래에서 기존 상대 경로를 유지합니다.
기존 데모 내부 파일을 이동할 때는 HTML과 CSS의 상대 경로도 함께 확인해야 합니다.

## 배포

별도의 서버 기능이 없는 정적 SPA이므로 Vite 빌드 결과인 `dist`를 정적 호스팅에
배포하면 됩니다.

```bash
npm run lint
npm run build
```

Netlify, Vercel, Cloudflare Pages, GitHub Pages 등에서 빌드 명령은
`npm run build`, 출력 디렉터리는 `dist`로 설정합니다. 현재 앱은 단일 페이지의
섹션 앵커를 사용하므로 별도의 SPA rewrite 규칙이 필요하지 않습니다.

## 원본 아카이브

개발 서버 실행 후 `/legacy/index.html`에서 2015년 원본 포트폴리오를 볼 수
있습니다. 원본은 당시 사용한 jQuery와 플러그인을 그대로 포함합니다.
새 React 앱에서는 jQuery를 사용하지 않습니다.

마이그레이션 배경과 유지보수 원칙은
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)를 참고하세요.
