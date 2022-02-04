<script setup lang="ts">
import { onMounted, ref } from "vue";
import { serverState } from "@slidev/client/env";
import { clicks, currentPage, isPresenter } from "@slidev/client/logic/nav";

const position = ref({ x: 0, y: 0 });
const active = ref(false);

onMounted(() => serverState.$onPatch(({ spotlight }) => {
  active.value = !!spotlight.x; // Hide spotlight when no coords
  if (active.value) {
    position.value = spotlight;
  }
}));

function broadcastSpotlightPosition(position: {x?: number, y?: number}) {
  if (isPresenter.value) {
    serverState.$patch({
      page: currentPage.value,
      clicks: clicks.value,
      spotlight: position,
    });
  }
}
</script>

<template>
  <spotlight
    v-bind="$attrs"
    :active="active"
    :x="position.x"
    :y="position.y"
    @activate="broadcastSpotlightPosition"
    @deactivate="broadcastSpotlightPosition({})"
    @update="broadcastSpotlightPosition"
  />
</template>
