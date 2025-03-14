document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.previous');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    // Hiển thị slide đầu tiên
    showSlide(currentSlide);

    // Tự động chuyển slide sau mỗi 2 giây
    let autoSlideInterval = setInterval(nextSlide, 2500);

    function showSlide(index) {
        // Ẩn tất cả các slide
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');
        });

        // Hiển thị slide hiện tại
        slides[index].classList.add('active');

        // Thêm class 'prev' hoặc 'next' để tạo hiệu ứng trượt
        if (index > 0) {
            slides[index - 1].classList.add('prev');
        } else {
            slides[slides.length - 1].classList.add('prev');
        }

        if (index < slides.length - 1) {
            slides[index + 1].classList.add('next');
        } else {
            slides[0].classList.add('next');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Gắn sự kiện cho nút điều hướng
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide(); // Reset lại tự động chuyển slide khi người dùng nhấn nút
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide(); // Reset lại tự động chuyển slide khi người dùng nhấn nút
    });

    // Hàm reset tự động chuyển slide
    function resetAutoSlide() {
        clearInterval(autoSlideInterval); // Dừng interval hiện tại
        autoSlideInterval = setInterval(nextSlide, 2000); // Bắt đầu lại interval
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const face = document.querySelectorAll('.face');

    const checkVisibility = () => {
        const triggerOffset = 50; // Khoảng cách kích hoạt sớm hơn (px)

        face.forEach((image) => {
            const imageTop = image.getBoundingClientRect().top;
            const imageBottom = image.getBoundingClientRect().bottom;

            // Kiểm tra nếu nội dung gần đến viewport (sớm hơn 50px)
            if (imageTop < window.innerHeight - triggerOffset && imageBottom > triggerOffset && !image.classList.contains('visible')) {
                image.classList.add('visible');
            }
        });
    };

    // Kích hoạt khi cuộn trang
    window.addEventListener('scroll', checkVisibility);

    // Kiểm tra ngay khi trang được tải
    checkVisibility();
});