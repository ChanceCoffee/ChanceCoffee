document.addEventListener('DOMContentLoaded', () => {
    const productItems = document.querySelectorAll('#content .product_list li');
    let touchStartTime = 0;
    let isScrolling = false;
    let activeItem = null; // 현재 활성화된 항목

    // function toggleDetail(item) {
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

    // 스크롤 이벤트 리스너 추가. 스크롤이 멈출때만 터치가 작동하게 하려고.
    // 간혹가다가 사진이미지의 내용이 두개가 동시에 뜨는 문제도 해결하려 했으나 완벽하게 해결되진 않음.
    document.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(isScrollingTimeout);
        var isScrollingTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150); // 150ms 이후에 스크롤이 멈춘 것으로 간주
    });

    productItems.forEach(item => {
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


    // addEventListener의 click은 마우스로 클릭했을때 동작하는 거라서 모바일에선 작동하지 않아서 코드 삭제
    // document.addEventListener('click', function(event) {
    //     if (!event.target.closest('#content .product_list li')) {
    //         if (activeItem) {
    //             activeItem.querySelector('.detail').classList.remove('visible');
    //             activeItem = null;
    //         }
    //     }
    // });

    // 모바일에서 터치했을때 동작하게 하려면 click이 아닌 touchstart를 사용해야 한다. 
    document.addEventListener('touchstart', function(event) {
        if (!event.target.closest('#content .product_list li')) {
            if (activeItem) {
                activeItem.querySelector('.detail').classList.remove('visible');
                activeItem = null;
            }
        }
    });
});
    