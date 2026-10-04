import { defineControlUiPlugin } from "openclaw/plugin-sdk/control-ui";
import { ARTWORK_DARK, ARTWORK_LIGHT } from "./artwork.js";
import { contract } from "./contract.js";
import { bindOwnedThemeNodes, type ThemeNodeHost } from "./control-ui-nodes.js";
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
    const link = document.createElement("link");
    link.id = FONTS_ID;
    link.rel = "stylesheet";
    link.href = FONTS_HREF;
    const style = document.createElement("style");
    style.id = ARTWORK_ID;
    style.textContent =
      `${THEME}[data-theme-mode="dark"] { --app-background-image: url("${ARTWORK_DARK}"); }\n` +
      `${THEME}[data-theme-mode="light"] { --app-background-image: url("${ARTWORK_LIGHT}"); }\n`;
    return bindOwnedThemeNodes(themeNodeHost(document), link, style);
  },
});

function themeNodeHost(doc: Document): ThemeNodeHost<HTMLElement> {
  return {
    getElementById(id) {
      const existing = doc.getElementById(id);
      if (!existing) {
        return null;
      }
      return {
        replaceWith(node) {
          existing.replaceWith(node);
        },
      };
    },
    head: {
      append(node) {
        doc.head.append(node);
      },
    },
  };
}
