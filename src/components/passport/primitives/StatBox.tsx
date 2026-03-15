export const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center justify-center text-center rounded-lg border bg-muted/30 p-4">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="text-lg font-bold">{value}</p>
  </div>
);
