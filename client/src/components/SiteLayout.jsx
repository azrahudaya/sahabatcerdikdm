import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../auth/AuthContext.jsx";

const primaryHeaderLinks = [
  { label: "Beranda", to: "/" },
  { label: "Deteksi Dini", to: "/deteksi-dini" },
  { label: "Fase", to: "/#fase-kehidupan" }
];

const brandLogoSrc = "/logosahabatcerdikdm-dark.png";
const mobileAppLinks = [
  { label: "Dashboard", to: "/dashboard", icon: "home", end: true },
  { label: "Cek risiko", to: "/deteksi-dini", icon: "check" },
  { label: "Reminder", to: "/dashboard/reminder-harian", icon: "bell" },
  { label: "Profil", to: "/dashboard/profil", icon: "profile" }
];

function MobileAppIcon({ name }) {
  if (name === "home") {
    return <path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3Z" />;
  }

  if (name === "check") {
    return <><path d="M7 3h10v4H7z" /><path d="M5 5v16h14V5" /><path d="m8 14 2.5 2.5L16 11" /></>;
  }

  if (name === "bell") {
    return <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>;
  }

  return <><circle cx="12" cy="8" r="4" /><path d="M4 21c.7-4.4 3.4-7 8-7s7.3 2.6 8 7" /></>;
}

export default function SiteLayout({ navigation, brand, phases }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    if (isMenuOpen) {
      closeButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  function handleDrawerKeyDown(event) {
    if (event.key !== "Tab" || !drawerRef.current) {
      return;
    }

    const focusableElements = drawerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) {
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  return (
    <div className={`app-shell${isAuthenticated ? " has-app-nav" : ""}`}>
      <header className="site-header">
        <div className="site-header-inner">
          <NavLink className="brand-link" to="/">
            <img className="brand-logo" src={brandLogoSrc} alt={brand.name} />
          </NavLink>

          <nav className="site-nav site-nav-desktop" aria-label="Navigasi utama">
            {primaryHeaderLinks.map((item) =>
              item.to.includes("#") ? (
                <Link className="nav-link" key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <NavLink
                  end={item.to === "/"}
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="header-actions">
            <NavLink className="header-cta" to={isAuthenticated ? "/dashboard" : "/login"}>
              {isAuthenticated ? "Dashboard" : "Masuk"}
            </NavLink>

            <button
              aria-controls="mobile-drawer"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <button
        aria-hidden={!isMenuOpen}
        aria-label="Tutup menu"
        className={`drawer-backdrop${isMenuOpen ? " is-open" : ""}`}
        tabIndex={isMenuOpen ? 0 : -1}
        type="button"
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        aria-hidden={!isMenuOpen}
        aria-modal={isMenuOpen}
        className={`mobile-drawer${isMenuOpen ? " is-open" : ""}`}
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        tabIndex={-1}
        onKeyDown={handleDrawerKeyDown}
      >
        <div className="mobile-drawer-top">
          <div>
            <img className="drawer-brand-logo" src={brandLogoSrc} alt={brand.name} />
          </div>

          <button
            aria-label="Tutup menu"
            className="drawer-close"
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Navigasi mobile">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `mobile-nav-link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <NavLink
              to="/dashboard/profil"
              className={({ isActive }) => `mobile-nav-link${isActive ? " is-active" : ""}`}
            >
              Profil akun
            </NavLink>
          ) : null}
        </nav>

        <div className="drawer-divider" />

        <div className="drawer-phase-list">
          <h3>Fase kehidupan</h3>
          <ul>
            {phases.map((phase) => (
              <li key={phase.slug}>
                <NavLink to={`/fase/${phase.slug}`}>{phase.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        {isAuthenticated ? (
          <button className="drawer-logout" type="button" onClick={logout}>
            Keluar
          </button>
        ) : null}
      </aside>

      <main className="site-main">
        <Outlet />
      </main>

      {isAuthenticated ? (
        <nav className="mobile-app-nav" aria-label="Navigasi aplikasi">
          {mobileAppLinks.map((item) => (
            <NavLink
              end={item.end}
              key={item.to}
              to={item.to}
              className={({ isActive }) => `mobile-app-nav-link${isActive ? " is-active" : ""}`}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <MobileAppIcon name={item.icon} />
              </svg>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      ) : null}

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-brand-block">
            <div className="footer-logo-card">
              <img className="footer-brand-logo" src={brandLogoSrc} alt={brand.name} />
            </div>
            <p>Temani langkah sehat di setiap fase kehidupan perempuan.</p>
          </div>

          <div className="footer-column">
            <h3>Menu utama</h3>
            <ul>
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>Fase kehidupan</h3>
            <ul>
              {phases.map((phase) => (
                <li key={phase.slug}>
                  <NavLink to={`/fase/${phase.slug}`}>{phase.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>Fitur aplikasi</h3>
            <ul>
              <li>
                <NavLink to="/dashboard/media-edukasi">Media Edukasi</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reminder-harian">Reminder WhatsApp</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mitos-fakta">Mitos & Fakta</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/umpan-balik">Umpan Balik</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profil">Profil Akun</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
