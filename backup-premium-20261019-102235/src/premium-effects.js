export function initPremiumEffects() {
  if (typeof window === "undefined") return () => {};

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.documentElement.classList.add("premium-page-enter");

  const cardSelector =
    ".service-card, .project-card, .portfolio-card, [data-premium-card='true']";

  const cards = document.querySelectorAll(cardSelector);
  const revealCandidates = document.querySelectorAll(
    ".service-card, .project-card, .portfolio-card, section, .panel, [data-premium-reveal='true']"
  );

  revealCandidates.forEach((element, index) => {
    element.classList.add("premium-reveal");
    element.style.transitionDelay = `${Math.min(index % 6, 5) * 65}ms`;
  });

  let observer;

  if ("IntersectionObserver" in window && !reduceMotion) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealCandidates.forEach((element) => observer.observe(element));
  } else {
    revealCandidates.forEach((element) => element.classList.add("is-visible"));
  }

  function onPointerMove(event) {
    if (reduceMotion || event.pointerType === "touch") return;

    const card = event.target.closest(cardSelector);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.transform =
      `perspective(1000px) translateY(-6px) rotateX(${(0.5 - y) * 4}deg) rotateY(${(x - 0.5) * 4}deg)`;
  }

  function onPointerLeave(event) {
    const card = event.target.closest(cardSelector);
    if (card && !card.contains(event.relatedTarget)) {
      card.style.transform = "";
    }
  }

  function onClick(event) {
    const target = event.target.closest(
      "button, .btn, .service-card, .project-card, .portfolio-card, [role='button']"
    );

    if (!target || reduceMotion) return;

    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const ripple = document.createElement("span");
    ripple.className = "orbit-ripple";

    const size = Math.max(rect.width, rect.height) * 1.3;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    const previousPosition = getComputedStyle(target).position;
    if (previousPosition === "static") target.style.position = "relative";
    target.style.overflow = "hidden";
    target.appendChild(ripple);

    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  }

  document.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerout", onPointerLeave);
  document.addEventListener("click", onClick);

  return () => {
    observer?.disconnect();
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerout", onPointerLeave);
    document.removeEventListener("click", onClick);
  };
}