# tidepool

Experimental [OpenClaw](https://github.com/openclaw/openclaw) plugins that are too playful, too specific, or too new for the monorepo. Small creatures live here: themes, composer critters, status vocabularies, dashboard toys. Everything is a normal OpenClaw plugin with an `openclaw.plugin.json`, so anything that grows up can move into the monorepo or ClawHub unchanged.

## Plugins

| Plugin | What it does |
| --- | --- |
| [`redhat-theme`](plugins/redhat-theme) | A professional Red Hat look: Red Hat Red on neutral grays, the Red Hat type family, no lobster, a penguin in a fedora on the ledge, and build-and-deploy status words. |

## Using a plugin

```bash
git clone https://github.com/openclaw/tidepool.git
cd tidepool && pnpm install && pnpm build
openclaw plugins install ./plugins/redhat-theme
```

Then pick the theme in **Settings → Appearance**, or ask the agent to switch to it. Native polish (fonts, artwork, hand-tuned tokens) loads only when **Settings → Labs → Custom plugin UI** is enabled; the portable palette works without it.

## Adding a plugin

Create `plugins/<name>/` with `openclaw.plugin.json`, a `package.json` named `@openclaw/tidepool-<name>`, and a README with one screenshot. Keep it self-contained: no shared runtime between plugins, no changes to OpenClaw itself. If a plugin needs a new theme or UI surface in OpenClaw, land that surface in the monorepo first and reference it here.

## License

MIT. Names and marks of third parties (for example Red Hat) belong to their owners; themes here are community work, not affiliated with or endorsed by them.
