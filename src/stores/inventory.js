import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useInventoryStore = defineStore('inventory', () => {
    const inventory = ref([
        [{
            quantity: 5,
            img: 'src/assets/img/green.png'
        }, {
            quantity: 3,
            img: 'src/assets/img/orange.png'
        }, {
            quantity: 4,
            img: 'src/assets/img/purple.png'
        }, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
    ]);

    function changeItemPosition(payload) {
        if (
            payload.fromY < 0 || payload.fromY >= inventory.value.length ||
            payload.fromX < 0 || payload.fromX >= inventory.value[0].length ||
            payload.toY < 0 || payload.toY >= inventory.value.length ||
            payload.toX < 0 || payload.toX >= inventory.value[0].length
        ) {
            console.error('Invalid coordinates');
            return;
        }

        if (inventory.value[payload.toY][payload.toX] !== null) {
            [
                inventory.value[payload.fromY][payload.fromX],
                inventory.value[payload.toY][payload.toX]
            ] = [
                inventory.value[payload.toY][payload.toX],
                inventory.value[payload.fromY][payload.fromX]
            ];
        } else {
            inventory.value[payload.toY][payload.toX] = inventory.value[payload.fromY][payload.fromX];
            inventory.value[payload.fromY][payload.fromX] = null;
        }
    }

    const currentItemAddress = ref('');
    const currentItem = computed(() => {
        if (!currentItemAddress.value) return undefined;
        const [y, x] = currentItemAddress.value.split('-').map(Number);
        if (y < 0 || y >= inventory.value.length || x < 0 || x >= inventory.value[0].length) {
            return undefined;
        }
        return inventory.value[y][x];
    });

    function setCurrentItemAddress(address) {
        currentItemAddress.value = address;
    }

    function clearCurrentItemAddress() {
        currentItemAddress.value = '';
    }

    function subtractFromCurrentItem(value) {
        if (!currentItemAddress.value) {
            console.error('No item selected');
            return;
        }
        const [y, x] = currentItemAddress.value.split('-').map(Number);
        const item = inventory.value[y][x];
        if (!item) {
            console.error('Item not found');
            return;
        }
        const result = item.quantity - value;
        if (result > 0) {
            item.quantity = result;
        } else {
            inventory.value[y][x] = null;
            clearCurrentItemAddress();
        }
    }

    return {
        inventory,
        currentItemAddress,
        currentItem,

        changeItemPosition,
        setCurrentItemAddress,
        clearCurrentItemAddress,
        subtractFromCurrentItem,
    };
}, { persist: true });