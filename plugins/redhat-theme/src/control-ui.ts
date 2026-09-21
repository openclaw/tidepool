import { defineControlUiPlugin } from "openclaw/plugin-sdk/control-ui";
import { ARTWORK_DARK, ARTWORK_LIGHT } from "./artwork.js";
import { contract } from "./contract.js";
// Hand-tuned tokens, keyed on the theme id so they never leak into other themes.
import "./control-ui.css";

// The Control UI's CSP allows Google Fonts stylesheets and font files, so the
// Red Hat faces load from there; a plugin bundle cannot carry font files.
const FONTS_ID = "redhat-theme-fonts";
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&family=Red+Hat+Mono:ital,wght@0,300..700;1,300..700&family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&display=swap";
const ARTWORK_ID = "redhat-theme-artwork";
const THEME = ':root[data-theme-id="redhat-theme/redhat"]';

export default defineControlUiPlugin({
  id: contract.pluginId,
  activate() {
    if (!document.getElementById(FONTS_ID)) {
      const link = document.createElement("link");
      link.id = FONTS_ID;
      link.rel = "stylesheet";
      link.href = FONTS_HREF;
      document.head.append(link);
    }
    if (!document.getElementById(ARTWORK_ID)) {
      const style = document.createElement("style");
      style.id = ARTWORK_ID;
      style.textContent =
        `${THEME}[data-theme-mode="dark"] { --app-background-image: url("${ARTWORK_DARK}"); }\n` +
        `${THEME}[data-theme-mode="light"] { --app-background-image: url("${ARTWORK_LIGHT}"); }\n`;
      document.head.append(style);
    }
    return () => {
      document.getElementById(FONTS_ID)?.remove();
      document.getElementById(ARTWORK_ID)?.remove();
    };
  },
});
