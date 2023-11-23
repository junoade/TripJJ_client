import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImagePlace = defineStore('imagePlace', () => {
    const imageMap = ref(new Map());

    return {
        imageMap,
    }
})