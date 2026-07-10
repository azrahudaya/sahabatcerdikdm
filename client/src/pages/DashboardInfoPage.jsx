import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import PageMeta from "../components/PageMeta.jsx";

export default function DashboardInfoPage({ page }) {
  return (
    <section className="content-section content-shell">
      <PageMeta title={page.title} description={page.intro} />
      <div className="article-hero info-hero">
        <div>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
      </div>

      {page.placeholders ? (
        <div className="placeholder-grid">
          {page.placeholders.map((item) => (
            <ImagePlaceholder
              key={item.title}
              title={item.title}
              size={item.size}
              note={item.note}
            />
          ))}
        </div>
      ) : null}

      <div className="info-card-grid">
        {page.points.map((item, index) => (
          <article className="info-card" key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>

      {page.links?.length ? (
        <section className="info-link-panel">
          <h2>Link rujukan</h2>
          <div className="info-link-list">
            {page.links.map((item) => (
              <a href={item.href} key={item.href} rel="noreferrer" target="_blank">
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
