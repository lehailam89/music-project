//Sider focus//
document.addEventListener("DOMContentLoaded", () => {
  const siderLinks = document.querySelectorAll(".sider .inner-menu ul li a");

  siderLinks.forEach(link => {
    // Kiểm tra URL hiện tại và thêm lớp active vào thẻ a tương ứng
    if (window.location.href.includes(link.getAttribute('href'))) {
      link.classList.add("active");
    }

    link.addEventListener("click", () => {
      siderLinks.forEach(link => link.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
//End Sider focus//

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const image = URL.createObjectURL(e.target.files[0]);
      uploadImagePreview.src = image;
    }
  });
}
// End Upload Image