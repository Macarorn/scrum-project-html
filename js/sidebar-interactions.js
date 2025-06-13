document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".sidebar nav");
  const indicator = nav.querySelector(".indicator");
  const links = Array.from(nav.querySelectorAll("ul li a"));

  // determina el índice activo (de localStorage o 0)
  let idx = parseInt(localStorage.getItem("sidebar-active"), 10);
  if (isNaN(idx) || idx < 0 || idx >= links.length) idx = 0;
  let activeLink = links[idx];
  activeLink.classList.add("active");

  // mueve la caja al centro del <li> dado
  function moveIndicator(link) {
    const li = link.parentElement;
    const top = li.offsetTop + li.offsetHeight / 2 - indicator.offsetHeight / 2;
    indicator.style.transform = `translateX(-50%) translateY(${top}px)`;
  }

  moveIndicator(activeLink);

  links.forEach((link, i) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      localStorage.setItem("sidebar-active", i);
      activeLink = link;
      moveIndicator(link);
    });
    link.addEventListener("mouseenter", () => moveIndicator(link));
  });

  nav.addEventListener("mouseleave", () => moveIndicator(activeLink));
});
