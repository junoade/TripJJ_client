import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePageInfo = defineStore('pageInfo', () => {
  // State
  const currentPage = ref(1); // 현재 페이지
  const totalPage = ref(0);   // 전체 페이지 수

  // Action
  const increaseCurrentPage = () => {
    ++currentPage.value;
  }
  const decreaseCurrentPage = () => {
    --currentPage.value;
  }

  return {
    currentPage, totalPage,
    increaseCurrentPage, decreaseCurrentPage
  }
})
