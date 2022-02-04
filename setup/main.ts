import { defineAppSetup } from "@slidev/types";
import SlidevSpotlightPlugin from "../src/index";

export default defineAppSetup(({ app }) => {
  app.use(SlidevSpotlightPlugin);
});
