# Choi Taeho — Portfolio Archive

2015년에 제작한 개인 포트폴리오의 디자인과 인터랙션을 그대로 보존하면서
실행 환경을 React와 Vite로 옮긴 프로젝트입니다. 원본 HTML, CSS, 이미지와
jQuery 동작은 `public/legacy`에서 보존하고 React 진입점이 이를 안전하게
불러와 기존과 동일한 화면을 렌더링합니다.

## 주요 기능

- 2015년 원본 레이아웃, 타이포그래피, 색상과 이미지 1:1 보존
- 원본 스크롤 이동, 이미지 슬라이드, 반응형 메뉴와 갤러리 보존
- 기존 웹 프로젝트와 이미지 갤러리 경로 유지
- React 진입점에서 원본 마크업과 자산 경로 로딩
- 데스크톱과 모바일 원본 반응형 레이아웃 유지
- Tailwind CSS 4 기반의 React 로딩·오류 UI와 신규 스타일
- favicon, description, Open Graph, Twitter Card 메타데이터
- 원본 페이지와 모든 정적 자산 별도 보존

## 기술 구성

| 구분 | 기술 |
| --- | --- |
| UI | React 19 |
| 개발 서버·빌드 | Vite 8 |
| 스타일 | Tailwind CSS 4 + 2015년 원본 호환 레이어 |
| 코드 품질 | ESLint 10, React Hooks 규칙 |
| 인터랙션 | 원본 jQuery, scrollTo, Magnific Popup |

## 시작하기

요구 환경:

- Node.js 20.19 이상 또는 22.12 이상
- npm 10.9.2 (`packageManager`에 고정)

```bash
npm ci
npm run dev
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.
의존성을 변경할 때만 npm 10.9.2에서 `npm install`을 실행하고,
변경된 `package-lock.json`을 함께 커밋합니다.

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
│   ├── App.jsx               # 원본 마크업 로더와 경로 변환
│   ├── main.jsx              # React 진입점
│   └── tailwind.css          # Tailwind 테마와 유틸리티 진입점
├── eslint.config.js
├── index.html                # Vite HTML 및 SEO/소셜 메타데이터
├── package.json
└── vite.config.js
```

## 콘텐츠 수정

화면 콘텐츠와 디자인은 `public/legacy/index.html`과
`public/legacy/css/style.css`에서 관리합니다. 원본과 동일한 디자인을 유지해야
하므로 기존 화면은 원본 CSS를 호환 레이어로 유지합니다. React 로딩·오류
상태와 새 UI는 Tailwind 유틸리티로 작성합니다.

Tailwind의 Preflight는 원본 reset CSS와 충돌해 픽셀 차이를 만들 수 있으므로
의도적으로 제외했습니다. 앞으로 기존 화면을 옮길 때는 한 컴포넌트씩
Tailwind로 전환하고 데스크톱·모바일 비교를 통과한 뒤 원본 규칙을 제거합니다.

`src/App.jsx`는 원본 문서를 불러오고 정적 자산 경로를 `/legacy` 기준으로
변환한 뒤, 기존 스크립트를 원래 순서대로 로드합니다.

## 배포

별도의 서버 기능이 없는 정적 SPA이므로 Vite 빌드 결과인 `dist`를 정적 호스팅에
배포하면 됩니다.

```bash
npm ci
npm run lint
npm run build
```

Netlify, Vercel, Cloudflare Pages, GitHub Pages 등에서 빌드 명령은
`npm run build`, 출력 디렉터리는 `dist`로 설정합니다. 현재 앱은 단일 페이지의
섹션 앵커를 사용하므로 별도의 SPA rewrite 규칙이 필요하지 않습니다.

## 원본 아카이브

개발 서버 실행 후 `/legacy/index.html`에서 기준이 되는 2015년 원본
포트폴리오를 직접 볼 수 있습니다. 루트 화면을 변경할 때는 항상 이 페이지와
데스크톱·모바일 스크린샷을 비교해 시각적 차이가 없는지 확인합니다.

마이그레이션 배경과 유지보수 원칙은
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)를 참고하세요.

수정된 결함과 회귀 검사 항목은
[`docs/QA.md`](docs/QA.md)를 참고하세요.
