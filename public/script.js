document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('nav a').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});
