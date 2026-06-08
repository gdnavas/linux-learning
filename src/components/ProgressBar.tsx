export function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-muted ${className}`} role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full rounded-full bg-primary transition-smooth"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

export function CircularProgress({ value, size = 120, label }: { value: number; size?: number; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (v / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--muted)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke="var(--primary)" strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-smooth"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">{v}%</div>
        {label && <div className="text-xs text-muted-foreground">{label}</div>}
      </div>
    </div>
  );
}
