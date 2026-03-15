// Stacked label + text block. null → hidden; "" → "–"; value → displayed.

interface InfoBlockProps {
  label: string;
  value: string | null;
}

export const InfoBlock = ({ label, value }: InfoBlockProps) => {
  if (value === null) return null;
  return (
    <div className="border-b border-dashed py-3 last:border-0">
      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
      <p className="text-sm whitespace-pre-line">{value || "–"}</p>
    </div>
  );
};
