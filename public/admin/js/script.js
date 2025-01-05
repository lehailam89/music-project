document.addEventListener("DOMContentLoaded", () => {
    const siderLinks = document.querySelectorAll(".sider .inner-menu ul li a");
  
    siderLinks.forEach(link => {
      link.addEventListener("click", () => {
        siderLinks.forEach(link => link.classList.remove("active"));
        link.classList.add("active");
      });
    });
  });