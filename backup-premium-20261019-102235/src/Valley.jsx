import React, { useState } from "react";
import "./valley.css";

const petals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 9) % 100}%`,
  delay: `${(i % 9) * -1.7}s`,
  duration: `${12 + (i % 7) * 2}s`,
  size: `${7 + (i % 4) * 3}px`,
}));

export default function Valley() {
  const [night, setNight] = useState(false);

  return (
    <section
      className={`nature-world${night ? " nature-night" : ""}`}
      aria-label="Immersive nature experience"
    >
      <div className="nature-image" />
      <div className="nature-shade" />
      <div className="nature-grain" />

      <div className="nature-petals" aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal.id}
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: `calc(${petal.size} * .72)`,
            }}
          />
        ))}
      </div>

      <header className="nature-top">
        <a className="nature-brand" href="#nature-home" aria-label="Data Orbit home">
          <span className="nature-brand-mark">
            <span />
            <span />
            <span />
          </span>
          <span className="nature-brand-copy">
            <strong>DATA ORBIT</strong>
            <small>TECHNOLOGIES</small>
          </span>
        </a>

        <div className="nature-edition">
          <span>FIELD NOTES — 001</span>
          <span>THE NATURAL WORLD</span>
        </div>
      </header>

      <main className="nature-copy" id="nature-home">
        <div className="nature-eyebrow">
          <span className="nature-eyebrow-line" />
          <span>IMMERSIVE NATURE STUDY</span>
        </div>

        <h1>
          A quieter
          <br />
          kind of <em>wonder.</em>
        </h1>

        <p>
          Beyond the noise, a river winds through the mountains.
          Blossom, water and light — in their own time.
        </p>

        <button
          className="nature-cta"
          type="button"
          onClick={() => setNight((value) => !value)}
          aria-pressed={night}
        >
          <span>{night ? "RETURN TO DAYLIGHT" : "EXPERIENCE THE STILLNESS"}</span>
          <span className="nature-cta-arrow" aria-hidden="true">
            ↗
          </span>
        </button>

        <div className="nature-caption">
          <span>{night ? "AFTER HOURS" : "A MOMENT OUTSIDE TIME"}</span>
          <span className="nature-caption-dot" />
          <span>{night ? "MOONLIT EDITION" : "SPRING EDITION"}</span>
        </div>
      </main>

      <div className="nature-scroll" aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <i />
      </div>

      <footer className="nature-bottom">
        <div className="nature-location">
          <span className="nature-location-symbol">✳</span>
          <div>
            <strong>SAKURA RIVER VALLEY</strong>
            <span>A STUDY IN STILLNESS</span>
          </div>
        </div>

        <div className="nature-bottom-note">
          <span>LESS NOISE.</span>
          <span>MORE NATURE.</span>
        </div>

        <span className="nature-index">01 / 04</span>
      </footer>
    </section>
  );
}
