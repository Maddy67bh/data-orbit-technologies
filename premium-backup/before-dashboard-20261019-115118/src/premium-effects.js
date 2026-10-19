export function initPremiumEffects() {
  if (typeof document === "undefined") return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("premium-page-enter");

  const revealSelector =
    ".service-card, .project-card, .portfolio-card, section, .panel, [data-premium-reveal='true']";

  const elements = [...document.querySelectorAll(revealSelector)];
  elements.forEach((el, i) => {
    el.classList.add("premium-reveal");
    el.style.transitionDelay = `${(i % 5) * 60}ms`;
  });

  let observer;
  if (!reduced && "IntersectionObserver" in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((el) => observer.observe(el));
  } else {
    elements.forEach((el) => el.classList.add("is-visible"));
  }

  function ripple(event) {
    if (reduced) return;

    const target = event.target.closest(
      "button, a, [role='button'], .service-card, .project-card, .portfolio-card"
    );
    if (!target) return;

    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const size = Math.max(rect.width, rect.height) * 1.2;
    const circle = document.createElement("span");
    circle.className = "orbit-ripple";
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${event.clientX - rect.left - size / 2}px`;
    circle.style.top = `${event.clientY - rect.top - size / 2}px`;

    if (getComputedStyle(target).position === "static") {
      target.style.position = "relative";
    }
    target.style.overflow = "hidden";
    target.appendChild(circle);
    circle.addEventListener("animationend", () => circle.remove(), { once: true });
  }

  document.addEventListener("click", ripple);

  return () => {
    observer?.disconnect();
    document.removeEventListener("click", ripple);
  };
}