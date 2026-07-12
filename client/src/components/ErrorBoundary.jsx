import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="site-main">
          <section className="content-section content-shell">
            <div className="article-hero card">
              <h1>Terjadi kendala.</h1>
              <p>Coba muat ulang halaman. Jika masih terjadi, coba lagi beberapa saat.</p>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
