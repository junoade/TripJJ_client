<script setup></script>
<template>
    <div class="container mt-sm-5">
        <div class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl" :style="{
            backgroundImage:
                'url(https://source.unsplash.com/random/1)',
            backgroundSize: 'cover',
            height: '400px',
            position: 'relative', /* 추가: 상대적인 위치 설정 */
            color: 'white' /* 추가: 텍스트 색상 설정 */
        }" loading="lazy">
            <span class="mask bg-gradient-dark"></span>
            <div class="cover">
                <div class="row">
                    <div class="col-lg-6 ms-lg-5">                        
                        <h1 class="mb-4">한국, <br>다채로운 경험이 기다리는 곳!</h1>                    
                        <p class="lead text-white opacity-8">                            
                            여행으로 펼쳐지는 다채로운 이야기가 기다리고 있어요!<br>
                            색다른 경험과 추억이 가득한 여행을 지금 떠나봐요!<br>
                            신비로운 제주도의 자연과 문화, 그리고 맛있는 음식들!<br>
                            즐거움과 모험이 어우러진 여행, 지금 시작하세요.
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