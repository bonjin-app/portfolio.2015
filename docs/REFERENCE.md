# 기술 참조

프로젝트의 명령, 공개 경로, 파일 책임과 런타임 규칙을 한곳에 정리합니다.

## 런타임 요구 사항

| 항목 | 값 |
| --- | --- |
| Node.js | 20.19 이상 또는 22.12 이상 |
| npm | 10.9.2 |
| 애플리케이션 | React 19.2 |
| 빌드 | Vite 8.1 |
| 스타일 | Tailwind CSS 4.3 + 원본 CSS |
| 린트 | ESLint 10 |
| 테스트 | Node.js test runner |

환경 변수와 서버 API는 사용하지 않습니다.

## npm 명령

| 명령 | 동작 | 결과 |
| --- | --- | --- |
| `npm run dev` | Vite 개발 서버 실행 | 기본 `http://localhost:5173` |
| `npm test` | `tests/*.test.mjs` 실행 | 원본 동기화·자산·접근성·스크롤 검사 |
| `npm run lint` | ESLint 실행 | `dist`, `public/legacy` 제외 |
| `npm run build` | 프로덕션 빌드 | `dist` 생성 |
| `npm run preview` | `dist` 로컬 제공 | 기본 `http://localhost:4173` |

## 공개 경로

| URL | 내용 |
| --- | --- |
| `/` | React 셸에서 렌더링하는 메인 포트폴리오 |
| `/legacy/index.html` | 공개 기준 2015 원본 문서 |
| `/legacy/html/LoveYourSelf/index.html` | LoveYourSelf 정적 작업물 |
| `/legacy/html/LikeBike/LikeBike.html` | LikeBike 정적 작업물 |
| `/legacy/html/Web_renew/index.html` | AutoCamping 데스크톱 |
| `/legacy/html/Web_renew_m/index.html` | AutoCamping 모바일 |
| `/legacy/html/jinmyung/index.html` | 진명홈바스 정적 작업물 |

정적 호스팅이 디렉터리 index를 지원하면 `index.html` 경로는 끝의 `/`로
정규화될 수 있습니다.

## 핵심 파일

| 파일 | 책임 |
| --- | --- |
| `index.html` | Vite 진입점, favicon, canonical, Open Graph와 Twitter 메타데이터 |
| `src/main.jsx` | 원본 마크업 준비, 오류 처리, React 동기 마운트 |
| `src/legacy.js` | raw 원본 파싱과 상대 경로 `/legacy` 변환 |
| `src/legacy-index.html` | JavaScript 번들에 포함되는 원본 HTML 미러 |
| `src/App.jsx` | 원본 마크업 렌더링과 레거시 스크립트 순차 실행 |
| `src/tailwind.css` | React 셸용 Tailwind theme·utilities |
| `public/legacy/index.html` | 사람이 수정하는 공개 기준 원본 |
| `public/legacy/css/style.css` | 원본 레이아웃과 반응형 디자인 |
| `public/legacy/js/script.js` | 메뉴, 앵커 스크롤, 슬라이드, 팝업 |
| `tests/polish.test.mjs` | 원본 동기화, 접근성, 모바일 자산과 문서 메타 검사 |
| `tests/scroll-reset.test.mjs` | 새로고침 강제 스크롤 회귀 방지 |

## 런타임 로딩 순서

1. Vite 번들이 `src/legacy-index.html?raw`를 문자열로 포함합니다.
2. `src/legacy.js`가 `DOMParser`로 원본 `body`를 파싱합니다.
3. 상대 `src`와 `href`에 `/legacy/` 접두사를 붙입니다.
4. `src/main.jsx`가 `flushSync`로 React를 마운트합니다.
5. `src/App.jsx`가 다음 스크립트를 순서대로 로드합니다.

   1. `/legacy/js/jquery-1.11.3.min.js`
   2. `/legacy/js/jquery.scrollTo-min.js`
   3. `/legacy/js/jquery.magnific-popup.min.js`
   4. `/legacy/js/script.js`

`window.__portfolio2015ScriptsLoaded`는 같은 페이지에서 레거시 스크립트가
중복 실행되는 것을 막습니다.

## 경로 변환 규칙

`src/legacy.js`는 상대 경로만 `/legacy/` 기준으로 변환합니다. 다음 값은 그대로
유지합니다.

- `#` 앵커
- `/`로 시작하는 절대 경로
- `http:`, `https:`
- `mailto:`, `tel:`
- `data:`

## 스타일 규칙

`src/tailwind.css`는 `theme.css`와 `utilities.css`만 가져옵니다. Tailwind
Preflight를 제외해 원본 reset과 픽셀 배치를 보존합니다.

원본 화면의 breakpoint와 레이아웃은
`public/legacy/css/style.css`가 담당합니다. React 오류 화면과 로딩 상태만
Tailwind 유틸리티를 사용합니다.

## 메타데이터

| 항목 | 값 |
| --- | --- |
| title | `PORTFOLIO` |
| canonical | `https://portfolio2025.uulab.co.kr/` |
| favicon | `/favicon.png` |
| Open Graph image | `/legacy/images/responsive.jpg`의 운영 절대 URL |
| theme color | `#11120f` |

## 빌드 출력

`npm run build`는 `dist`에 다음을 생성합니다.

- `dist/index.html`
- `dist/assets/index-*.js`
- `dist/assets/index-*.css`
- `public`에서 복사된 `dist/legacy`
- `dist/favicon.png`

배포 절차는 [배포 가이드](DEPLOYMENT.md), 변경 절차는
[개발 가이드](DEVELOPMENT.md)를 참고하세요.
