import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchedPlace = defineStore('searchedPlace', () => {
    const searchMap = ref(new Map());

    return {
        searchMap,
    }
})


