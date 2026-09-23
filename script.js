// Dark mode toggle (theme itself is already applied by the inline head script,
// this just wires up the button and persists changes)
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Mobile nav toggle
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
navToggle?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// AP50-by-condition chart, shown as accuracy percentages (single series, one hue, sorted high to low)
const chartData = [
  { label: "Tinea", value: 82.8 },
  { label: "Scabies", value: 69.8 },
  { label: "Eczema", value: 67.4 },
  { label: "Warts", value: 65.8 },
  { label: "Melasma", value: 56.9 },
  { label: "Acne Vulgaris", value: 49.9 },
];

const chartEl = document.getElementById("chart");
if (chartEl) {
  chartEl.innerHTML = chartData
    .map(
      (d) => `
      <div class="bar-row">
        <span class="bar-label">${d.label}</span>
        <span class="bar-track">
          <span class="bar-fill" data-value="${d.value}"></span>
        </span>
        <span class="bar-value">${d.value.toFixed(1)}%</span>
      </div>`
    )
    .join("");

  // Set widths on load, independent of scroll position — the chart must
  // render correctly even if it's already in view or off-screen observers
  // never fire (e.g. embedded previews, no-scroll viewports).
  requestAnimationFrame(() => {
    chartEl.querySelectorAll(".bar-fill").forEach((bar) => {
      bar.style.width = `${bar.dataset.value}%`;
    });
  });
}

// Animated count-up for stat numbers (data-count="65.4" data-decimals="1" data-suffix="%")
function animateCount(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = "true";

  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";

  if (Number.isNaN(target)) return;

  el.textContent = `${(0).toFixed(decimals)}${suffix}`;

  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = target * eased;
    el.textContent = `${value.toFixed(decimals)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Hero stats are always above the fold, so count up shortly after load
document.querySelectorAll(".hero-stat [data-count]").forEach((el) => {
  setTimeout(() => animateCount(el), 300);
});

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");

function activateReveal(el) {
  el.classList.add("in");
  el.querySelectorAll("[data-count]").forEach(animateCount);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateReveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach(activateReveal);
}
