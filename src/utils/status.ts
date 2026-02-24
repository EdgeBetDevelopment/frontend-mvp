export const getStatusColor = (status?: string) => {
  if (!status) return "bg-muted text-muted-foreground";
  const normalized = status.toLowerCase();
  if (normalized.includes("out"))
    return "bg-destructive/80 text-destructive-foreground";
  if (normalized.includes("day-to-day")) return "bg-amber-600/80 text-white";
  if (normalized.includes("questionable")) return "bg-yellow-600/80 text-white";
  return "bg-muted text-muted-foreground";
};
