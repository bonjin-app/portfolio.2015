const image = (name) => `/legacy/images/${name}`

export const projects = [
  {
    title: 'Love YourSelf',
    type: 'Web',
    year: '2015',
    cover: image('loveyourself-n.jpg'),
    description:
      '사진과 메시지를 담아 직접 모바일 청첩장을 만들 수 있도록 구성한 반응형 웹 서비스입니다.',
    tags: ['Responsive', 'UI Design', 'jQuery'],
    href: '/legacy/html/LoveYourSelf/index.html',
  },
  {
    title: 'LikeBike',
    type: 'Web',
    year: '2015',
    cover: image('likebike-n.jpg'),
    description:
      '자전거 여행을 처음 시작하는 사람을 위해 코스, 준비물, 안전 수칙을 한 흐름에 담은 정보형 웹사이트입니다.',
    tags: ['Interaction', 'Parallax', 'jQuery'],
    href: '/legacy/html/LikeBike/LikeBike.html',
  },
  {
    title: 'AutoCamping',
    type: 'Web',
    year: '2015',
    cover: image('autocamping-m.jpg'),
    description:
      '가평의 캠핑장을 가족 방문객의 관점에서 다시 정리한 데스크톱·모바일 웹 리뉴얼 작업입니다.',
    tags: ['Renewal', 'Desktop', 'Mobile'],
    href: '/legacy/html/Web_renew/index.html',
  },
  {
    title: 'JSP Board',
    type: 'Backend',
    year: '2015',
    cover: image('board.jpg'),
    description:
      'Tomcat, Eclipse, MySQL을 연동해 글 조회, 작성, 삭제와 답글 기능을 구현한 게시판입니다.',
    tags: ['JSP', 'MySQL', 'CRUD'],
    gallery: Array.from({ length: 12 }, (_, index) =>
      image(`board${index + 1}.jpg`),
    ),
  },
  {
    title: 'JSP Membership',
    type: 'Backend',
    year: '2015',
    cover: image('login.jpg'),
    description:
      '회원가입과 로그인 흐름을 직접 설계하고 MySQL 데이터베이스에 연결한 JSP 프로젝트입니다.',
    tags: ['JSP', 'MySQL', 'Auth'],
    gallery: Array.from({ length: 6 }, (_, index) =>
      image(`login${index + 2}.jpg`),
    ),
  },
  {
    title: 'Love YourSelf App',
    type: 'App',
    year: '2015',
    cover: image('loveyourself_m.jpg'),
    description:
      '기기 갤러리의 사진을 골라 모바일 청첩장을 간편하게 만들 수 있도록 구성한 앱 프로토타입입니다.',
    tags: ['Mobile', 'Prototype', 'Gallery'],
    gallery: Array.from({ length: 8 }, (_, index) =>
      image(`loveYourSelf${index + 1}.png`),
    ),
  },
  {
    title: 'EPL Player Search',
    type: 'App',
    year: '2015',
    cover: image('EPLPlayerSearch.jpg'),
    description:
      '약 600명의 EPL 선수 정보를 팀별로 검색하고 수정할 수 있게 데이터베이스화한 앱입니다.',
    tags: ['Android', 'Database', 'Search'],
    gallery: Array.from({ length: 6 }, (_, index) =>
      image(`EPLPlayerSearch${index + 1}.png`),
    ),
  },
  {
    title: 'Rock Paper Scissors',
    type: 'App',
    year: '2015',
    cover: image('jjangGame.jpg'),
    description:
      '무작위 상대와 가위바위보를 진행하고 전체 경기, 승리, 패배, 무승부를 기록하는 미니 게임입니다.',
    tags: ['Android', 'Game', 'Logic'],
    gallery: Array.from({ length: 4 }, (_, index) =>
      image(`jjang${index + 1}.png`),
    ),
  },
  {
    title: 'Jinmyung Homebath',
    type: 'Web',
    year: '2015',
    cover: image('responsive_jin.jpg'),
    description:
      '데스크톱부터 모바일까지 대응하도록 설계하고 그누보드5 기반으로 제작한 반응형 기업 웹사이트입니다.',
    tags: ['Responsive', 'PHP', 'Gnuboard'],
    href: '/legacy/html/jinmyung/index.html',
  },
]

export const filters = ['All', 'Web', 'App', 'Backend']

export const strengths = [
  {
    number: '01',
    title: 'Curiosity',
    text: '모르는 것을 발견하면 직접 만들고 확인하며 배웁니다.',
  },
  {
    number: '02',
    title: 'Trust',
    text: '맡은 역할과 약속을 끝까지 책임지는 태도를 중요하게 생각합니다.',
  },
  {
    number: '03',
    title: 'Affinity',
    text: '다양한 경험을 바탕으로 새로운 팀과 환경에 유연하게 적응합니다.',
  },
  {
    number: '04',
    title: 'Enthusiasm',
    text: '더 나은 결과를 위해 배우고 실험하는 일을 꾸준히 이어갑니다.',
  },
]
