<template>
  <div class="app-window">
    <img alt="" class="app-window_img" src="@/assets/img/app-window__img.jpg">
    <Skeletor class="app-window_title" height="30" width="100%"/>
    <Skeletor class="app-window_text" height="10" width="90%"/>
    <Skeletor class="app-window_text" height="10" width="100%"/>
    <Skeletor class="app-window_text" height="10" width="95%"/>
    <Skeletor class="app-window_text" height="10" width="90%"/>
    <Skeletor class="app-window_text" height="10" width="85%"/>
    <Skeletor class="app-window_text" height="10" width="50%"/>
  </div>
</template>

<script setup>
import {Skeletor} from 'vue-skeletor';
</script>

<style lang="scss">
.app-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: var(--default-border);
  border-radius: var(--border-radius);
  padding: 1.8rem 1.4rem 2.4rem;
  background-color: var(--color-black);
  text-align: center;
}

.app-window_img {
  margin-bottom: 2rem;
}

.app-window_title {
  margin-bottom: 2.4rem;
}

.app-window_text {
  margin-bottom: 1.6rem;
  border-radius: var(--border-radius);
  background-color: var(--color-skeleton);
}
</style>