export const BG_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#C7F464',
  '#FFA600',
  '#FF9F1C',
  '#7FDBFF',
] as const;


export function hexToRgba(hexColor: string, alpha = 1) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


export function getBgColorById(id: number, alpha = 0.2) {
  const idx = id % BG_COLORS.length;
  return hexToRgba(BG_COLORS[idx], alpha);
}
