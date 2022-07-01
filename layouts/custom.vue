<template>
  <div class="custom-layout">
    Some *custom* layout
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "custom",
});
</script>
