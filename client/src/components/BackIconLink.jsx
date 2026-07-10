import { Link } from "react-router-dom";

export default function BackIconLink({
  className = "",
  label = "Kembali ke dashboard",
  to = "/dashboard"
}) {
  return (
    <Link
      aria-label={label}
      className={`back-icon-link${className ? ` ${className}` : ""}`}
      title={label}
      to={to}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m15 5-7 7 7 7" />
      </svg>
    </Link>
  );
}
