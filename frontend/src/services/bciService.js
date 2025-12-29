export function sendBCICommand(focus) {
  if (focus > 80) return "TAG_SUSPICIOUS";
  if (focus > 50) return "MARK_SAFE";
  return "NO_ACTION";
}
