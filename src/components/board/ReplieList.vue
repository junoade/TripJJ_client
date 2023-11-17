<script setup>
import ReplyListItem from './item/ReplyListItem.vue';

defineProps({ replies: Array });

</script>

<template>
    <!-- <div class="row d-flex justify-content-center">
        <div class="col-md-12 col-lg-10">
            <div class="card text-dark">
                <div class="card-body p-4">
                    <h4 class="mb-0">답글 목록</h4>
                    <p class="fw-light mb-4 pb-2">Latest Comments section by users</p>
                    <ReplyListItem
                        v-for="reply in replies"
                        :key="reply.replyNo"
                        :reply="reply"
                    />
                </div>                
            </div>
        </div>
    </div> -->
    <span>
        <h4 class="mb-0">댓글</h4>
        <p class="fw-light mb-4 pb-2">Latest Comments section by users</p>
    </span>
    <ReplyListItem
        v-for="reply in replies"
        :key="reply.replyNo"
        :reply="reply"
    />
                
</template>

<style></style>
