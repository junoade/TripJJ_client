<script setup>

</script>

<template>
    <!-- 여행-->
    <div class="searchType topBotomBordersIn">
        <a>관광지</a>
        <a>지역 맛집</a>
        <a>숙박 / 호캉스</a>
        <a>축제 공연</a>
        <a>여행 코스</a>
        <a>문화 시설</a>
        <a>레포츠</a>
    </div>
</template>

<style scoped>
/* 관광 정보 유형 관련 css */
div.searchType {
    font-family: Raleway;
    margin: 0 auto;
    padding: 3em 3em;
    text-align: center;
}

div.searchType a {
    color: black;
    text-decoration: none;
    font: 20px Raleway;
    margin: 0px 10px;
    padding: 10px 10px;
    position: relative;
    z-index: 0;
    cursor: pointer;
}

div.topBotomBordersIn a:before,
div.topBotomBordersIn a:after {
    position: absolute;
    left: 0px;
    width: 100%;
    height: 2px;
    background: black;
    content: "";
    opacity: 0;
    transition: all 0.3s;
}

div.topBotomBordersIn a:before {
    top: 0px;
    transform: translateY(-10px);
}

div.topBotomBordersIn a:after {
    bottom: 0px;
    transform: translateY(10px);
}

div.topBotomBordersIn a:hover:before,
div.topBotomBordersIn a:hover:after {
    opacity: 1;
    transform: translateY(0px);
}
</style>