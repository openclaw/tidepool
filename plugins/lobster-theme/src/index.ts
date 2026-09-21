import { defineFeaturePlugin } from "openclaw/plugin-sdk/feature-plugin";
import { contract } from "./contract.js";

export default defineFeaturePlugin({
  contract,
  name: "Lobster theme",
  description: "Lobster look for the OpenClaw Control UI.",
  setup() {
    return {};
  },
});
