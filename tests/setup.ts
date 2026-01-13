if (!String.prototype.contains) {
  // Align with Obsidian's String.contains usage
  // eslint-disable-next-line no-extend-native
  (String.prototype as any).contains = String.prototype.includes;
}
