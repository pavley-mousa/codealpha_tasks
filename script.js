// القائمة الجانبية للشاشات الصغيرة
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// إغلاق القائمة عند الضغط على أي رابط
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// تأثير خلفية وظل النافبار عند التمرير
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(11, 17, 32, 0.95)";
    navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(11, 17, 32, 0.85)";
    navbar.style.boxShadow = "none";
  }
});