import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "sahabat-cerdik-dm-cookie-consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      setIsVisible(window.localStorage.getItem(STORAGE_KEY) !== "accepted");
    } catch (_error) {
      setIsVisible(false);
    }
  }, []);

  function acceptCookies() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch (_error) {
      // Browser storage can be blocked; hiding the banner is enough here.
    }
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-consent" role="region" aria-label="Informasi cookie">
      <p>
        Kami memakai penyimpanan browser untuk sesi login, preferensi, dan pengalaman aplikasi.
        Baca detailnya di <Link to="/privasi-data">Privasi Data</Link>.
      </p>
      <button className="button button-primary" type="button" onClick={acceptCookies}>
        Mengerti
      </button>
    </div>
  );
}
