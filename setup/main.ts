import { defineAppSetup } from '@slidev/types'
import Spotlight from 'spotlight-vue';

export default defineAppSetup(({ app }) => {
  app.use(Spotlight);
});
