<script setup>
import DefaultCounterCard from "@/components/layout/cards/DefaultCard.vue";
</script>

<template>
    <!-- 여행지 통계 정보-->
    <section class="pt-3 pb-4" id="count-stats">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 z-index-2 border-radius-xl mx-auto py-3">
                        <div class="row">
                            <div class="col-md-4 position-relative">
                                <DefaultCounterCard color="success" title="관광 명소" description="아름다운 자연 경관과 풍부한 역사, 그리고 감각적인 맛집" :count="70000" suffix="+" :duration="3000" divider="vertical" />
                            </div>
                            <div class="col-md-4 position-relative">
                                <DefaultCounterCard color="success" title="여행 공유 커뮤니티" description="즐거움을 공유하고 새로운 경험과 즐거움을 나눠보세요." :count="50000" suffix="+" :duration="3000" divider="vertical" />
                            </div>
                            <div class="col-md-4">
                                <DefaultCounterCard color="success" title="핫플레이스" description="축제, 공연, 핫플레이스 정보를 확인하고 지금 여행을 떠나보세요!" :count="50000" :duration="3000" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>

<style scoped>

</style>