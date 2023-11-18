<script setup>
import { onMounted, onUnmounted } from "vue";

// import NavbarDefault from "@/components/layout/NavbarDefault.vue"
import Carousel from "@/views/TheCarouselView.vue";
import DefaultCounterCard from "@/components/layout/cards/DefaultCard.vue";
import IntroducingAround from "@/components/layout/TheIntroductionView.vue";
import FilledInfoCard from "@/components/layout/cards/FilledInfoCard.vue";
import Footer from "@/components/layout/Footer.vue";
import AttractionType from "@/views/TheAttractionTypeView.vue";
import StatisticsInfo from "@/components/layout/StatisticsInfo.vue";
import SearchBar from "@/components/layout/SearchBar.vue";

// imgs

</script>

<template>
    <main>
        <Carousel />
        <!-- 여행-->
        <AttractionType/>

        <!-- 여행지 통계 정보-->
       <StatisticsInfo/>
        <!-- 여행 검색 -->
        <SearchBar/>
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

            <div class="row featurette">
                <div class="col-md-7">
                    <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your
                            mind.</span></h2>
                    <p class="lead">Some great placeholder content for the first featurette here. Imagine some exciting
                        prose here.</p>
                </div>
                <div class="col-md-5">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
                        height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500"
                        preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa"
                            dy=".3em">500x500</text>
                    </svg>

                </div>
            </div>

            <hr class="featurette-divider">

            <IntroducingAround />

            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <FilledInfoCard class="p-4" :color="{ text: 'white', background: 'bg-gradient-success' }"
                            :icon="{ component: 'flag', color: 'white' }" title="Getting Started"
                            description="Check the possible ways of working with our product and the necessary files for building your own project."
                            :action="{
                                route:
                                    'https://www.creative-tim.com/learning-lab/vue/overview/material-kit/',
                                label: { text: 'Let\'s start', color: 'white' }
                            }" />
                    </div>
                    <div class="col-lg-4">
                        <FilledInfoCard class="px-lg-1 mt-lg-0 mt-4 p-4" height="h-100"
                            :icon="{ component: 'precision_manufacturing', color: 'success' }" title="Plugins" description="Get inspiration and have an overview about the plugins that we
                            used to create the Material Kit." :action="{
                                route:
                                    'https://www.creative-tim.com/learning-lab/vue/input/material-kit/',
                                label: { text: 'Read more' }
                            }" />
                    </div>
                    <div class="col-lg-4">
                        <FilledInfoCard class="px-lg-1 mt-lg-0 mt-4 p-4"
                            :icon="{ component: 'receipt_long', color: 'success' }" title="Utility Classes" description="Material Kit is giving you a lot of pre-made elements. For those
                            who want flexibility, we included many utility classes." :action="{
                                route:
                                    'https://www.creative-tim.com/learning-lab/vue/utilities/material-kit/',
                                label: { text: 'Read more' }
                            }" />
                    </div>
                </div>
            </div>

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
