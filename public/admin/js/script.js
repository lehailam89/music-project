document.addEventListener("DOMContentLoaded", () => {
  const siderLinks = document.querySelectorAll(".sider .inner-menu ul li a");

  siderLinks.forEach(link => {
    // Kiểm tra URL hiện tại và thêm lớp active vào thẻ a tương ứng
    if (link.href === window.location.href) {
      link.classList.add("active");
    }

    link.addEventListener("click", () => {
      siderLinks.forEach(link => link.classList.remove("active"));
      link.classList.add("active");
    });
  });
});