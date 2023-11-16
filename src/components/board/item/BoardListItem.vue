<script setup>
defineProps({
  article: Object
});
</script>

<template>
  <!-- TODO 사용자에 맞게 수정 -->
  <tr class="text-center">
    <th scope="row">{{ article.articleNo }}</th>
    <td class="text-start">
      <router-link
        :to="{ name: 'article-view', params: { articleNo: article.articleNo } }"
        class="article-title link-dark"
      >
        {{ article.title }}
      </router-link>
    </td>
    <td>{{ article.userId }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.publishedDate }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
