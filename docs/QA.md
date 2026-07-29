# 품질 관리와 회귀 검사

자동 검사와 브라우저 검사를 함께 사용합니다. 정적 테스트는 파일과 규칙의
정합성을 막고, 브라우저 검사는 실제 화면과 jQuery 동작을 확인합니다.

## 현재 상태

2026-07-29 운영 검증 기준:

- 자동 테스트 5개 통과
- ESLint 통과
- Vite production build 통과
- npm audit 취약점 0건
- 메인·모바일 AutoCamping 깨진 이미지 0개
- 메인 콘솔 오류 0건
- 390px 모바일 가로 오버플로 0px
- Cloudflare Workers build 성공

운영 URL은 [portfolio2015.uulab.co.kr](https://portfolio2015.uulab.co.kr/)입니다.

## 자동 검사

```bash
npm test
npm run lint
npm run build
node --check public/legacy/js/script.js
git diff --check
```

### `tests/polish.test.mjs`

| 검사 | 방지하는 회귀 |
| --- | --- |
| 원본 raw 번들 준비 | React 마운트 후 fetch로 첫 스크롤 입력 유실 |
| 공개 원본과 빌드 미러 일치 | 수정 내용이 운영 루트에 반영되지 않음 |
| `main`과 아이콘 접근성 이름 | 이름 없는 링크와 본문 랜드마크 누락 |
| AutoCamping 자산 존재 | 모바일 상세 페이지 이미지 깨짐 |
| Jinmyung title·viewport | 의미 없는 탭 제목과 잘못된 viewport 키 |

### `tests/scroll-reset.test.mjs`

새로고침 시 1초 동안 상단으로 이동하는 jQuery 애니메이션이 다시 추가되지
않도록 검사합니다.

## 수동 회귀 검사

### 데스크톱 1440×900

1. Home의 2분할 레이아웃과 슬라이드가 원본과 같은지 확인합니다.
2. About, Works, Contact 메뉴가 각 섹션 상단으로 이동하는지 확인합니다.
3. Works 카드 이미지와 설명이 잘리지 않는지 확인합니다.
4. JSP 게시판 갤러리가 첫 이미지에서 열리고 이전·다음 버튼이 작동하는지
   확인합니다.
5. Console 오류와 실패한 네트워크 요청이 없는지 확인합니다.

### 모바일 390×844

1. Home에서 제목, 메뉴 아이콘, 슬라이드와 아래 화살표를 확인합니다.
2. 상단 메뉴와 고정 메뉴의 터치 영역을 확인합니다.
3. 새로고침 직후 바로 스크롤하고 입력이 유지되는지 확인합니다.
4. 페이지 폭과 `document.documentElement.scrollWidth`가 390px인지 확인합니다.
5. 화면 상단 이동 링크와 메뉴 버튼이 접근 가능한 이름을 갖는지 확인합니다.

### AutoCamping 모바일

1. 메인 Works에서 AutoCamping 링크가
   `/legacy/html/Web_renew_m/index.html`을 가리키는지 확인합니다.
2. 로고, 메인 사진, EVENT·REST, 4개 바로가기와 Review·FAQ가 표시되는지
   확인합니다.
3. 깨진 이미지가 0개인지 확인합니다.
4. 가로 오버플로와 Console 오류가 없는지 확인합니다.

## 수정된 주요 회귀

| 영역 | 이전 문제 | 현재 방어 |
| --- | --- | --- |
| About 진입 | React 래퍼 높이가 없어 첫 화면과 겹침 | 루트 높이와 브라우저 검사 |
| 새로고침 스크롤 | 강제 상단 애니메이션이 휠 입력 취소 | `scroll-reset.test.mjs` |
| load 직후 스크롤 | 원본 fetch 전 문서가 한 화면 높이 | raw 번들 + 선행 마운트 테스트 |
| 모바일 AutoCamping | 누락된 `images/images` 자산 7개 | 보존 자산 재사용 + 파일 존재 테스트 |
| 접근성 | 이름 없는 상단 링크와 본문 랜드마크 누락 | 정적 접근성 표식 테스트 |
| npm clean install | package와 lockfile 불일치 | 배포 전 `npm ci` |
| 공개 문구·제목 | `COPYLIGHT`, `Untitled Document` | 정적 문구·title 검사 |

## 정적 아카이브의 범위

이 프로젝트는 서버 기능이 없는 정적 아카이브입니다.

- JSP 게시판, 로그인과 앱 화면은 이미지 갤러리로 보존합니다.
- 과거 작업물의 Login, Join, 검색, 게시판 입력은 실제 서버에 연결되지
  않습니다.
- `href="#"`인 포트폴리오 카드는 jQuery 갤러리 트리거일 수 있으므로 단순
  broken-link로 판단하지 않습니다.
- Cloudflare Web Analytics 요청은 호스팅 환경에서 주입될 수 있습니다.

## 배포 전 완료 조건

- [ ] `npm ci` 성공
- [ ] `npm test` 성공
- [ ] `npm run lint` 성공
- [ ] `npm run build` 성공
- [ ] `git diff --check` 성공
- [ ] 데스크톱·모바일 수동 회귀 검사
- [ ] Cloudflare 체크 `completed / success`
- [ ] 운영 URL 스모크 테스트

실제 배포 절차는 [배포 가이드](DEPLOYMENT.md)를 참고하세요.
