import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initPremiumEffects } from "./premium-effects.js";
import "./premium-effects.css";
import SakuraHero from "./SakuraHero.jsx";
import DetailPage from "./DetailPage.jsx";
import "./index.css";

const detailRoutes = [
  "/portfolio/business-intelligence",
  "/portfolio/predictive-insights",
  "/portfolio/intelligent-experiences",
  "/services/data-analytics",
  "/services/artificial-intelligence",
  "/services/digital-experiences"
];

const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
const isDetailPage = detailRoutes.includes(pathname);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isDetailPage ? <DetailPage /> : <SakuraHero />}
  </StrictMode>
);

if (!isDetailPage && typeof document !== "undefined") {
  const startEffects = () => initPremiumEffects();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startEffects, { once: true });
  } else {
    startEffects();
  }
}
