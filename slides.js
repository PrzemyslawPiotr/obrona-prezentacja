(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const progress = document.getElementById("progress");
  const counter = document.getElementById("counter");
  let current = 0;

  function show(index) {
    if (index < 0 || index >= slides.length) return;
    slides[current].classList.remove("active");
    current = index;
    slides[current].classList.add("active");
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    counter.textContent = `${current + 1} / ${slides.length}`;
    history.replaceState(null, "", `#${current + 1}`);
  }

  function next() {
    show(Math.min(current + 1, slides.length - 1));
  }

  function prev() {
    show(Math.max(current - 1, 0));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      e.preventDefault();
      show(0);
    } else if (e.key === "End") {
      e.preventDefault();
      show(slides.length - 1);
    } else if (e.key === "f" || e.key === "F") {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }
  });

  document.addEventListener("click", (e) => {
    const x = e.clientX;
    if (x > window.innerWidth * 0.65) next();
    else if (x < window.innerWidth * 0.35) prev();
  });

  const hash = parseInt(location.hash.replace("#", ""), 10);
  if (hash >= 1 && hash <= slides.length) {
    show(hash - 1);
  } else {
    show(0);
  }
})();
