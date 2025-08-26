export function connectionAllowed(connection, nodes) {
  const source = nodes.find((n) => n.id === connection.source);
  const target = nodes.find((n) => n.id === connection.target);

  if (!source || !target) return true;

  if (source.data.type === "A" && target.data.type === "B") {
    return false;
  }
  return true;
}
