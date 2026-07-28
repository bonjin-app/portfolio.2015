import { useEffect, useMemo, useState } from 'react'
import { filters, projects, strengths } from './data.js'

const navItems = [
  ['about', 'About'],
  ['work', 'Work'],
  ['contact', 'Contact'],
]

function ArrowIcon({ direction = 'right' }) {
  const transform = direction === 'left' ? 'rotate(180 12 12)' : undefined
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h14M14 7l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        transform={transform}
      />
    </svg>
  )
}

function Header() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sections = ['home', ...navItems.map(([id]) => id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -55%', threshold: [0.1, 0.3, 0.6] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const moveTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className="site-header">
      <button className="wordmark" onClick={() => moveTo('home')}>
        CT<span>®</span>
      </button>
      <nav className={open ? 'nav-list is-open' : 'nav-list'} aria-label="주요">
        {navItems.map(([id, label]) => (
          <button
            className={active === id ? 'active' : ''}
            key={id}
            onClick={() => moveTo(id)}
          >
            {label}
          </button>
        ))}
      </nav>
      <button
        className="menu-button"
        aria-expanded={open}
        aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      <a className="header-mail" href="mailto:tp.gigas@gmail.com">
        Let’s talk <ArrowIcon />
      </a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-kicker">
        <span>Portfolio archive</span>
        <span>Seoul, KR</span>
      </div>
      <div className="hero-title">
        <p>Creative</p>
        <h1>WEB DEVELOPER</h1>
      </div>
      <div className="hero-bottom">
        <div className="hero-photo-wrap">
          <img
            className="hero-photo"
            src="/legacy/images/my_.jpg"
            alt="최태호 프로필"
          />
          <span className="photo-index">2015 / 2026</span>
        </div>
        <p className="hero-copy">
          첫 포트폴리오를 오늘의 기술로 다시 엮었습니다. 오래된 작업도
          지우기보다 맥락과 함께 보존하는 것을 좋아합니다.
        </p>
        <a className="round-link" href="#work" aria-label="프로젝트 보기">
          <ArrowIcon />
        </a>
      </div>
      <div className="marquee" aria-hidden="true">
        <div>
          <span>UI DESIGN</span><i>✦</i><span>WEB DEVELOPMENT</span><i>✦</i>
          <span>INTERACTION</span><i>✦</i><span>UI DESIGN</span><i>✦</i>
          <span>WEB DEVELOPMENT</span><i>✦</i><span>INTERACTION</span><i>✦</i>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-label">
        <span>01</span>
        <p>About</p>
      </div>
      <div className="about-lead">
        <p className="eyebrow">A developer shaped by making</p>
        <h2>
          호기심으로 시작하고,
          <br />
          <em>완성으로 증명합니다.</em>
        </h2>
      </div>
      <div className="about-grid">
        <div className="about-note">
          <span className="asterisk">✳</span>
          <p>
            UX/UI를 처음 접한 2015년, 직접 기획하고 디자인하고 코드를
            작성하며 만든 기록입니다.
          </p>
        </div>
        <div className="about-story">
          <p>
            판매와 서비스 현장에서 쌓은 사람에 대한 이해를 웹이라는 도구에
            옮겼습니다. 화면을 예쁘게 만드는 데서 멈추지 않고, 사용자가
            망설이지 않는 흐름을 만드는 개발자를 지향합니다.
          </p>
          <dl>
            <div>
              <dt>2015.04 — 07</dt>
              <dd>스마트 웹 콘텐츠 과정 수료</dd>
            </div>
            <div>
              <dt>2015 — 2016</dt>
              <dd>컴퓨터공학 학위 과정</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="strength-list">
        {strengths.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index, onOpen }) {
  const action = project.gallery ? () => onOpen(project) : undefined
  const content = (
    <>
      <div className="project-media">
        <img src={project.cover} alt={`${project.title} 대표 화면`} loading="lazy" />
        <span className="project-number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="project-action">
          <ArrowIcon />
        </span>
      </div>
      <div className="project-meta">
        <p>
          {project.type} / {project.year}
        </p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul aria-label="사용 기술">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </>
  )

  return project.href ? (
    <a className="project-card" href={project.href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <button className="project-card" onClick={action}>
      {content}
    </button>
  )
}

function GalleryModal({ project, onClose }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') {
        setIndex((value) => (value + 1) % project.gallery.length)
      }
      if (event.key === 'ArrowLeft') {
        setIndex(
          (value) => (value - 1 + project.gallery.length) % project.gallery.length,
        )
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, project.gallery.length])

  const move = (amount) => {
    setIndex(
      (value) =>
        (value + amount + project.gallery.length) % project.gallery.length,
    )
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="gallery-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} 이미지 갤러리`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <span>{project.type}</span>
            <h2>{project.title}</h2>
          </div>
          <button onClick={onClose} aria-label="갤러리 닫기">
            ×
          </button>
        </div>
        <div className="gallery-stage">
          <button onClick={() => move(-1)} aria-label="이전 이미지">
            <ArrowIcon direction="left" />
          </button>
          <img
            src={project.gallery[index]}
            alt={`${project.title} 화면 ${index + 1}`}
          />
          <button onClick={() => move(1)} aria-label="다음 이미지">
            <ArrowIcon />
          </button>
        </div>
        <div className="gallery-count">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <i />
          <span>{String(project.gallery.length).padStart(2, '0')}</span>
        </div>
      </section>
    </div>
  )
}

function Work() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const visibleProjects = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((project) => project.type === filter),
    [filter],
  )

  return (
    <section className="section work-section" id="work">
      <div className="section-label light">
        <span>02</span>
        <p>Selected archive</p>
      </div>
      <div className="work-head">
        <h2>
          Work that marks
          <br />
          <em>the beginning.</em>
        </h2>
        <p>
          2015년의 웹, 앱, 백엔드 프로젝트를 원본 데모와 함께 보존했습니다.
        </p>
      </div>
      <div className="filter-list" aria-label="프로젝트 필터">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? 'active' : ''}
            onClick={() => setFilter(item)}
          >
            {item}
            <span>
              {item === 'All'
                ? projects.length
                : projects.filter((project) => project.type === item).length}
            </span>
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            project={project}
            index={index}
            key={project.title}
            onOpen={setSelected}
          />
        ))}
      </div>
      {selected && (
        <GalleryModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-top">
        <div className="section-label">
          <span>03</span>
          <p>Contact</p>
        </div>
        <p>새로운 이야기와 기회를 기다립니다.</p>
      </div>
      <h2>
        HAVE A PROJECT?
        <br />
        <a href="mailto:tp.gigas@gmail.com">
          LET’S TALK <ArrowIcon />
        </a>
      </h2>
      <footer>
        <p>© 2015—2026 Choi Taeho</p>
        <a href="/legacy/index.html" target="_blank" rel="noreferrer">
          Original 2015 site
        </a>
        <button
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
        >
          Back to top ↑
        </button>
      </footer>
    </section>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
    </>
  )
}
