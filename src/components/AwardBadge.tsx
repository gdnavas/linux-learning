export function AwardBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 shadow-sm">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">★</div>
      <div className="text-sm font-medium">{name}</div>
    </div>
  );
}
