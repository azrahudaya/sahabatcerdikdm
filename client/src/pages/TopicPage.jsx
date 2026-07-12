import PageMeta from "../components/PageMeta.jsx";
import { Link } from "react-router-dom";

export default function TopicPage({ page }) {
  return (
    <section className="content-section">
      <PageMeta title={page.title} description={page.intro} />
      <div className="article-hero topic-hero">
        <div>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
      </div>

      {page.callout ? (
        <div className="callout-card">
          <strong>Intinya</strong>
          <p>{page.callout}</p>
        </div>
      ) : null}

      {page.sections ? (
        <div className="topic-section-grid">
          {page.sections.map((section) => (
            <article className="topic-section-card" key={section.title}>
              <div className="topic-section-head">
                <h2>{section.title}</h2>
              </div>
              <div className="topic-section-body">
                <p>{section.body}</p>
                <ul className="topic-point-list">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {page.items ? (
        <div className="faq-grid">
          {page.items.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      ) : null}

      {page.nextActions ? (
        <div className="topic-next-card">
          <div>
            <h2>Langkah berikutnya.</h2>
            <p>Pilih aksi yang paling dekat dengan kebutuhan Anda sekarang.</p>
          </div>
          <div className="topic-next-actions">
            {page.nextActions.map((action, index) => (
              <Link
                className={`button ${index === 0 ? "button-primary" : "button-secondary"}`}
                key={action.label}
                to={action.to}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
