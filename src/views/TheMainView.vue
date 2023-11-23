<script setup>
import { onMounted, onUnmounted, ref } from "vue";

// import NavbarDefault from "@/components/layout/NavbarDefault.vue"
import Carousel from "@/views/TheCarouselView.vue";
import IntroducingAround from "@/components/layout/TheIntroductionView.vue";
import RandomIntroductingAround from "@/components/layout/TheRandomIntroductionView.vue"
import Footer from "@/components/layout/Footer.vue";
import AttractionType from "@/views/TheAttractionTypeView.vue";
import StatisticsInfo from "@/components/layout/StatisticsInfo.vue";
import SearchBar from "@/components/layout/SearchBar.vue";
import SearchNearListVue from "@/components/search/SearchNearList.vue";


const sampleNearPlaces = ref(
    [{"contentId":126508,"title":"경복궁","addr1":"서울특별시 종로구 사직로 161","latitude":37.57882224,"longitude":126.976993,"contentTypeId":12,"readCount":113917,"addr2":"","firstImage":"http://tong.visitkorea.or.kr/cms/resource/23/2678623_image2_1.jpg","firstImage2":"http://tong.visitkorea.or.kr/cms/resource/23/2678623_image3_1.jpg","overview":null},{"contentId":126512,"title":"광화문","addr1":"서울특별시 종로구 사직로 161","latitude":37.57607255,"longitude":126.9768042,"contentTypeId":12,"readCount":114233,"addr2":"","firstImage":"http://tong.visitkorea.or.kr/cms/resource/81/1075281_image2_1.jpg","firstImage2":"http://tong.visitkorea.or.kr/cms/resource/81/1075281_image3_1.jpg","overview":null},{"contentId":141661,"title":"수문장 교대의식","addr1":"서울특별시 종로구 사직로 161","latitude":37.58018596,"longitude":126.9767236,"contentTypeId":15,"readCount":25682,"addr2":"(세종로)","firstImage":"http://tong.visitkorea.or.kr/cms/resource/96/868696_image2_1.jpg","firstImage2":"http://tong.visitkorea.or.kr/cms/resource/96/868696_image3_1.jpg","overview":null},{"contentId":1604652,"title":"명성황후 조난지","addr1":"서울특별시 종로구 사직로 161","latitude":37.57741686,"longitude":126.9779874,"contentTypeId":12,"readCount":21294,"addr2":"(세종로)","firstImage":"http://tong.visitkorea.or.kr/cms/resource/64/1568164_image2_1.jpg","firstImage2":"http://tong.visitkorea.or.kr/cms/resource/64/1568164_image3_1.jpg","overview":null},{"contentId":1998564,"title":"궁중문화축전","addr1":"서울특별시 종로구 사직로 161","latitude":37.57882224,"longitude":126.976993,"contentTypeId":15,"readCount":65522,"addr2":"","firstImage":"http://tong.visitkorea.or.kr/cms/resource/07/2718907_image2_1.png","firstImage2":"http://tong.visitkorea.or.kr/cms/resource/07/2718907_image2_1.png","overview":null},{"contentId":2601364,"title":"경복궁 수라간 시식공감","addr1":"서울특별시 종로구 사직로 161","latitude":37.58162465,"longitude":126.9748959,"contentTypeId":15,"readCount":45,"addr2":"","firstImage":"http://tong.visitkorea.or.kr/cms/resource/65/2821665_image2_1.png","firstImage2":"http://tong.visitkorea.or.kr/cms/resource/65/2821665_image3_1.png","overview":null},{"contentId":2615461,"title":"2022년 경복궁 생과방","addr1":"서울특별시 종로구 사직로 161 경복궁","latitude":37.57889445,"longitude":126.9770319,"contentTypeId":15,"readCount":0,"addr2":"","firstImage":"http://tong.visitkorea.or.kr/cms/resource/06/2844306_image2_1.jpg","firstImage2":"http://tong.visitkorea.or.kr/cms/resource/06/2844306_image3_1.jpg","overview":null},{"contentId":2648460,"title":"경복궁 별빛야행","addr1":"서울특별시 종로구 사직로 161","latitude":37.57889445,"longitude":126.9770319,"contentTypeId":15,"readCount":1,"addr2":"","firstImage":"http://tong.visitkorea.or.kr/cms/resource/80/2847580_image2_1.jpg","firstImage2":"http://tong.visitkorea.or.kr/cms/resource/80/2847580_image3_1.jpg","overview":null},{"contentId":2661632,"title":"세계유산축전","addr1":"서울특별시 종로구 사직로 161","latitude":37.57889445,"longitude":126.9770319,"contentTypeId":15,"readCount":2,"addr2":"(세종로)","firstImage":"http://tong.visitkorea.or.kr/cms/resource/71/2843571_image2_1.jpg","firstImage2":"http://tong.visitkorea.or.kr/cms/resource/71/2843571_image3_1.jpg","overview":null}])

</script>

<template>
    <main>
        <Carousel />
        <!-- 여행-->
        <AttractionType />

        <!-- 여행지 통계 정보-->
        <StatisticsInfo />
        <!-- 여행 검색 -->
        <SearchBar />
        <!-- Marketing messaging and featurettes
                  ================================================== -->
        <!-- Wrap the rest of the page in another container to center all the content. -->

        <div class="container">
            <hr class="featurette-divider">
            <IntroducingAround />
        </div>

        <div class="container marketing">
            <!-- START THE FEATURETTES -->
            <hr class="featurette-divider">

            <SearchNearListVue
                :nearPlaces="sampleNearPlaces">         
            </SearchNearListVue>

            <hr class="featurette-divider">

            <RandomIntroductingAround />
            <!-- /END THE FEATURETTES -->

        </div><!-- /.container -->


        <!-- FOOTER -->
        <!-- <footer class="container">
                            <p class="float-end"><a href="#">Back to top</a></p>
                            <p>&copy; 2017–2021 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
                        </footer> -->

        <Footer />
    </main>
</template>

<style scoped>
.site-header {
    background-color: rgba(0, 0, 0, .85);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
}

.site-header a {
    color: #8e8e8e;
    transition: color .15s ease-in-out;
}

.site-header a:hover {
    color: #fff;
    text-decoration: none;
}

.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}

body {
    padding-top: 3rem;
    padding-bottom: 3rem;
    color: #5a5a5a;
}
</style>
