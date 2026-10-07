import assert from "node:assert/strict";
import { test } from "node:test";
import { bindOwnedThemeNodes } from "../src/control-ui-nodes.ts";

type FakeNode = {
  id: string;
  removed: boolean;
  parent: FakeParent | null;
  remove(): void;
  replaceWith(node: FakeNode): void;
};

type FakeParent = {
  children: FakeNode[];
  append(node: FakeNode): void;
};

function createHost() {
  const byId = new Map<string, FakeNode>();
  const head: FakeParent = {
    children: [],
    append(node) {
      detach(node);
      node.parent = head;
      head.children.push(node);
      byId.set(node.id, node);
    },
  };

  function detach(node: FakeNode) {
    const parent = node.parent;
    if (!parent) {
      return;
    }
    const index = parent.children.indexOf(node);
    if (index >= 0) {
      parent.children.splice(index, 1);
    }
    node.parent = null;
    if (byId.get(node.id) === node) {
      byId.delete(node.id);
    }
  }

  function create(id: string): FakeNode {
    const node: FakeNode = {
      id,
      removed: false,
      parent: null,
      remove() {
        node.removed = true;
        detach(node);
      },
      replaceWith(next) {
        const parent = node.parent;
        detach(node);
        node.removed = true;
        if (!parent) {
          return;
        }
        next.parent = parent;
        parent.children.push(next);
        byId.set(next.id, next);
      },
    };
    return node;
  }

  return {
    head,
    create,
    getElementById(id: string) {
      return byId.get(id) ?? null;
    },
  };
}

test("disposer removes only the nodes its activation installed", () => {
  const host = createHost();
  const firstFonts = host.create("redhat-theme-fonts");
  const firstArtwork = host.create("redhat-theme-artwork");
  const disposeFirst = bindOwnedThemeNodes(host, firstFonts, firstArtwork);

  assert.deepEqual(
    host.head.children.map((node) => node.id),
    ["redhat-theme-fonts", "redhat-theme-artwork"],
  );

  const secondFonts = host.create("redhat-theme-fonts");
  const secondArtwork = host.create("redhat-theme-artwork");
  const disposeSecond = bindOwnedThemeNodes(host, secondFonts, secondArtwork);

  assert.equal(host.getElementById("redhat-theme-fonts"), secondFonts);
  assert.equal(host.getElementById("redhat-theme-artwork"), secondArtwork);
  assert.equal(firstFonts.removed, true);
  assert.equal(firstArtwork.removed, true);

  disposeFirst();

  assert.equal(secondFonts.removed, false);
  assert.equal(secondArtwork.removed, false);
  assert.equal(host.getElementById("redhat-theme-fonts"), secondFonts);
  assert.equal(host.getElementById("redhat-theme-artwork"), secondArtwork);

  disposeSecond();

  assert.equal(host.getElementById("redhat-theme-fonts"), null);
  assert.equal(host.getElementById("redhat-theme-artwork"), null);
  assert.equal(host.head.children.length, 0);
});

test("disposer removes nodes it created when nothing replaced them", () => {
  const host = createHost();
  const fonts = host.create("redhat-theme-fonts");
  const artwork = host.create("redhat-theme-artwork");
  const dispose = bindOwnedThemeNodes(host, fonts, artwork);

  dispose();

  assert.equal(fonts.removed, true);
  assert.equal(artwork.removed, true);
  assert.equal(host.head.children.length, 0);
});
