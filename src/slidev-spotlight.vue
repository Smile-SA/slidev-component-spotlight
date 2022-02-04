<script setup lang="ts">
import { onMounted, ref } from "vue";
import { serverState } from "@slidev/client/env";
import { clicks, currentPage, isPresenter } from "@slidev/client/logic/nav";
import { showPresenterCursor } from "@slidev/client/state";

import type { ServerState } from "@slidev/client/env";
import type { Position } from "spotlight-vue";

export interface SpotlightServerState extends ServerState {
  spotlight: Position;
}

const position = ref<Position>({ x: 0, y: 0 });
const active = ref(false);
let showPresenterCursorSave: boolean;

onMounted(() =>
  serverState.$onPatch((serverstate) => {
    const { spotlight } = serverstate as SpotlightServerState;
    active.value = !!spotlight.x;
    if (active.value) {
      position.value = spotlight;
    }
  })
);

function activate(position: { x?: number; y?: number }) {
  if (!active.value) {
    showPresenterCursorSave = showPresenterCursor.value;
  }
  broadcastSpotlightPosition(position);
}

function broadcastSpotlightPosition(position: { x?: number; y?: number }) {
  active.value = !!position.x;
  if (isPresenter.value) {
    const showSpotlight = !!position.x;
    if (showSpotlight) showPresenterCursor.value = false;
    serverState.$patch({
      page: currentPage.value,
      clicks: clicks.value,
      cursor: { x: -100, y: -100 },
      spotlight: position,
    } as ServerState);
    if (!showSpotlight) {
      showPresenterCursor.value = showPresenterCursorSave;
    }
  }
}
</script>

<template>
  <spotlight
    v-bind="$attrs"
    :active="active"
    :x="position.x"
    :y="position.y"
    @activate="activate"
    @deactivate="broadcastSpotlightPosition({})"
    @update="broadcastSpotlightPosition"
  />
</template>
