import PageMeta from "../components/PageMeta.jsx";
import { Link } from "react-router-dom";

function ActionLink({ action, isPrimary }) {
  const className = `button ${isPrimary ? "button-primary" : "button-secondary"}`;

  if (action.to.startsWith("mailto:")) {
    return <a className={className} href={action.to}>{action.label}</a>;
  }

  return <Link className={className} to={action.to}>{action.label}</Link>;
}

export default function TopicPage({ page }) {
  if (page.layout === "about") {
    return (
      <section className="content-section public-page public-about-page">
        <PageMeta title={page.title} description={page.intro} />
        <div className="public-about-hero">
          <div>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
          </div>
          {page.callout ? <p className="public-about-note">{page.callout}</p> : null}
        </div>

        <div className="public-about-grid">
          {page.sections?.map((section) => (
            <article className="public-about-card" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {page.nextActions ? (
          <div className="public-action-row">
            {page.nextActions.map((action, index) => (
              <ActionLink action={action} isPrimary={index === 0} key={action.label} />
            ))}
          </div>
        ) : null}
      </section>
    );
  }

  if (page.layout === "contact") {
    return (
      <section className="content-section public-page public-contact-page">
        <PageMeta title={page.title} description={page.intro} />
        <div className="public-contact-layout">
          <div className="public-contact-copy">
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            {page.callout ? <p className="public-contact-note">{page.callout}</p> : null}
          </div>

          <div className="public-contact-panel">
            <span>Email</span>
            <strong>hudaya.azra@gmail.com</strong>
            <p>Pertanyaan, koreksi materi, bantuan akun, atau permintaan data.</p>
            {page.nextActions ? (
              <div className="public-contact-actions">
                {page.nextActions.map((action, index) => (
                  <ActionLink action={action} isPrimary={index === 0} key={action.label} />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="public-contact-list">
          {page.sections?.slice(1).map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    );
  }

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
              <ActionLink action={action} isPrimary={index === 0} key={action.label} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
