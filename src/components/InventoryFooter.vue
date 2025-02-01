<template>
  <div class="app-footer">
    <Skeletor class="app-aside_content" height="36" width="100%"/>
    <cross-button/>
  </div>
</template>

<script setup>
import {Skeletor} from 'vue-skeletor';
import CrossButton from "@/components/CrossButton.vue";
</script>


<style lang="scss">
.app-footer {
  position: relative;
  border: var(--default-border);
  border-radius: var(--border-radius);
  padding: 1.8rem 6.8rem 1.8rem 1.8rem;
  background-color: var(--color-black);
}
</style>