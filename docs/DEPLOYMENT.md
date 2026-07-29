# 운영 사이트 배포 방법

검증된 `main` 커밋을 Cloudflare에 배포하고 운영 화면까지 확인하는 절차입니다.

## 사전 조건

- GitHub 원격 `https://github.com/bonjin-app/portfolio.2015.git`
- 기본 브랜치 `main`
- GitHub CLI 인증
- 깨끗한 작업 트리

```bash
git status --short --branch
gh auth status
```

이 저장소에는 Cloudflare 설정 파일이 없습니다. 빌드 연결과 운영 도메인은
Cloudflare 대시보드에서 관리합니다.

## 1. clean install과 빌드 확인

Cloudflare와 같은 조건에 가깝게 의존성을 다시 설치합니다.

```bash
npm ci --progress=false
npm test
npm run lint
npm run build
```

빌드 결과는 `dist`에 생성됩니다. 로컬에서 결과를 확인하려면 다음 명령을
실행합니다.

```bash
npm run preview
```

## 2. `main`에 푸시

변경 파일만 선별해 커밋한 뒤 푸시합니다.

```bash
git push origin main
```

`main` push는 Cloudflare의 `Workers Builds: portfolio2015` 체크를 시작합니다.

## 3. Cloudflare 빌드 상태 확인

```bash
COMMIT_SHA=$(git rev-parse HEAD)
gh api "repos/bonjin-app/portfolio.2015/commits/${COMMIT_SHA}/check-runs" \
  --jq '.check_runs[] |
    select(.name=="Workers Builds: portfolio2015") |
    [.status, .conclusion, .details_url] | @tsv'
```

정상 결과는 `completed`, `success`입니다. `details_url`은 Cloudflare 빌드
상세 화면을 가리킵니다.

## 4. 운영 스모크 테스트

[운영 사이트](https://portfolio2015.uulab.co.kr/)에서 다음을 확인합니다.

1. Home 첫 화면이 원본 2분할 디자인으로 표시됩니다.
2. 새로고침 직후 바로 스크롤할 수 있습니다.
3. About, Works, Contact 메뉴가 정확한 섹션으로 이동합니다.
4. JSP 갤러리가 열리고 이전·다음 이동이 됩니다.
5. 390px 모바일 폭에서 메뉴와 AutoCamping 카드가 정상입니다.
6. AutoCamping 모바일 페이지에 깨진 이미지와 가로 넘침이 없습니다.
7. Console 오류와 실패한 네트워크 요청이 없습니다.

전체 체크리스트는 [품질 관리](QA.md)를 참고하세요.

## 롤백

운영 결함이 확인되면 문제 커밋을 되돌리는 새 커밋을 만듭니다.

```bash
git revert <problem-commit>
git push origin main
```

히스토리를 보존하기 위해 `main`에 force push하지 않습니다.

## 문제 해결

### Cloudflare에서 `npm ci`가 실패하는 경우

`package.json`과 `package-lock.json`이 맞지 않는 상태입니다.

```bash
npm install
npm ci
```

npm 10.9.2에서 생성된 lockfile을 함께 커밋합니다.

### 로컬 빌드는 성공하지만 Cloudflare 빌드가 실패하는 경우

1. `npm ci`부터 다시 실행해 기존 `node_modules` 영향을 제거합니다.
2. `vite.config.js`가 로컬 파일 시스템이나 개발자 홈 경로에 의존하지 않는지
   확인합니다.
3. 브라우저에 포함할 정적 문서는 Vite의 `?raw` import처럼 이식 가능한
   빌드 경로를 사용합니다.
4. Cloudflare `details_url`의 설치·빌드 로그에서 첫 오류를 확인합니다.

### 배포 성공 후 이전 화면이 보이는 경우

새 시크릿 창에서 운영 URL을 열거나 쿼리 문자열을 붙여 캐시를 우회합니다.

```text
https://portfolio2015.uulab.co.kr/?verify=<commit>
```

Network에서 새 `assets/index-*.js` 해시가 로드되는지 확인합니다.
