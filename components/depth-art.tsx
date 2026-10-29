type DepthArtProps = {
  variant?: "ribbon" | "bloom";
  className?: string;
  priority?: boolean;
};

/** Cached decorative artwork never captures input. */
export function DepthArt({ variant = "ribbon", className = "", priority = false }: DepthArtProps) {
  return <div className={`depth-art depth-art-${variant} ${className}`} aria-hidden="true">
    <div className="depth-art-layer" data-parallax={variant === "bloom" ? "0.045" : "0.07"}>
      {variant === "bloom" ? <img src="/assets/chrome-bloom.svg" width="420" height="420" alt="" loading="lazy" decoding="async" /> : <picture>
        <source media="(max-width: 760px)" srcSet="/assets/depth-sculpture-640.webp" />
        <img src="/assets/depth-sculpture-1280.webp" width="1280" height="853" alt="" loading={priority ? "eager" : "lazy"} fetchPriority="low" decoding="async" />
      </picture>}
    </div>
    <span className="depth-art-grid" />
  </div>;
}

export function CardArt({ variant = 0 }: { variant?: number }) {
  return <span className={`card-art card-art-${variant % 3}`} aria-hidden="true">
    <img src="/assets/card-cube-480.webp" width="480" height="480" alt="" loading="lazy" decoding="async" fetchPriority="low" />
  </span>;
}
