export default function ImagePlaceholder({ title, size, note, className = "" }) {
  return (
    <div
      className={`image-placeholder ${className}`.trim()}
      aria-label={title || note || size || "Ilustrasi pendukung"}
      role="img"
    />
  );
}
