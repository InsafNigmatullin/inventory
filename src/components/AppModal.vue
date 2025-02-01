<template>
  <Transition name="slide-from-right">
    <div v-if="modelValue" class="modal">
      <slot class="modal-inner" />
      <cross-button @click="closeModal"/>
    </div>
  </Transition>
</template>

<script setup>
import { watch } from 'vue';
import CrossButton from "@/components/CrossButton.vue";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

watch(() => props.modelValue, (value) => {
  if (value) {
    document.querySelector(':root').style.setProperty('--slide-from-right-distance', '25rem');
  }
});

function closeModal() {
  emit('update:modelValue', false);
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  width: min(100%, 25rem);
  box-sizing: border-box;
  background: rgba(38, 38, 38, 0.5);
  backdrop-filter: blur(8px);
  height: 100%;
  top: 0;
  right: 0;
  border-left: 0.1rem solid var(--color-gray);
}
</style>