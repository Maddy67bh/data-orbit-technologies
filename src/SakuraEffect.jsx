import React from "react";

export default function SakuraEffect() {
  const petals = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    delay: `${(i % 12) * -1.7}s`,
    duration: `${9 + (i % 8)}s`,
    size: `${9 + (i % 5) * 3}px`,
  }));

  return (
    <div className="sakura-layer" aria-hidden="true">
      <div className="sakura-glow" />

      <div className="sakura-branch sakura-branch-one">
        🌸
      </div>

      <div className="sakura-branch sakura-branch-two">
        🌸
      </div>

      {petals.map((petal) => (
        <span
          key={petal.id}
          className="sakura-petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size,
          }}
        />
      ))}
    </div>
  );
}
