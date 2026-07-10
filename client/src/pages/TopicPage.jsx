import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import PageMeta from "../components/PageMeta.jsx";
import { Link } from "react-router-dom";

export default function TopicPage({ page }) {
  const autoQuickFacts = !page.quickFacts && page.sections
    ? page.sections.slice(0, 3).map((section, index) => ({
        label: String(index + 1).padStart(2, "0"),
        title: section.title,
        body: section.bullets?.[0] || section.body
      }))
    : null;
  const quickFacts = page.quickFacts || autoQuickFacts;

  return (
    <section className="content-section">
      <PageMeta title={page.title} description={page.intro} />
      <div className="article-hero topic-hero card">
        <div>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>

        {page.visual ? (
          <ImagePlaceholder
            className="article-visual"
            title={page.visual.title}
            size={page.visual.size}
            note={page.visual.note}
          />
        ) : null}
      </div>

      {page.callout ? (
        <div className="callout-card">
          <strong>Catatan utama</strong>
          <p>{page.callout}</p>
        </div>
      ) : null}

      {quickFacts ? (
        <div className="quick-fact-grid">
          {quickFacts.map((item) => (
            <article className="quick-fact" key={item.title}>
              <span>{item.label}</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      ) : null}

      {page.sections ? (
        <div className="topic-section-grid">
          {page.sections.map((section, index) => (
            <article className="topic-section-card" key={section.title}>
              <div className="topic-section-head">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
              </div>
              <div className="topic-section-body">
                <p>{section.body}</p>
                {section.visual ? (
                  <ImagePlaceholder
                    className="topic-section-visual"
                    title={section.visual.title}
                    size={section.visual.size}
                    note={section.visual.note}
                  />
                ) : null}
                <ul className="topic-point-list">
                  {section.bullets.map((item, bulletIndex) => (
                    <li key={item}>
                      <span>{String(bulletIndex + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
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
            <h2>Lanjutkan dari sini.</h2>
            <p>Pilih langkah berikutnya agar informasi tidak berhenti sebagai bacaan saja.</p>
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
