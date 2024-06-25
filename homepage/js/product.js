document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.querySelectorAll('#content .product_list li');
    let touchStartTime = 0;
    let isScrolling = false;
    let activeItem = null; // 변수 추가: 현재 활성화된 항목

    function toggleDetail(item) {
        const detail = item.querySelector('.detail');
        if (activeItem !== item) {
            // 현재 활성화된 항목이 아닌 경우만 visible 클래스 추가
            if (activeItem) {
                activeItem.querySelector('.detail').classList.remove('visible');
            }
            detail.classList.add('visible');
            activeItem = item;
        } else {
            // 이미 활성화된 항목인 경우 visible 클래스 제거
            detail.classList.remove('visible');
            activeItem = null;
        }
    }

    productItems.forEach(item => {
        item.addEventListener('click', function() {
            if (!isScrolling) {
                toggleDetail(this);
            }
        });

        item.addEventListener('touchstart', function(event) {
            if (!isScrolling) {
                touchStartTime = Date.now();
            }
        });

        item.addEventListener('touchend', function(event) {
            if (!isScrolling) {
                const touchEndTime = Date.now();
                const touchDuration = touchEndTime - touchStartTime;

                if (touchDuration >= 200) {
                    toggleDetail(this);
                }
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('#content .product_list li')) {
            if (activeItem) {
                activeItem.querySelector('.detail').classList.remove('visible');
                activeItem = null;
            }
        }
    });

    document.addEventListener('touchstart', function(event) {
        if (!event.target.closest('#content .product_list li')) {
            if (activeItem) {
                activeItem.querySelector('.detail').classList.remove('visible');
                activeItem = null;
            }
        }
    });

    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        isScrolling = true;
        
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
        }, 200);

        // 스크롤 중에는 활성화된 항목의 visible 클래스 제거
        if (activeItem) {
            activeItem.querySelector('.detail').classList.remove('visible');
            activeItem = null;
        }
    });
});
