# 로컬에서 포트폴리오 실행하기

이 가이드를 완료하면 2015년 포트폴리오를 로컬에서 열고, About·Works·Contact
섹션과 모바일 화면까지 확인할 수 있습니다.

## 준비물

- Node.js 20.19 이상 또는 22.12 이상
- npm 10.9.2
- Git

현재 버전은 다음 명령으로 확인합니다.

```bash
node --version
npm --version
git --version
```

## 1. 의존성 설치

저장소 루트에서 lockfile 기준으로 의존성을 설치합니다.

```bash
npm ci
```

설치가 끝나면 npm audit 결과가 함께 표시됩니다. 현재 기준 취약점은 0건입니다.

## 2. 개발 서버 실행

```bash
npm run dev
```

터미널에 표시된 `http://localhost:5173`을 브라우저에서 엽니다. 첫 화면에
`Creative Web Developer` 문구와 원본 2분할 레이아웃이 보이면 정상입니다.

## 3. 기본 동작 확인

다음 순서로 화면을 확인합니다.

1. `ABOUT ME`를 눌러 프로필 섹션으로 이동합니다.
2. `WORKS`를 눌러 포트폴리오 목록을 확인합니다.
3. JSP 게시판 카드를 눌러 이미지 갤러리를 엽니다.
4. 브라우저 폭을 390px로 줄이고 메뉴와 AutoCamping 카드를 확인합니다.

AutoCamping은 모바일 폭에서
`/legacy/html/Web_renew_m/index.html`을 새 탭으로 엽니다.

## 4. 자동 검사 실행

별도 터미널에서 다음 명령을 실행합니다.

```bash
npm test
npm run lint
npm run build
```

테스트 5개, ESLint와 Vite 빌드가 모두 성공하면 개발 환경이 준비된 것입니다.

## 다음 단계

- 콘텐츠나 스타일 수정: [개발 가이드](DEVELOPMENT.md)
- 구조와 보존 전략 이해: [아키텍처](ARCHITECTURE.md)
- 운영 배포: [배포 가이드](DEPLOYMENT.md)
- 명령과 경로 조회: [기술 참조](REFERENCE.md)

## 문제 해결

### `npm ci`가 lockfile 불일치로 실패하는 경우

의존성을 변경한 브랜치에서 npm 10.9.2로 lockfile을 다시 생성합니다.

```bash
npm install
npm ci
```

`package.json`과 `package-lock.json`을 반드시 함께 커밋합니다.

### 첫 화면이 아니라 오류 화면이 나오는 경우

브라우저 개발자 도구의 Console과 Network에서 다음 파일을 확인합니다.

- `/assets/index-*.js`
- `/legacy/css/style.css`
- `/legacy/js/jquery-1.11.3.min.js`
- `/legacy/js/script.js`

빌드용 원본과 공개 원본이 다르면 `npm test`가 실패합니다. 해결 방법은
[개발 가이드의 원본 HTML 수정 절차](DEVELOPMENT.md#원본-html-수정)를
참고하세요.
