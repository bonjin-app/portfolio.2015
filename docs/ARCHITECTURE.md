# Architecture & Migration Notes

## 핵심 원칙

이 마이그레이션은 2015년 포트폴리오를 새로 디자인하는 작업이 아닙니다.
기존 디자인, 콘텐츠, 반응형 규칙과 인터랙션을 그대로 유지하면서 개발·빌드
환경만 React와 Vite로 전환합니다.

## 렌더링 흐름

1. Vite의 `index.html`이 React 진입점을 실행합니다.
2. `src/App.jsx`가 `/legacy/index.html`을 읽습니다.
3. 원본 마크업의 상대 이미지와 링크 경로를 `/legacy` 기준으로 변환합니다.
4. 변환된 원본 `body`를 React 루트에 렌더링합니다.
5. jQuery, scrollTo, Magnific Popup과 원본 `script.js`를 순서대로 로드합니다.

```mermaid
flowchart LR
  Browser["브라우저"] --> Vite["Vite index.html"]
  Vite --> React["React App"]
  React --> Markup["원본 HTML"]
  React --> Assets["원본 CSS·이미지"]
  React --> Scripts["원본 jQuery 인터랙션"]
```

## 파일 역할

- `index.html`: 메타데이터, 원본 CSS와 React 진입점
- `src/App.jsx`: 원본 문서 로딩, 자산 경로 변환, 스크립트 로딩
- `src/legacy-bridge.css`: React 루트와 로딩·오류 화면에 필요한 최소 스타일
- `public/legacy/index.html`: 화면과 콘텐츠의 기준 원본
- `public/legacy/css/style.css`: 원본 디자인과 반응형 규칙
- `public/legacy/js/script.js`: 원본 스크롤, 슬라이드, 메뉴와 갤러리 동작
- `public/legacy/html`: 포트폴리오에 연결된 개별 작업물
- `public/legacy/images`: 원본 이미지와 갤러리 자산

## 시각적 정합성 검증

루트 `/`와 기준 페이지 `/legacy/index.html`을 동일한 브라우저와 해상도에서
캡처해 비교합니다.

- 데스크톱 기준: 1280×720
- 모바일 기준: 390×844
- 초기 화면, Works 이동, 이미지 갤러리 동작 확인

애니메이션이 있는 요소는 동일 시점에 캡처하거나 차이 영역이 해당 애니메이션에
한정되는지 확인합니다.

## 유지보수 원칙

- 원본 요청 없이 레이아웃, 색상, 폰트, 카피를 재설계하지 않습니다.
- 화면 수정은 우선 `public/legacy`의 원본 파일에 반영합니다.
- `src/legacy-bridge.css`에는 원본 디자인 규칙을 추가하지 않습니다.
- 원본 자산 경로를 이동할 때는 `src/App.jsx`의 경로 변환도 확인합니다.
- 배포 전 `npm run lint`, `npm run build`와 원본 비교 검증을 수행합니다.

## 메타데이터

시각 디자인에 영향을 주지 않는 사이트 메타데이터는 Vite `index.html`에서
관리합니다.

- favicon: `/favicon.png`
- Open Graph/Twitter 이미지: `/legacy/images/responsive.jpg`
- 문서 제목: `PORTFOLIO`
