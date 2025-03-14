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

document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts-container');
    const pageNumbers = document.querySelector('.page-numbers');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const posts = document.querySelectorAll('.col-between .flex');
    const postsPerPage = 5; // Số bài viết hiển thị trên mỗi trang
    let currentPage = 1;

    // Lấy trang hiện tại từ URL (nếu có)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#page=')) {
        const page = parseInt(hash.split('=')[1], 10);
        if (!isNaN(page)) { // Sửa lỗi ở đây
            currentPage = page;
        }
    }

    // Hiển thị bài viết theo trang
    function showPosts(page) {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        posts.forEach((post, index) => {
            if (index >= start && index < end) {
                post.style.display = 'flex'; // Hiển thị bài viết
            } else {
                post.style.display = 'none'; // Ẩn bài viết
            }
        });
    }

    // Cập nhật phân trang
    function updatePagination() {
        const totalPages = Math.ceil(posts.length / postsPerPage);
        pageNumbers.innerHTML = ''; // Xóa nội dung cũ

        // Tạo các thẻ span cho từng trang
        for (let i = 1; i <= totalPages; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            span.classList.add('page-number');
            span.classList.add('hover-yellow');
            if (i === currentPage) {
                span.classList.add('active');
                span.classList.add('relative'); // Thêm class active cho trang hiện tại
            }
            span.addEventListener('click', () => {
                currentPage = i;
                updateURL(); // Cập nhật URL
                showPosts(currentPage);
                updatePagination();
            });
            pageNumbers.appendChild(span);
        }

        // Cập nhật trạng thái nút Previous và Next
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        // Thêm class 'disabled' để làm nhạt màu nút
        prevButton.classList.toggle('disabled', currentPage === 1);
        nextButton.classList.toggle('disabled', currentPage === totalPages);
    }

    // Cập nhật URL với trang hiện tại
    function updateURL() {
        window.location.hash = `post-page=${currentPage}`;
    }

    // Sự kiện nút Previous
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateURL(); // Cập nhật URL
            showPosts(currentPage);
            updatePagination();
        }
    });

    // Sự kiện nút Next
    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(posts.length / postsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateURL(); // Cập nhật URL
            showPosts(currentPage);
            updatePagination();
        }
    });

    // Hiển thị bài viết đầu tiên khi trang được tải
    showPosts(currentPage);
    updatePagination();
});