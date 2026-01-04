// src/components/StarRating.tsx
"use client";

type StarRatingProps = {
  rating: number; // 0〜5（小数OK）
  size?: number;
  showValue?: boolean;
};

export function StarRating({
  rating,
  size = 15,
  showValue = false,
}: StarRatingProps) {
  const r = Math.max(0, Math.min(5, rating)); // 0〜5に丸める
  const fullStars = Math.floor(r);
  const hasHalf = r - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex", gap: 2 }}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} type="full" size={size} />
        ))}
        {hasHalf && <Star type="half" size={size} />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} type="empty" size={size} />
        ))}
      </div>

      {showValue && (
        <span style={{ fontSize: 12, opacity: 0.7 }}>{r.toFixed(1)}</span>
      )}
    </div>
  );
}

function Star({
  type,
  size,
}: {
  type: "full" | "half" | "empty";
  size: number;
}) {
  const stroke = "#FFD700";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={
        type === "full"
          ? stroke
          : type === "half"
          ? "url(#halfGradient)"
          : "none"
      }
      stroke={stroke}
      strokeWidth="2"
    >
      {type === "half" && (
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor={stroke} />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9" />
    </svg>
  );
}
