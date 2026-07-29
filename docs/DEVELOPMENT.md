# 포트폴리오 콘텐츠와 화면 수정 방법

원본 디자인을 유지하면서 콘텐츠, 스타일 또는 연결된 정적 작업물을 수정하는
절차입니다.

## 사전 조건

- [시작 가이드](GETTING_STARTED.md)에 따라 개발 서버를 실행한 상태
- 변경 전 `git status --short`로 기존 작업 확인
- 데스크톱 1440×900, 모바일 390×844 화면을 비교할 수 있는 브라우저

## 원본 HTML 수정

루트 포트폴리오의 기준 문서는 `public/legacy/index.html`입니다.

1. `public/legacy/index.html`을 수정합니다.
2. 빌드용 미러를 동일하게 맞춥니다.

   ```bash
   cp public/legacy/index.html src/legacy-index.html
   ```

3. 두 파일이 같은지 확인합니다.

   ```bash
   cmp public/legacy/index.html src/legacy-index.html
   npm test
   ```

두 파일을 분리한 이유와 로딩 순서는 [아키텍처](ARCHITECTURE.md)를
참고하세요.

## 원본 CSS 수정

기존 화면은 `public/legacy/css/style.css`와
`public/legacy/css/magnific-popup.css`가 담당합니다.

- 원본 디자인 수정은 기존 CSS에서 처리합니다.
- React 오류·로딩 UI 같은 신규 셸은 `src/tailwind.css`와 Tailwind
  유틸리티로 처리합니다.
- Tailwind Preflight는 추가하지 않습니다. 원본 reset 규칙과 충돌해 레이아웃이
  달라집니다.
- 변경 후 데스크톱과 모바일 화면을 모두 확인합니다.

## 정적 작업물 수정

포트폴리오 카드가 연결하는 작업물은 `public/legacy/html` 아래에 있습니다.

| 작업물 | 경로 |
| --- | --- |
| LoveYourSelf | `public/legacy/html/LoveYourSelf` |
| LikeBike | `public/legacy/html/LikeBike` |
| AutoCamping 데스크톱 | `public/legacy/html/Web_renew` |
| AutoCamping 모바일 | `public/legacy/html/Web_renew_m` |
| 진명홈바스 | `public/legacy/html/jinmyung` |

AutoCamping 모바일 페이지는 별도 이미지 폴더가 없으므로 데스크톱
`Web_renew/images/main_img` 자산을 상대 경로로 재사용합니다. 경로를 바꾸면
`tests/polish.test.mjs`도 함께 확인하세요.

## 포트폴리오 카드 추가

1. 정적 작업물을 `public/legacy/html/<project>`에 추가합니다.
2. `public/legacy/index.html`의 Works 목록에 카드를 추가합니다.
3. `src/legacy-index.html`을 다시 동기화합니다.
4. 링크는 `html/<project>/index.html`처럼 `public/legacy` 기준 상대 경로로
   작성합니다.
5. 이미지 갤러리라면 기존 Magnific Popup 마크업 패턴을 따릅니다.
6. 데스크톱과 모바일에서 링크, 이미지와 새 탭 동작을 확인합니다.

## React 셸 수정

- `src/main.jsx`: 원본 마크업을 React 마운트 전에 준비합니다.
- `src/legacy.js`: 원본 문서를 파싱하고 상대 경로에 `/legacy`를 붙입니다.
- `src/App.jsx`: 준비된 마크업을 렌더링하고 jQuery 스크립트를 순서대로
  로드합니다.
- `src/tailwind.css`: React 셸에서만 사용하는 Tailwind 테마입니다.

레거시 스크립트 순서를 바꾸면 `jquery.scrollTo` 또는 Magnific Popup이
초기화되지 않을 수 있습니다. 순서는 [기술 참조](REFERENCE.md#런타임-로딩-순서)에
정리되어 있습니다.

## 의존성 변경

이 프로젝트는 npm 10.9.2 기준 lockfile을 사용합니다.

```bash
npm install <package>
npm ci
npm test
npm run lint
npm run build
```

`package.json`과 `package-lock.json`은 한 커밋에 포함합니다.

## 검증

```bash
npm test
npm run lint
npm run build
node --check public/legacy/js/script.js
git diff --check
```

수동 검사 항목은 [품질 관리](QA.md#수동-회귀-검사)를 참고하세요.

## 문제 해결

### `legacy markup is bundled` 테스트가 실패하는 경우

`public/legacy/index.html`과 `src/legacy-index.html`이 다릅니다. 공개 원본을
기준으로 다시 복사한 뒤 테스트합니다.

### 원본 화면의 여백이나 글꼴이 달라진 경우

`src/tailwind.css`에 `tailwindcss/preflight.css`가 추가됐는지 확인합니다.
Preflight를 제거하고 원본 reset CSS가 먼저 적용되는지 확인하세요.

### 모바일 AutoCamping 이미지가 깨지는 경우

`Web_renew_m`의 HTML과 CSS가
`../Web_renew/images/main_img` 또는
`../../Web_renew/images/main_img`를 가리키는지 확인합니다.
