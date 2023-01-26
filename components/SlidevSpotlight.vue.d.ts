import type { SharedState } from "@slidev/client/state/shared";
import type { Position } from "spotlight-vue";

declare module "@slidev/client/state/shared" {
  interface SharedState {
    spotlight: Partial<Position>;
  }
}
