<script setup></script>
<template>
    <div class="container mt-sm-5">
        <div class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl" :style="{
            backgroundImage:
                'url(https://wallpaperaccess.com/full/2146222.jpg)',
            backgroundSize: 'cover',
            height: '400px',
            position: 'relative', /* 추가: 상대적인 위치 설정 */
            color: 'white' /* 추가: 텍스트 색상 설정 */
        }" loading="lazy">
            <span class="mask bg-gradient-dark"></span>
            <div class="cover">
                <div class="row">
                    <div class="col-lg-6 ms-lg-5">
                        <h4 class="mb-3">한국, 아름다운 자연과 독특한 문화가 어우러진 곳</h4>
                        <h1 class="mb-4">풍부한 역사와 전통</h1>
                        <h1 class="mb-4">그리고 현대의 조화로운 만남</h1>                
                        <p class="lead text-white opacity-8">
                            사계절의 아름다운 풍경이 펼쳐지는 한국, <br>여행으로 펼쳐지는 다채로운 이야기가 기다리고 있어요!<br>
                            색다른 경험과 추억이 가득한 여행을 지금 떠나봐요!
                        </p>
                        <a href="#" class="text-white icon-move-right"> 자세히 알아보기</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* 추가: 텍스트에 그림자 효과 */
h4, h1, p, a {
    text-shadow: 4px 4px 5px rgba(0, 0, 0, 0.8);
}
</style>