export const StatBox = ({ label, value, subtext }: { label: string; value: string; subtext?: string }) => (
  <div className="flex flex-col items-center justify-center text-center rounded-lg border bg-muted/30 p-4">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="text-lg font-bold">{value}</p>
    {subtext && <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>}
  </div>
);
