<template>
  <div
      ref="wrapperRef"
      :class="{ 'grabbing': isDragging }"
      class="inventory-grid"
      @mousedown="onMouseDown"
  >
    <template v-for="(row, i) in inventoryStore.inventory">
      <div
          v-for="(item, j) in row"
          :key="j"
          :data-position="`${i}-${j}`"
          class="cell"
      >
        <div
            v-if="item"
            :data-position="`${i}-${j}`"
            class="item"
            @click="onItemClick"
        >
          <img :alt="item.text" :src="item.img" class="item-img">
          <span class="quantity">
            {{ item.quantity }}
          </span>
        </div>
      </div>
    </template>
    <app-modal v-model="isInfoVisible">
      <item-info/>
    </app-modal>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useInventoryStore } from '@/stores/inventory';
import AppModal from "@/components/AppModal.vue";
import ItemInfo from "@/components/ItemInfo.vue";

const inventoryStore = useInventoryStore();

const copyNode = ref(null);
const wrapperRef = ref(null);
const startPosition = reactive({ x: 0, y: 0 });
const avatarSize = reactive({ width: 0, height: 0 });
const isDragging = computed(() => Boolean(copyNode.value));

const isInfoVisible = computed({
  get() {
    return !!inventoryStore.currentItem;
  },
  set(val) {
    if (!val) {
      inventoryStore.clearCurrentItemAddress();
    }
  },
});

// Функция для сохранения инвентаря в localStorage
function saveInventory() {
  localStorage.setItem('inventory', JSON.stringify(inventoryStore.inventory));
}

// Функция для загрузки инвентаря из localStorage
function loadInventory() {
  const savedInventory = localStorage.getItem('inventory');
  if (savedInventory) {
    inventoryStore.inventory = JSON.parse(savedInventory);
  }
}

// Загружаем инвентарь при монтировании компонента
onMounted(() => {
  loadInventory();
});

function onMouseDown(event) {
  if (event.which !== 1) return;
  if (!event.target.classList.contains('item')) return;

  startPosition.x = event.offsetX;
  startPosition.y = event.offsetY;
  avatarSize.width = event.target.clientWidth;
  avatarSize.height = event.target.clientHeight;

  copyNode.value = event.target.cloneNode(true);
  copyNode.value.style.width = `${avatarSize.width}px`;
  copyNode.value.style.height = `${avatarSize.height}px`;
  copyNode.value.classList.add('avatar');

  copyNode.value.dataset.position = event.target.dataset.position;

  wrapperRef.value.appendChild(copyNode.value);

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(event) {
  if (!copyNode.value) return;
  if (!copyNode.value.classList.contains('visible')) {
    copyNode.value.classList.add('visible');
  }

  const { top, right, bottom, left } = wrapperRef.value.getBoundingClientRect();

  const x = Math.max(Math.min(event.x - startPosition.x, right - avatarSize.width), left);
  const y = Math.max(Math.min(event.y - startPosition.y, bottom - avatarSize.height), top);

  copyNode.value.style.transform = `translate(${x}px, ${y}px)`;
}

function onMouseUp(event) {
  if (!copyNode.value) return;

  const [fromY, fromX] = copyNode.value.dataset.position.split('-');
  const [toY, toX] = event.target.dataset.position.split('-');

  copyNode.value.remove();
  copyNode.value = null;

  if (fromY === toY && fromX === toX) return;

  inventoryStore.changeItemPosition({ fromY, fromX, toY, toX });

  // Сохраняем инвентарь после изменения позиции
  saveInventory();

  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
}

function onItemClick(event) {
  const [toY, toX] = event.target.dataset.position.split('-');
  inventoryStore.setCurrentItemAddress(`${toY}-${toX}`);
}

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
});
</script>

<style lang="scss">
.inventory-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: .1rem;
  border: .1rem solid transparent;
  border-radius: var(--border-radius);
  background-color: var(--color-gray);
  overflow: hidden;
  touch-action: none;

  &.grabbing {
    cursor: grabbing;
  }

  .cell {
    width: 10.4rem;
    height: 10.4rem;
    background-color: var(--color-black);
    user-select: none;
  }

  .item,
  .avatar {
    display: grid;
    place-items: center;
  }

  .item {
    position: relative;
    height: 100%;
    cursor: pointer;
  }

  &.grabbing .item {
    cursor: grabbing;
  }

  .item-img {
    --img-size: 5.4rem;
    max-width: var(--img-size);
    max-height: var(--img-size);
    pointer-events: none;
  }

  .quantity {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: .2rem .4rem;
    border: var(--default-border);
    border-top-left-radius: .6rem;
    background-color: var(--color-black);
    font-size: 1rem;
  }

  .avatar {
    position: fixed;
    top: 0;
    left: 0;
    border: var(--default-border);
    border-radius: calc(var(--border-radius) * 2);
    background-color: var(--color-black);
    pointer-events: none;
  }

  .avatar:not(.visible) {
    display: none;
  }

  .info {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    max-width: 25rem;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>