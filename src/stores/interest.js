import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useInterestStore = defineStore('interestStore', () => {
    const interestMap = ref(new Map());

    return {
        interestMap,
    }
})
