import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./LiquidWater.css";

export default function LiquidWater() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer;
    let frame = 0;
    let observer;
    let disposed = false;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 2);
      camera.position.z = 1;

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uResolution;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
              mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
              f.y
            );
          }

          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            for (int i = 0; i < 4; i++) {
              value += noise(p) * amplitude;
              p = p * 2.02 + vec2(17.1, 9.2);
              amplitude *= 0.5;
            }
            return value;
          }

          void main() {
            vec2 uv = vUv;
            uv.x *= uResolution.x / max(uResolution.y, 1.0);

            float t = uTime * 0.20;
            vec2 flow = uv * 2.5;

            flow.x += sin(flow.y * 2.0 + t) * 0.12;
            flow.y += cos(flow.x * 1.6 - t * 0.7) * 0.10;

            float clouds = fbm(flow * 3.0 + vec2(t, -t * 0.65));
            float waves = sin(
              flow.x * 11.0 +
              flow.y * 7.0 +
              clouds * 5.0 +
              t * 1.5
            );

            float ripples = pow(1.0 - abs(waves), 13.0);
            float fineRipples = pow(
              1.0 - abs(sin(flow.y * 19.0 - flow.x * 5.0 + t * 1.2)),
              22.0
            );

            float caustics = smoothstep(0.58, 0.91, clouds);
            float edgeFade = smoothstep(0.0, 0.22, vUv.y)
                           * smoothstep(1.0, 0.72, vUv.y);

            float light = ripples * 0.32
                        + fineRipples * 0.17
                        + caustics * 0.09;

            vec3 deepWater = vec3(0.015, 0.15, 0.12);
            vec3 emeraldLight = vec3(0.12, 0.85, 0.58);
            vec3 color = mix(deepWater, emeraldLight, clamp(light * 2.0, 0.0, 1.0));

            float alpha = (0.035 + light * 0.48) * edgeFade;

            gl_FragColor = vec4(color, alpha);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `
      });

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power"
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      host.appendChild(renderer.domElement);

      const surface = new THREE.Mesh(geometry, material);
      scene.add(surface);

      const resize = () => {
        if (disposed) return;
        const width = Math.max(host.clientWidth, 1);
        const height = Math.max(host.clientHeight, 1);
        renderer.setSize(width, height, false);
        material.uniforms.uResolution.value.set(width, height);
      };

      observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();

      const clock = new THREE.Clock();

      const animate = () => {
        if (disposed) return;
        frame = requestAnimationFrame(animate);
        material.uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        observer?.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    } catch (error) {
      console.error("Liquid water effect could not start:", error);
      disposed = true;
      if (renderer) renderer.dispose();
    }
  }, []);

  return <div className="liquid-water-layer" ref={hostRef} aria-hidden="true" />;
}
