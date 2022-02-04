# slidev-component-spotlight

[![NPM version](https://img.shields.io/npm/v/slidev-component-spotlight?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-component-spotlight)

Key activable spotlight for `Slidev`.

Hold <kbd>Control</kbd> to activate the spotlight.

Also works in presenter mode.

## Installation

```bash
npm i slidev-component-spotlight
```

## Usage

Create a `./setup/main.ts` file in your `Slidev` project and register the plugin:
```js
import { defineAppSetup } from '@slidev/types'
import SlidevSpotlightPlugin from 'slidev-component-spotlight'

export default defineAppSetup(({ app, router }) => {
  app.use(SlidevSpotlightPlugin)
})
```

Create a `./global-top.vue` file in your `Slidev` project and use the component:
```vue
<template>
  <SlidevSpotlight/>
</template>
```

## Parameters

The component pass all the parameters to the [`spotlight-vue`](https://github.com/Smile-SA/spotlight-vue) component.

The `active`, `x` and `y` parameters and the events are used internally by this component to work with the presenter mode of slidev.
