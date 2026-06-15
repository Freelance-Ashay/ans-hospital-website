const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const scrollLinks = document.querySelectorAll("[data-scroll-target]");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("data-scroll-target");
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;
    event.preventDefault();
    const stickyOffset = (siteHeader?.offsetHeight || 0) + 40;
    const top = target.getBoundingClientRect().top + window.scrollY - stickyOffset;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    nav?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section-reveal").forEach((section) => revealObserver.observe(section));

document.querySelectorAll(".appointment-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (status) {
      status.textContent = "Thank you. The ANS Hospital team will contact you shortly.";
    }
    form.reset();
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const currentId = entry.target.id;
    scrollLinks.forEach((link) => {
      link.setAttribute("aria-current", link.getAttribute("data-scroll-target") === currentId ? "page" : "false");
    });
  });
}, { threshold: 0.45 });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
