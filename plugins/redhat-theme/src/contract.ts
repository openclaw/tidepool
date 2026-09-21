import { defineFeatureContract } from "openclaw/plugin-sdk/feature-contract";

// The theme is data (themes/redhat.json); the feature contract exists only so
// the plugin can ship its native polish stylesheet. No operations, no events.
export const contract = defineFeatureContract({
  pluginId: "redhat-theme",
  operations: {},
  events: {},
});
