<template>
  <button class="btn-close" type="button" @click="$emit('click')">
    <svg xmlns="http://www.w3.org/2000/svg"
         class="icon-base"
         width="24"
         height=24
         viewBox="0 0 24 24"
         role="presentation"
    >
      <g fill="white">
        <path d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"/>
      </g>
    </svg>
  </button>
</template>

<script setup lang="ts">
defineEmits(['click']);
</script>


<style lang="scss" scoped>
.btn-close {
  position: absolute;
  top: var(--close-btn-indent);
  right: var(--close-btn-indent);
  background-color: transparent;
  border: none;
  color: var(--color-white);
  cursor: pointer;
}
</style>