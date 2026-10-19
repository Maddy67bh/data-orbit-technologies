import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import * as THREE from "three";

function SakuraScene() {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let renderer;
    let frame;
    let observer;

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#183d32");
      scene.fog = new THREE.FogExp2("#526b55", 0.009);

      const camera = new THREE.PerspectiveCamera(
        55, el.clientWidth / Math.max(el.clientHeight, 1), 0.1, 300
      );
      camera.position.set(0, 7, 22);
      camera.lookAt(0, 3, -12);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      el.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight("#fff0d9", "#193c30", 2.1));

      const sunLight = new THREE.DirectionalLight("#ffd29a", 3.2);
      sunLight.position.set(-12, 18, 12);
      scene.add(sunLight);

      const sun = new THREE.Mesh(
        new THREE.SphereGeometry(2.1, 32, 24),
        new THREE.MeshBasicMaterial({ color: "#ffe0ad" })
      );
      sun.position.set(1, 12, -48);
      scene.add(sun);

      // Layered mountain silhouettes
      function mountain(z, width, height, color, seed) {
        const points = [];
        const indices = [];
        const count = 100;

        for (let i = 0; i <= count; i++) {
          const x = (i / count - 0.5) * width;
          const peak =
            1.2 +
            Math.abs(Math.sin(i * 0.17 + seed)) * height * 0.65 +
            Math.abs(Math.sin(i * 0.047 + seed)) * height * 0.35;

          points.push(x, peak, z, x, -2, z);
        }

        for (let i = 0; i < count; i++) {
          const a = i * 2;
          indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
        geo.setIndex(indices);
        geo.computeVertexNormals();

        scene.add(new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({
            color, side: THREE.DoubleSide, roughness: 1, flatShading: true
          })
        ));
      }

      mountain(-44, 115, 15, "#9d9c88", 0.4);
      mountain(-34, 100, 11, "#607b69", 1.2);
      mountain(-25, 85, 7, "#294f3e", 2.4);

      // Reflective river
      const water = new THREE.Mesh(
        new THREE.PlaneGeometry(17, 85, 30, 80),
        new THREE.MeshStandardMaterial({
          color: "#568b82",
          metalness: 0.4,
          roughness: 0.24,
          transparent: true,
          opacity: 0.95,
          side: THREE.DoubleSide
        })
      );
      water.rotation.x = -Math.PI / 2;
      water.position.set(0, 0.05, -10);
      scene.add(water);

      // River banks
      const bankMat = new THREE.MeshStandardMaterial({ color: "#244634" });
      [-11.5, 11.5].forEach((x) => {
        const bank = new THREE.Mesh(
          new THREE.BoxGeometry(8, 1.4, 85), bankMat
        );
        bank.position.set(x, 0.05, -10);
        scene.add(bank);
      });

      // Sakura trees
      const bark = new THREE.MeshStandardMaterial({ color: "#49362e" });
      const blossomPalette = ["#f3b4c8", "#ffd9df", "#e9a0b8", "#f5c4cf"];

      function tree(x, z, scale) {
        const group = new THREE.Group();
        group.position.set(x, 0, z);
        group.scale.setScalar(scale);

        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.13, 0.27, 4.5, 7), bark
        );
        trunk.position.y = 2.25;
        group.add(trunk);

        for (let b = 0; b < 4; b++) {
          const branch = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.1, 2.1, 6), bark
          );
          branch.position.set(
            Math.sin(b * 2) * 0.6, 3.3 + (b % 2) * 0.4,
            Math.cos(b * 2) * 0.4
          );
          branch.rotation.z = Math.sin(b * 2) * 0.6;
          group.add(branch);
        }

        for (let i = 0; i < 16; i++) {
          const bloom = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.55 + Math.random() * 0.48, 1),
            new THREE.MeshStandardMaterial({
              color: blossomPalette[i % blossomPalette.length],
              roughness: 0.9, flatShading: true
            })
          );
          bloom.position.set(
            (Math.random() - 0.5) * 4.2,
            4 + Math.random() * 2,
            (Math.random() - 0.5) * 3.3
          );
          group.add(bloom);
        }

        scene.add(group);
      }

      for (let i = 0; i < 8; i++) {
        tree(-13 - Math.random() * 3, -24 + i * 4.2, 1.05 + Math.random() * 0.4);
        tree(13 + Math.random() * 3, -24 + i * 4.2, 1.05 + Math.random() * 0.4);
      }

      // Floating petals
      const petalCount = 600;
      const petalGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(petalCount * 3);
      const speeds = [];

      for (let i = 0; i < petalCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 44;
        positions[i * 3 + 1] = Math.random() * 19;
        positions[i * 3 + 2] = Math.random() * 48 - 32;
        speeds.push(0.3 + Math.random() * 0.7);
      }

      petalGeo.setAttribute(
        "position", new THREE.BufferAttribute(positions, 3)
      );

      scene.add(new THREE.Points(
        petalGeo,
        new THREE.PointsMaterial({
          color: "#ffd0de", size: 0.15, transparent: true,
          opacity: 0.9, sizeAttenuation: true
        })
      ));

      // Small floating wooden boat
      const boat = new THREE.Group();
      const hull = new THREE.Mesh(
        new THREE.BoxGeometry(1.35, 0.22, 3.1),
        new THREE.MeshStandardMaterial({ color: "#68462e", roughness: 0.8 })
      );
      boat.add(hull);

      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.13, 0.3),
        new THREE.MeshStandardMaterial({ color: "#c09a62" })
      );
      seat.position.y = 0.18;
      boat.add(seat);
      boat.position.set(1, 0.4, 6);
      scene.add(boat);

      const clock = new THREE.Clock();

      function resize() {
        if (!el.clientWidth || !el.clientHeight) return;
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(el.clientWidth, el.clientHeight);
      }

      observer = new ResizeObserver(resize);
      observer.observe(el);

      function animate() {
        frame = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        boat.position.x = 1 + Math.sin(t * 0.25) * 0.8;
        boat.position.y = 0.4 + Math.sin(t * 1.3) * 0.07;
        boat.rotation.z = Math.sin(t * 0.7) * 0.025;

        camera.position.x = Math.sin(t * 0.1) * 0.3;
        camera.lookAt(0, 3, -12);

        const attr = petalGeo.attributes.position;
        for (let i = 0; i < petalCount; i++) {
          let y = attr.getY(i) - speeds[i] * 0.018;
          let x = attr.getX(i) + Math.sin(t + i) * 0.004;

          if (y < -1) {
            y = 17 + Math.random() * 2;
            x = (Math.random() - 0.5) * 44;
          }

          attr.setY(i, y);
          attr.setX(i, x);
        }
        attr.needsUpdate = true;

        renderer.render(scene, camera);
      }

      animate();
    } catch (error) {
      console.error("Sakura scene error:", error);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return <div ref={host} className="sakura-scene" aria-hidden="true" />;
}

function App() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; font-family: Inter, Arial, sans-serif; background: #102b23; }
        .hero {
          position: relative; isolation: isolate; overflow: hidden;
          min-height: 100vh; display: flex; flex-direction: column;
          color: #fff7e9; background: #183d32;
        }
        .sakura-scene { position: absolute; inset: 0; z-index: -2; }
        .sakura-scene canvas { display: block; width: 100%; height: 100%; }
        .hero::after {
          content: ""; position: absolute; inset: 0; z-index: -1;
          background: linear-gradient(90deg, rgba(9,30,23,.78), rgba(9,30,23,.35) 58%, rgba(9,30,23,.08)),
                      linear-gradient(0deg, rgba(9,30,23,.5), transparent 55%);
          pointer-events: none;
        }
        .nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 26px 7%; gap: 24px; border-bottom: 1px solid rgba(255,239,205,.18);
        }
        .brand { display: flex; gap: 12px; align-items: center; color: #fff3d8; }
        .orbit-mark { width: 42px; height: 42px; flex-shrink: 0; }
        .brand-name { font-size: 14px; font-weight: 800; letter-spacing: 2px; }
        .brand-sub { margin-top: 4px; font-size: 9px; letter-spacing: 3.4px; color: #d8bd86; }
        .nav-label { color: #eee3ce; font-size: 12px; letter-spacing: 1.7px; text-transform: uppercase; }
        .hero-copy { width: min(760px, 86%); margin: auto 0; padding: 100px 0 135px 9%; }
        .eyebrow { color: #e5c58d; font-size: 11px; letter-spacing: 4px; font-weight: 700; }
        h1 {
          margin: 26px 0 22px; max-width: 740px;
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400; font-size: clamp(46px, 7.3vw, 94px);
          line-height: 1.02; letter-spacing: -2.8px;
        }
        h1 span { color: #e9c68d; font-style: italic; }
        .description { max-width: 510px; color: #e4e8dc; font-size: 16px; line-height: 1.9; }
        .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin-top: 34px; }
        .primary {
          display: inline-block; padding: 16px 25px; background: #d6b274;
          color: #172f25; text-decoration: none; font-size: 11px;
          font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
          transition: transform .25s, background .25s;
        }
        .primary:hover { transform: translateY(-3px); background: #f0d6a2; }
        .secondary { color: #fff4df; text-decoration: none; font-size: 12px; }
        .footnote { position: absolute; bottom: 26px; right: 7%; color: #e9ddc5; font-size: 10px; letter-spacing: 2px; }
        @media (max-width: 650px) {
          .nav { padding: 20px 6%; }
          .nav-label { display: none; }
          .hero-copy { padding: 95px 0 120px 7%; width: 93%; }
          h1 { letter-spacing: -1.4px; }
          .description { font-size: 14px; }
          .footnote { right: 6%; font-size: 8px; }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
        }
      `}</style>

      <main className="hero">
        <SakuraScene />

        <header className="nav">
          <div className="brand">
            <svg className="orbit-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="14" stroke="#D8B778" strokeWidth="1.5" />
              <ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(-34 24 24)" stroke="#F4E4C3" strokeWidth="1.2" />
              <circle cx="37" cy="12" r="3" fill="#E8C583" />
              <circle cx="24" cy="24" r="3" fill="#F7E5BD" />
            </svg>
            <div>
              <div className="brand-name">DATA ORBIT</div>
              <div className="brand-sub">TECHNOLOGIES</div>
            </div>
          </div>
          <div className="nav-label">Intelligence · Innovation · Impact</div>
        </header>

        <section className="hero-copy">
          <div className="eyebrow">STRATEGY · DESIGN · TECHNOLOGY</div>
          <h1>Build beyond<br />the <span>ordinary.</span></h1>
          <p className="description">
            We transform ambitious ideas into thoughtful digital experiences,
            intelligent products and modern technology solutions.
          </p>
          <div className="actions">
            <a className="primary" href="mailto:hello@dataorbit.tech">Start a Conversation ↗</a>
            <a className="secondary" href="#services" onClick={(e) => {
              e.preventDefault();
              document.querySelector(".eyebrow")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}>Explore our vision ↓</a>
          </div>
        </section>

        <div className="footnote">DESIGNED FOR WHAT'S NEXT</div>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
