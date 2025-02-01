<template>
  <div class="info">
    <div class="info-filler">
      <div class="info-content">
        <div class="info-img-wrapper">
          <img :src="currentItem.img" alt="" class="info-img">
        </div>
        <div class="app-skeletor">
          <Skeletor class="app-window_title" height="30" width="100%"/>
          <Skeletor class="app-skeletor_text" height="10" width="100%"/>
          <Skeletor class="app-skeletor_text" height="10" width="95%"/>
          <Skeletor class="app-skeletor_text" height="10" width="90%"/>
          <Skeletor class="app-skeletor_text" height="10" width="85%"/>
          <Skeletor class="app-skeletor_text" height="10" width="50%"/>
        </div>
      </div>
    </div>
    <div class="info-bottom">
      <template v-if="!removeItemDialogVisible">
        <div aria-hidden="true" class="info-separator"></div>
        <button
            class="btn btn_color_red info-remove"
            type="button"
            @click="toggleRemoveDialogVisibility"
        >
          Удалить предмет
        </button>
      </template>
      <template v-if="removeItemDialogVisible">
        <input
            v-model="removeQuantity"
            :max="currentItem.quantity"
            class="input"
            min="1"
            placeholder="Введите количество"
            type="number"
            @input="onInput"
        >
        <div class="info-row">
          <button
              class="btn btn_small"
              type="button"
              @click="toggleRemoveDialogVisibility"
          >
            Отмена
          </button>
          <button
              class="btn btn_small btn_color_red"
              type="button"
              @click="subtractFromItem"
          >
            Подтвердить
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useInventoryStore } from '@/stores/inventory';
import {Skeletor} from "vue-skeletor";

const inventoryStore = useInventoryStore();
const currentItem = computed(() => inventoryStore.currentItem);

const removeItemDialogVisible = ref(false);
const removeQuantity = ref('');

function toggleRemoveDialogVisibility() {
  removeItemDialogVisible.value = !removeItemDialogVisible.value;
}

function subtractFromItem() {
  inventoryStore.subtractFromCurrentItem(removeQuantity.value);
}

function onInput(event) {
  removeQuantity.value = Math.min(Math.max(1, parseInt(event.target.value) || 1), currentItem.value.quantity);
}
</script>


<style lang="scss" scoped>
.info {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  text-align: center;
}

.info-filler {
  flex-grow: 1;
  position: relative;
}

.info-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.info-content::-webkit-scrollbar {
  display: none;
}

.info-img-wrapper {
  position: relative;
  margin: 2rem;
  width: 88%;
  margin-inline: auto;
}

.info-img-wrapper::before {
  content: '';
  display: block;
  padding-top: 100%;
}

.info-img {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 100%;
  max-height: 100%;
  width: 120px;
  height: 120px;
  transform: translate(-50%, -50%);

}

.info-separator {
  border-top: 0.1rem solid var(--color-gray);
}

.info-name,
.info-text {
  display: block;
}

.info-name {
  margin: 1.6rem 0 2.4rem;
  font-size: 2em;
}

.info-text {
  margin: 1.6rem 0;
}

.info-remove {
  margin-top: 1.8rem;
}

.info-row {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.app-skeletor {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-skeletor_title {
  margin-bottom: 2.4rem;
}

.app-skeletor_text {
  margin-bottom: 1.6rem;
  border-radius: var(--border-radius);
  background-color: var(--color-skeleton);
}
</style>