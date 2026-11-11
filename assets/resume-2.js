
(function observeMobileCompetencies(){
  const mobile = matchMedia('(max-width:760px)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const enter = mobile.matches && !reduced.matches && entry.isIntersecting;
      entry.target.classList.toggle('mobile-content-enter', enter);
    }
  }, {threshold:0});
  document.querySelectorAll('.competency-item').forEach(item => observer.observe(item));
})();
