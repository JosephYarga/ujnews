// star fields
function scatterStars(id, count) {
  const el = document.getElementById(id);
  if (!el) return;
  let html = "";
  for (let i = 0; i < count; i++) {
    const top = Math.random() * 100,
      left = Math.random() * 100,
      delay = (Math.random() * 3.6).toFixed(2);
    html += `<span style="top:${top}%;left:${left}%;animation-delay:${delay}s;"></span>`;
  }
  el.innerHTML = html;
}
scatterStars("heroStars", 60);
scatterStars("tlStars", 40);

// scroll reveal
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.14 },
);
document
  .querySelectorAll(".reveal,.reveal-stagger,.pull")
  .forEach((el) => io.observe(el));

// count-up stats
const counters = document.querySelectorAll(".stat-num");
const cio = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target,
        target = parseInt(el.dataset.count, 10),
        suffix = el.dataset.suffix || "";
      const dur = 1400,
        start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent =
          Math.round(target * eased).toLocaleString("fr-FR") + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  },
  { threshold: 0.5 },
);
counters.forEach((el) => cio.observe(el));
