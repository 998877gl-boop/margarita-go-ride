import { useState, useEffect } from "react";
import { t, type Lang } from "./translations";
import "./landing.css";

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("lang") as Lang) ?? "en";
  });
  const [fading, setFading] = useState(false);

  function switchLang(next: Lang) {
    if (next === lang) return;
    setFading(true);
    setTimeout(() => {
      setLang(next);
      localStorage.setItem("lang", next);
      setFading(false);
    }, 180);
  }

  const tx = t[lang];

  return (
    <div className={`lang-wrapper${fading ? " fading" : ""}`}>
      <header className="site-header">
        <div className="container">
          <div className="header-inner">
            <div className="logo">
              <span className="logo-icon">🛵</span>
              <div className="logo-text-group">
                <span className="logo-text">Margarita Go Ride × A.L.M.A.</span>
                <span className="logo-sub">{tx.header_subtitle}</span>
              </div>
            </div>
            <div className="header-right">
              <div className="checkpoint-badge">{tx.header_badge}</div>
              <div className="lang-toggle">
                <button
                  className={`lang-btn${lang === "en" ? " active" : ""}`}
                  onClick={() => switchLang("en")}
                >
                  🇺🇸 EN
                </button>
                <button
                  className={`lang-btn${lang === "es" ? " active" : ""}`}
                  onClick={() => switchLang("es")}
                >
                  🇻🇪 ES
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">{tx.hero_eyebrow}</div>
          <h1 className="hero-title">
            {tx.hero_title_main}<br />
            <span className="hero-title-accent">{tx.hero_title_accent}</span>
          </h1>
          <p className="hero-tagline">{tx.hero_tagline}</p>
          <p className="hero-location">📍 {tx.hero_location}</p>
          <div className="hero-cta-group">
            <a href="#features" className="btn btn-primary">{tx.hero_cta}</a>
            <a href="#article" className="btn btn-outline">{tx.hero_cta2}</a>
          </div>
          <div className="hero-stats">
            {tx.stats.map((s, i) => (
              <div className="hero-stat" key={i}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-glow" />
      </section>

      <section className="what-section" id="what">
        <div className="container">
          <div className="section-label">{tx.what_label}</div>
          <h2 className="section-title">{tx.what_title}</h2>
          <p className="what-intro">{tx.what_p1}</p>
          <div className="problems-grid">
            <div className="problem-card">
              <span className="problem-icon">⚡</span>
              <strong>{tx.what_b1}</strong>
              <p>{tx.what_b1d}</p>
            </div>
            <div className="problem-card">
              <span className="problem-icon">🌙</span>
              <strong>{tx.what_b2}</strong>
              <p>{tx.what_b2d}</p>
            </div>
            <div className="problem-card">
              <span className="problem-icon">🗺️</span>
              <strong>{tx.what_b3}</strong>
              <p>{tx.what_b3d}</p>
            </div>
          </div>
          <p className="what-solution">{tx.what_p2}</p>
        </div>
      </section>

      <section className="audience-section">
        <div className="container">
          <div className="section-label">{tx.audience_label}</div>
          <h2 className="section-title">{tx.audience_title}</h2>
          <div className="audience-grid">
            <div className="audience-card">
              <div className="audience-card-title">{tx.audience_col1}</div>
              <ul>
                {tx.audience_col1_items.map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <div className="audience-card accent">
              <div className="audience-card-title">{tx.audience_col2}</div>
              <ul>
                {tx.audience_col2_items.map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <div className="section-label">{tx.features_label}</div>
          <h2 className="section-title">{tx.features_title}</h2>
          <div className="features-cards">
            {tx.features.map((f, i) => (
              <div className="feature-card" key={i}>
                <span className="feature-icon">{f.icon}</span>
                <strong>{f.title}</strong>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="resilience-section">
        <div className="container">
          <div className="section-label">{tx.resilience_label}</div>
          <h2 className="section-title">{tx.resilience_title}</h2>
          <div className="layers-list">
            {tx.resilience_layers.map((layer, i) => (
              <div className="layer-item" key={i}>
                <div className="layer-num">{layer.num}</div>
                <div className="layer-body">
                  <strong>{layer.title}</strong>
                  <p>{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stack-section">
        <div className="container">
          <div className="section-label">{tx.stack_label}</div>
          <h2 className="section-title">{tx.stack_title}</h2>
          <div className="stack-grid">
            {tx.stack_items.map((item, i) => (
              <div className="stack-card" key={i}>
                <span className="stack-icon">{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="design-section">
        <div className="container">
          <div className="section-label">{tx.design_label}</div>
          <h2 className="section-title">{tx.design_title}</h2>
          <div className="design-grid">
            <div className="design-block">
              <h3>{tx.design_palette}</h3>
              <div className="palette-row">
                {tx.palette.map((p, i) => (
                  <div className="palette-item" key={i}>
                    <div className="palette-swatch" style={{ background: p.color }} />
                    <span className="palette-hex">{p.color}</span>
                    <span className="palette-name">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="design-block">
              <h3>{tx.design_typography}</h3>
              <ul className="typo-list">
                {tx.design_typo_items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="a11y-note">♿ {tx.design_a11y}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flow-section">
        <div className="container">
          <div className="section-label">{tx.flow_label}</div>
          <h2 className="section-title">{tx.flow_title}</h2>
          <div className="flow-timeline">
            {tx.flow_steps.map((step, i) => (
              <div className="flow-step" key={i}>
                <div className="flow-time">{step.time}</div>
                <div className="flow-dot" />
                <div className="flow-label">{step.label}</div>
              </div>
            ))}
          </div>
          <div className="flow-total">{tx.flow_total}</div>
        </div>
      </section>

      <section className="gtm-section">
        <div className="container">
          <div className="section-label">{tx.gtm_label}</div>
          <h2 className="section-title">{tx.gtm_title}</h2>
          <div className="gtm-grid">
            {tx.gtm_pillars.map((p, i) => (
              <div className="gtm-card" key={i}>
                <span className="gtm-icon">{p.icon}</span>
                <strong>{p.title}</strong>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="competitive-section">
        <div className="container">
          <div className="section-label">{tx.competitive_label}</div>
          <h2 className="section-title">{tx.competitive_title}</h2>
          <blockquote className="competitive-highlight">
            {tx.competitive_highlight}
          </blockquote>
          <p className="competitive-vs">❌ {tx.competitive_vs}</p>
          <p className="competitive-us">✅ {tx.competitive_us}</p>
        </div>
      </section>

      <section className="articulo" id="article">
        <div className="container">
          <div className="section-label">{tx.article_label}</div>
          <div className="article-jury-badge">{tx.article_badge}</div>
          <div className="articulo-content">
            <h2 className="articulo-title">{tx.article_title}</h2>
            <p className="article-subtitle">{tx.article_subtitle}</p>
            <div className="articulo-meta">
              <span>{tx.article_meta1}</span>
              <span>·</span>
              <span>{tx.article_meta2}</span>
              <span>·</span>
              <span>{tx.article_meta3}</span>
              <span>·</span>
              <span>{tx.article_meta4}</span>
            </div>

            <div className="articulo-body">
              <p className="article-intro-text">{tx.article_intro}</p>

              <h3>{tx.article_s1_title}</h3>
              <p>{tx.article_s1_p1}</p>
              <div className="article-items-list">
                {tx.article_s1_items.map((item, i) => (
                  <div className="article-item" key={i}>
                    <strong>{item.label}:</strong> {item.desc}
                  </div>
                ))}
              </div>
              <p>{tx.article_s1_p2}</p>

              <h3>{tx.article_s2_title}</h3>
              <p>{tx.article_s2_p1}</p>
              <div className="article-audience-grid">
                <div className="article-audience-block">
                  <div className="article-audience-title">{tx.article_s2_tourists_title}</div>
                  <ul>{tx.article_s2_tourists.map((t2, i) => <li key={i}>{t2}</li>)}</ul>
                </div>
                <div className="article-audience-block accent">
                  <div className="article-audience-title">{tx.article_s2_agencies_title}</div>
                  <ul>{tx.article_s2_agencies.map((a, i) => <li key={i}>{a}</li>)}</ul>
                </div>
              </div>

              <h3>{tx.article_s3_title}</h3>
              <div className="article-features-list">
                {tx.article_s3_features.map((f, i) => (
                  <div className="article-feature" key={i}>
                    <span className="article-feature-icon">{f.icon}</span>
                    <div><strong>{f.title}</strong><p>{f.desc}</p></div>
                  </div>
                ))}
              </div>

              <h3>{tx.article_s4_title}</h3>
              <p>{tx.article_s4_intro}</p>
              <div className="article-layers">
                {tx.article_s4_layers.map((l, i) => (
                  <div className="article-layer" key={i}>
                    <span className="article-layer-num">{l.num}</span>
                    <div><strong>{l.title}</strong><p>{l.desc}</p></div>
                  </div>
                ))}
              </div>

              <h3>{tx.article_s5_title}</h3>
              <p>{tx.article_s5_intro}</p>
              <div className="article-tools-grid">
                {tx.article_s5_tools.map((tool, i) => (
                  <div className="article-tool" key={i}>
                    <span>{tool.icon}</span>
                    <div><strong>{tool.title}</strong><p>{tool.desc}</p></div>
                  </div>
                ))}
              </div>

              <h3>{tx.article_s6_title}</h3>
              <p>{tx.article_s6_p1}</p>
              <p>{tx.article_s6_p2}</p>
              <blockquote className="articulo-quote">{tx.article_quote}</blockquote>

              <h3>{tx.article_s7_title}</h3>
              <div className="article-checklist">
                {tx.article_s7_items.map((item, i) => (
                  <div className="article-check-item" key={i}>{item}</div>
                ))}
              </div>

              <p className="article-closing">{tx.article_closing}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="logo-icon">🛵</span>
              <span>Margarita Go Ride × A.L.M.A.</span>
            </div>
            <div className="footer-meta">{tx.footer_date}</div>
            <div className="footer-links">
              <a href="#what">{tx.footer_links_project}</a>
              <a href="#article">{tx.footer_links_article}</a>
              <a
                href="https://github.com/998877gl-boop/margarita-go-ride"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tx.footer_github}
              </a>
            </div>
            <div className="footer-bottom">
              <span>{tx.footer_built}</span>
              <span className="footer-divider">·</span>
              <span>{tx.footer_copyright}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
