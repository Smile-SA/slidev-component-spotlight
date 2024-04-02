<script setup lang="ts">
import 'spotlight-vue/dist/style.css';
import { ref } from "vue";
import { useNav } from "@slidev/client";
import Spotlight from 'spotlight-vue';
import { patch, onPatch } from "@slidev/client/state/shared.ts";
import { showPresenterCursor } from "@slidev/client/state/index.ts";

import type { SharedState } from "@slidev/client/state/shared.ts";
import type { Position } from "spotlight-vue";

const { isPresenter } = useNav();
const position = ref<Partial<Position>>({ x: 0, y: 0 });
const active = ref(false);
let showPresenterCursorSave: boolean;

onPatch((patch) => {
  const { spotlight } = patch as SharedState;
  active.value = !!spotlight?.x;
  if (active.value) {
    position.value = spotlight;
  }
});

function activate(position: Partial<Position>) {
  if (!active.value) {
    showPresenterCursorSave = showPresenterCursor.value;
  }
  broadcastSpotlightPosition(position);
}

function broadcastSpotlightPosition(position: Partial<Position>) {
  active.value = !!position.x;
  if (isPresenter.value) {
    const showSpotlight = !!position.x;
    if (showSpotlight) {
      showPresenterCursor.value = false;
    }
    patch('cursor', { x: -100, y: -100 });
    patch('spotlight', position);
    if (!showSpotlight) {
      showPresenterCursor.value = showPresenterCursorSave;
    }
  }
}
</script>

<template>
  <Spotlight
    v-bind="$attrs"
    :active="active"
    :x="position.x"
    :y="position.y"
    @activate="activate"
    @deactivate="broadcastSpotlightPosition({})"
    @update="broadcastSpotlightPosition"
  />
</template>
