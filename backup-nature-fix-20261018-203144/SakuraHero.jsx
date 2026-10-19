import { useState } from "react";
import "./SakuraHero.css";

const landscape =
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=90";

const services = [
  {
    number: "01",
    title: "Data & Analytics",
    text: "Transform complex information into clear insights that support smarter decisions.",
    tag: "INTELLIGENCE"
  },
  {
    number: "02",
    title: "Artificial Intelligence",
    text: "Explore practical AI and machine learning solutions built around real challenges.",
    tag: "INNOVATION"
  },
  {
    number: "03",
    title: "Digital Experiences",
    text: "Create modern, responsive digital experiences with thoughtful design and purpose.",
    tag: "EXPERIENCE"
  }
];

const projects = [
  {
    category: "DATA ANALYTICS",
    title: "Business Intelligence",
    text: "Turn business performance data into meaningful visual stories.",
    number: "01"
  },
  {
    category: "MACHINE LEARNING",
    title: "Predictive Insights",
    text: "Use patterns in data to support more informed future decisions.",
    number: "02"
  },
  {
    category: "DIGITAL PRODUCTS",
    title: "Intelligent Experiences",
    text: "Connect elegant interfaces with useful, intelligent capabilities.",
    number: "03"
  }
];

function OrbitMark() {
  return (
    <svg className="orbit-mark" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="13" />
      <ellipse
        cx="24"
        cy="24"
        rx="22"
        ry="8"
        transform="rotate(-35 24 24)"
      />
      <circle className="orbit-mark-dot" cx="38" cy="11" r="3" />
    </svg>
  );
}

export default function SakuraHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <section className="hero" id="home">
        {!imageFailed && (
          <img
            className="hero-image"
            src={landscape}
            alt="Atmospheric Japanese-inspired landscape"
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
        )}

        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <header className="site-header">
          <a className="brand" href="#home" onClick={closeMenu}>
            <OrbitMark />
            <span className="brand-copy">
              <strong>DATA ORBIT</strong>
              <small>TECHNOLOGIES</small>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>

          <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#work" onClick={closeMenu}>Our Approach</a>
            <a className="nav-contact" href="#contact" onClick={closeMenu}>
              Let's Connect <span>↗</span>
            </a>
          </nav>
        </header>

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-rule" />
              DATA · DESIGN · INTELLIGENCE
            </p>

            <h1>
              A new orbit
              <br />
              for <em>what's possible.</em>
            </h1>

            <p className="hero-description">
              Bringing technology, data and thoughtful design together
              to create meaningful digital possibilities.
            </p>

            <div className="hero-buttons">
              <a className="button button-gold" href="#services">
                EXPLORE OUR SERVICES <span>↗</span>
              </a>
              <a className="button-text" href="#about">
                Discover our vision <span>↓</span>
              </a>
            </div>
          </div>

          <div className="hero-stamp" aria-hidden="true">
            <span className="stamp-orbit">✳</span>
            <span>THINK</span>
            <span>BEYOND</span>
            <span className="stamp-small">THE EXPECTED</span>
          </div>
        </div>

        <div className="hero-bottom">
          <span>INNOVATION WITH INTENTION</span>
          <span className="hero-bottom-center">01 — A DIFFERENT PERSPECTIVE</span>
          <a href="#about">SCROLL TO EXPLORE ↓</a>
        </div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="section-kicker">
          <span className="gold-dot" /> OUR PERSPECTIVE
        </div>

        <div className="intro-grid">
          <h2>
            Technology should do
            <br />
            more than <em>look good.</em>
          </h2>

          <div className="intro-copy">
            <p>
              It should solve meaningful problems, uncover new opportunities
              and make complicated things feel simpler.
            </p>
            <p>
              Data Orbit Technologies explores the intersection of data,
              intelligent systems and digital experiences—with curiosity,
              clarity and purpose.
            </p>
            <a className="underlined-link" href="#services">
              Discover what we do <span>↗</span>
            </a>
          </div>
        </div>

        <div className="principles">
          <div><span>01</span><strong>Clarity over complexity</strong></div>
          <div><span>02</span><strong>Purpose before features</strong></div>
          <div><span>03</span><strong>Progress through curiosity</strong></div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              <span className="gold-dot" /> WHAT WE EXPLORE
            </div>
            <h2>Ideas into <em>possibility.</em></h2>
          </div>
          <p>
            A considered approach to data, technology and the digital
            experiences people interact with every day.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="card-topline">
                <span>{service.number}</span>
                <span className="card-arrow">↗</span>
              </div>
              <div className="service-symbol" aria-hidden="true">
                {service.number === "01" ? "◉" : service.number === "02" ? "✳" : "⌘"}
              </div>
              <p className="card-tag">{service.tag}</p>
              <h3>{service.title}</h3>
              <p className="card-description">{service.text}</p>
              <a href="#contact" className="card-link">
                Explore possibilities <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="approach section-pad" id="work">
        <div className="approach-visual">
          <div className="approach-orbit orbit-one" />
          <div className="approach-orbit orbit-two" />
          <div className="approach-core">
            <OrbitMark />
            <span>DATA ORBIT</span>
            <small>THINK DIFFERENTLY</small>
          </div>
          <span className="visual-label visual-label-one">DATA</span>
          <span className="visual-label visual-label-two">IDEAS</span>
          <span className="visual-label visual-label-three">IMPACT</span>
        </div>

        <div className="approach-copy">
          <div className="section-kicker">
            <span className="gold-dot" /> THE WAY WE THINK
          </div>
          <h2>
            Curious minds.
            <br />
            <em>Considered solutions.</em>
          </h2>
          <p>
            Great digital work starts with the right questions. We focus
            on understanding the challenge, finding a thoughtful direction
            and building toward a useful outcome.
          </p>
          <div className="approach-list">
            <div><span>01</span><p><strong>Understand</strong> — Start with the real challenge.</p></div>
            <div><span>02</span><p><strong>Explore</strong> — Find the right direction.</p></div>
            <div><span>03</span><p><strong>Create</strong> — Turn ideas into experiences.</p></div>
          </div>
        </div>
      </section>

      <section className="work-section section-pad">
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              <span className="gold-dot" /> AREAS OF POSSIBILITY
            </div>
            <h2>Built around <em>real needs.</em></h2>
          </div>
          <p>
            Illustrative areas where data, machine learning and digital
            design can create value.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className={`project-art project-art-${project.number}`}>
                <span className="project-index">{project.number}</span>
                <div className="art-orbit art-orbit-a" />
                <div className="art-orbit art-orbit-b" />
                <div className="art-center">{project.number === "01" ? "↗" : project.number === "02" ? "✳" : "◈"}</div>
                <span className="art-caption">DATA ORBIT / CONCEPT</span>
              </div>
              <div className="project-info">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <span>{project.text}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="portfolio-note">
          These are concept areas, not claims of completed client projects.
        </p>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <p className="section-kicker">
            <span className="gold-dot" /> YOUR NEXT CHAPTER
          </p>
          <h2>
            The future doesn't
            <br />
            build <em>itself.</em>
          </h2>
          <p>
            Have an idea, a challenge or a possibility worth exploring?
            Let's start with a conversation.
          </p>
          <a className="button button-gold" href="mailto:">
            START A CONVERSATION <span>↗</span>
          </a>
          <small className="contact-note">
            Add your business email to the contact button before publishing.
          </small>
        </div>
        <div className="contact-decoration" aria-hidden="true">
          <OrbitMark />
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <OrbitMark />
          <span className="brand-copy">
            <strong>DATA ORBIT</strong>
            <small>TECHNOLOGIES</small>
          </span>
        </a>
        <p>Thoughtful technology. Meaningful possibilities.</p>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>
        <span className="copyright">
          © {new Date().getFullYear()} DATA ORBIT TECHNOLOGIES
        </span>
      </footer>
    </main>
  );
}
