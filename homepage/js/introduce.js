// 이미지 경로 목록
const images1 = [
    './images/newStore/store1_2.webp',
    './images/newStore/store2_2.jpeg'
];

const images2 = [
    './images/newStore/store1_1.webp',
    './images/newStore/store2_1.jpeg'
];

const storeName = [
    "찬스커피 영등포 지점",
    "찬스커피 연남 지점"
];

// 현재 표시되는 이미지의 인덱스
let currentIndex = 0;

// 이미지 요소 선택
const imgElement1 = document.querySelector('.newStoreImg1 img');
const imgElement2 = document.querySelector('.newStoreImg2 img');
// 사진 밑 지점명 p태그 선택
const storeNameElement = document.querySelector('.storeName p');

// 이미지 교체 함수
function changeImage() {
    // 다음 이미지 인덱스 계산
    currentIndex = (currentIndex + 1) % images1.length;

    // 이미지 요소의 src 속성 변경
    imgElement1.src = images1[currentIndex];
    imgElement2.src = images2[currentIndex];
    // 매장명 들어갈 p태그 내용 변경
    storeNameElement.textContent = storeName[currentIndex];
}

// 2초 간격으로 이미지 교체
setInterval(changeImage, 2000);