import LiquidWater from './LiquidWater.jsx';
import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./PremiumHero.css";

export default function PremiumHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer, scene, camera, orb, ringGroup, frame;
    let disposed = false;
    let resizeHandler;
    let mouseX = 0, mouseY = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power"
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.z = 6.4;

      scene.add(new THREE.AmbientLight(0x9effc0, 1.2));
      const key = new THREE.PointLight(0x65ff9d, 35, 15);
      key.position.set(3, 3, 4);
      scene.add(key);

      const rim = new THREE.PointLight(0x18864b, 40, 12);
      rim.position.set(-3, -2, 2);
      scene.add(rim);

      const sphereGeometry = new THREE.SphereGeometry(1.13, 72, 72);
      const sphereMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x237b4b,
        metalness: 0.18,
        roughness: 0.13,
        transmission: 0.24,
        thickness: 1.8,
        transparent: true,
        opacity: 0.93,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        emissive: 0x062d18,
        emissiveIntensity: 0.7
      });
      orb = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(orb);

      const inner = new THREE.Mesh(
        new THREE.SphereGeometry(0.72, 48, 48),
        new THREE.MeshStandardMaterial({
          color: 0x36d87d,
          roughness: 0.28,
          metalness: 0.22,
          emissive: 0x0a7d39,
          emissiveIntensity: 1.1,
          transparent: true,
          opacity: 0.62
        })
      );
      orb.add(inner);

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 40, 40),
        new THREE.MeshPhysicalMaterial({
          color: 0x9bffc0,
          roughness: 0.18,
          metalness: 0.3,
          emissive: 0x188c4b,
          emissiveIntensity: 0.65,
          transparent: true,
          opacity: 0.68
        })
      );
      orb.add(core);

      ringGroup = new THREE.Group();
      scene.add(ringGroup);

      const ringConfigs = [
        [1.48, 0.026, 0x9effc0, 0.75],
        [1.65, 0.012, 0x3dbb76, 0.65],
        [1.82, 0.009, 0xb6ffd0, 0.38]
      ];

      ringConfigs.forEach(([radius, tube, color, opacity], i) => {
        const geometry = new THREE.TorusGeometry(radius, tube, 8, 180);
        const material = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = 0.7 + i * 0.56;
        ring.rotation.y = 0.25 + i * 0.45;
        ring.userData.speed = (i % 2 ? -1 : 1) * (0.1 + i * 0.035);
        ringGroup.add(ring);

        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.035, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xc8ffdc })
        );
        ring.add(dot);
        dot.position.set(radius, 0, 0);
        dot.userData.orbitDot = true;
      });

      const particleCount = window.innerWidth < 700 ? 45 : 100;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          color: 0x9dffc0,
          size: 0.018,
          transparent: true,
          opacity: 0.48,
          sizeAttenuation: true
        })
      );
      scene.add(particles);

      resizeHandler = () => {
        if (!renderer || !camera) return;
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.position.z = width < 600 ? 7.7 : 6.4;
        camera.updateProjectionMatrix();
      };

      const onPointerMove = (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 0.22;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 0.16;
      };

      window.addEventListener("resize", resizeHandler);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      resizeHandler();

      const clock = new THREE.Clock();
      const animate = () => {
        if (disposed) return;
        frame = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        orb.rotation.y = t * 0.12 + (reduceMotion ? 0 : mouseX * 0.6);
        orb.rotation.x = Math.sin(t * 0.28) * 0.08 + (reduceMotion ? 0 : mouseY * 0.5);
        orb.position.y = reduceMotion ? 0 : Math.sin(t * 0.65) * 0.075;

        inner.rotation.x = t * 0.19;
        inner.rotation.y = -t * 0.16;
        core.scale.setScalar(1 + Math.sin(t * 1.2) * 0.045);

        ringGroup.children.forEach((ring) => {
          if (ring.userData.speed) {
            ring.rotation.z += reduceMotion ? 0 : ring.userData.speed * 0.006;
          }
        });

        particles.rotation.y = t * 0.012;
        particles.rotation.x = Math.sin(t * 0.1) * 0.04;

        renderer.render(scene, camera);
      };

      if (reduceMotion) {
        renderer.render(scene, camera);
      } else {
        animate();
      }

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resizeHandler);
        window.removeEventListener("pointermove", onPointerMove);
        scene.traverse((obj) => {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material?.dispose();
        });
        renderer.dispose();
      };
    } catch (error) {
      console.error("3D animation unavailable:", error);
      canvas.classList.add("orb-fallback");
    }
  }, []);

  return (
    <section className="premium-hero" id="home">
      <LiquidWater />
      <div className="hero-water" />
      <div className="water-line water-line-one" />
      <div className="water-line water-line-two" />

      <div className="premium-birds" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <svg key={i} className={`premium-bird bird-${i}`} viewBox="0 0 52 25">
            <path d="M1 5 Q14 1 26 17 Q38 1 51 5 Q38 0 26 11 Q14 0 1 5Z" />
          </svg>
        ))}
      </div>

      <div className="premium-copy">
        <div className="premium-kicker"><span /> DATA <i>·</i> AI <i>·</i> ENGINEERING</div>
        <h1>Turning Data<br />Into <em>Intelligence.</em></h1>
        <p>We transform complex data into clear insights, intelligent systems and meaningful digital experiences.</p>
        <div className="premium-actions">
          <a href="#contact" className="premium-button">Start a Conversation <span>↗</span></a>
          <a href="#services" className="premium-secondary">Explore Capabilities <span>↓</span></a>
        </div>
        <div className="premium-foot"><span className="status-dot" /> BUILDING WHAT COMES NEXT</div>
      </div>

      <div className="premium-orb-wrap">
        <div className="orb-aura" />
        <canvas ref={canvasRef} className="premium-orb-canvas" aria-label="Animated emerald glass orb" />
        <div className="orb-caption"><span /> INTELLIGENCE IN MOTION</div>
      </div>

      <div className="premium-index"><span>01</span><i /> DIGITAL INTELLIGENCE</div>
    </section>
  );
}

