<template>
  <div class="app">
    <div class="app_inner">
      <div class="app_row">
        <app-window class="app_window"/>
        <inventory-grid/>
      </div>
      <inventory-footer class="app_footer"/>
    </div>
  </div>

</template>

<script setup>
import AppWindow from "@/components/AppWindow.vue";
import InventoryGrid from "@/components/InventoryGrid.vue";
import InventoryFooter from "@/components/InventoryFooter.vue";
</script>

<style lang="scss">
.app {
  --gap: 2.4rem;

  display: grid;
  place-items: center;
  align-content: center;
  gap: var(--gap);
  min-height: inherit;

  .app_inner {
    display: grid;
    margin-top: 6rem;
    gap: var(--gap);
    width: 78.5rem;
  }

  .app_row {
    display: grid;
    grid-template-columns: 30% auto;
    gap: var(--gap);
  }

  .app_window {
    height: 100%;
    box-sizing: border-box;
  }

  .app_footer {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
