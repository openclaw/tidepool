import { defineControlUiPlugin } from "openclaw/plugin-sdk/control-ui";
import { ARTWORK_DARK, ARTWORK_LIGHT } from "./artwork.js";
import { contract } from "./contract.js";
// Hand-tuned tokens and the pincer-tip composer, keyed on the theme id so they never leak into other themes.
import "./control-ui.css";

// The Control UI's CSP allows Google Fonts stylesheets and font files, so Space
// Grotesk and Fraunces load from there; a plugin bundle cannot carry font files.
// JetBrains Mono is already shipped by the Control UI itself.
const FONTS_ID = "lobster-theme-fonts";
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Space+Grotesk:wght@300..700&display=swap";
const ARTWORK_ID = "lobster-theme-artwork";
const THEME = ':root[data-theme-id="lobster-theme/lobster"]';

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
