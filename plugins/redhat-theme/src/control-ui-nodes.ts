// The Control UI host activates a replacement plugin, then disposes the previous
// owner. Each activation must install its own nodes and remove only those
// objects. Removing by id deletes the replacement after it reused the old nodes.

export type OwnedThemeNode = {
  id: string;
  remove(): void;
};

export type ThemeNodeHost<Node extends OwnedThemeNode> = {
  getElementById(id: string): { replaceWith(node: Node): void } | null;
  head: { append(node: Node): void };
};

export function bindOwnedThemeNodes<Node extends OwnedThemeNode>(
  host: ThemeNodeHost<Node>,
  fonts: Node,
  artwork: Node,
): () => void {
  const owned = [fonts, artwork].map((node) => installOwnedNode(host, node));
  return () => {
    for (const node of owned) {
      node.remove();
    }
  };
}

function installOwnedNode<Node extends OwnedThemeNode>(
  host: ThemeNodeHost<Node>,
  node: Node,
): Node {
  const existing = host.getElementById(node.id);
  if (existing) {
    existing.replaceWith(node);
  } else {
    host.head.append(node);
  }
  return node;
}
