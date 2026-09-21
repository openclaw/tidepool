import { defineFeaturePlugin } from "openclaw/plugin-sdk/feature-plugin";
import { contract } from "./contract.js";

export default defineFeaturePlugin({
  contract,
  name: "Red Hat theme",
  description: "Red Hat look for the OpenClaw Control UI.",
  setup() {
    return {};
  },
});
