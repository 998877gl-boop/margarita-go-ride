import "./landing.css";

export default function App() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="header-inner">
            <div className="logo">
              <span className="logo-icon">🛵</span>
              <span className="logo-text">Margarita Go Ride</span>
            </div>
            <div className="checkpoint-badge">Checkpoint 1 — Agent 4 Buildathon</div>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">Proyecto Buildathon 2026</div>
          <h1 className="hero-title">
            Margarita Go Ride<br />
            <span className="hero-title-accent">× A.L.M.A.</span>
          </h1>
          <p className="hero-tagline">
            Alquiler de vehículos en 90 segundos — Isla de Margarita
          </p>
          <div className="hero-cta-group">
            <a href="#resumen" className="btn btn-primary">Conoce el proyecto</a>
            <a href="#articulo" className="btn btn-outline">Leer artículo</a>
          </div>
        </div>
        <div className="hero-glow" />
      </section>

      <section className="resumen" id="resumen">
        <div className="container">
          <div className="section-label">Resumen</div>
          <h2 className="section-title">¿De qué trata este proyecto?</h2>
          <div className="resumen-grid">
            <div className="resumen-text">
              <p>
                {/* EDITABLE: Reemplaza este párrafo con tu descripción principal */}
                Margarita Go Ride es una plataforma de alquiler de vehículos diseñada específicamente
                para la Isla de Margarita, Venezuela. El sistema permite a los turistas y locales
                reservar motos, cuatrimotos y vehículos en menos de 90 segundos, eliminando el
                papeleo y las largas esperas tradicionales del sector.
              </p>
              <p>
                {/* EDITABLE: Contexto del chatbot A.L.M.A. */}
                A.L.M.A. (Asistente de Logística y Movilidad Automatizada) es el cerebro inteligente
                detrás de la plataforma. Integrado como chatbot de Telegram, A.L.M.A. guía al usuario
                durante todo el proceso: desde la selección del vehículo, verificación de disponibilidad,
                hasta la confirmación de la reserva y las instrucciones de recogida.
              </p>
              <p>
                {/* EDITABLE: Impacto esperado / visión */}
                Este proyecto fue desarrollado como parte del Agent 4 Buildathon 2026, con el objetivo
                de demostrar cómo la inteligencia artificial conversacional puede transformar industrias
                tradicionales en mercados emergentes, comenzando por el turismo en la Isla de Margarita.
              </p>
            </div>
            <div className="resumen-stats">
              <div className="stat-card">
                <div className="stat-number">90s</div>
                <div className="stat-label">Reserva completa</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Asistencia A.L.M.A.</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Digital y sin papel</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-label">Características</div>
          <h2 className="section-title">Lo que hace especial a A.L.M.A.</h2>
          <ul className="features-list">
            <li className="feature-item">
              <span className="feature-icon">⚡</span>
              <div>
                <strong>Reservas ultrarrápidas</strong>
                <p>Proceso de alquiler completado en 90 segundos o menos, sin formularios complejos.</p>
              </div>
            </li>
            <li className="feature-item">
              <span className="feature-icon">🤖</span>
              <div>
                <strong>Chatbot inteligente en Telegram</strong>
                <p>A.L.M.A. entiende lenguaje natural y guía al usuario paso a paso en español.</p>
              </div>
            </li>
            <li className="feature-item">
              <span className="feature-icon">📊</span>
              <div>
                <strong>Dashboard en tiempo real</strong>
                <p>Panel de control para el operador con estadísticas de uso, mensajes y usuarios activos.</p>
              </div>
            </li>
            <li className="feature-item">
              <span className="feature-icon">📱</span>
              <div>
                <strong>PWA instalable</strong>
                <p>La app funciona sin internet y se puede instalar como app nativa en cualquier dispositivo.</p>
              </div>
            </li>
            <li className="feature-item">
              <span className="feature-icon">🔒</span>
              <div>
                <strong>Seguridad y trazabilidad</strong>
                <p>Todas las conversaciones y reservas quedan registradas con historial completo y auditable.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="galeria">
        <div className="container">
          <div className="section-label">Galería</div>
          <h2 className="section-title">El proyecto en imágenes</h2>
          <div className="galeria-grid">
            {[
              { label: "Dashboard principal", icon: "📊" },
              { label: "Chat con A.L.M.A.", icon: "💬" },
              { label: "Flota de vehículos", icon: "🛵" },
              { label: "Proceso de reserva", icon: "📋" },
              { label: "Vista móvil", icon: "📱" },
            ].map((item, i) => (
              <div className="galeria-item" key={i}>
                <div className="galeria-placeholder">
                  <span className="galeria-icon">{item.icon}</span>
                  <span className="galeria-label">{item.label}</span>
                  <span className="galeria-hint">[ Reemplaza con tu imagen ]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="articulo" id="articulo">
        <div className="container">
          <div className="section-label">Artículo</div>
          <div className="articulo-content">
            <h2 className="articulo-title">
              Cómo la IA conversacional puede transformar el turismo en Venezuela
            </h2>
            <div className="articulo-meta">
              <span>Checkpoint 1 · Agent 4 Buildathon 2026</span>
              <span>·</span>
              <span>Isla de Margarita, Venezuela</span>
            </div>
            <div className="articulo-body">
              <p>
                {/* EDITABLE: Introducción del artículo */}
                El sector turístico en la Isla de Margarita enfrenta un reto histórico: miles de visitantes
                llegan cada año buscando experiencias de movilidad flexibles, pero los procesos de alquiler
                siguen siendo analógicos, lentos y dependientes de presencia física. Margarita Go Ride
                nació para resolver exactamente ese problema.
              </p>
              <h3>El problema que resolvemos</h3>
              <p>
                {/* EDITABLE: Desarrollo del problema */}
                Cuando un turista llega a Margarita y quiere alquilar una moto para explorar la isla, el
                proceso tradicional puede tomar entre 30 y 60 minutos: buscar una agencia, negociar precio,
                llenar formularios en papel, hacer copias de documentos y esperar disponibilidad. Con A.L.M.A.,
                ese mismo proceso ocurre en menos de 90 segundos desde el teléfono del usuario.
              </p>
              <h3>La solución tecnológica</h3>
              <p>
                {/* EDITABLE: Descripción técnica */}
                A.L.M.A. combina un chatbot de Telegram con una base de datos en tiempo real y un panel
                de control web accesible desde cualquier dispositivo. El operador ve en tiempo real qué
                vehículos están disponibles, quién los está solicitando, y puede confirmar o ajustar
                disponibilidad con un solo mensaje.
              </p>
              <h3>Por qué Telegram</h3>
              <p>
                {/* EDITABLE: Justificación de la plataforma */}
                Telegram tiene más de 10 millones de usuarios activos en Venezuela y funciona con conexiones
                de datos limitadas. Es la plataforma ideal para llegar a turistas y locales sin requerir
                que descarguen una app adicional. A.L.M.A. vive donde el usuario ya está.
              </p>
              <blockquote className="articulo-quote">
                "El mejor producto no es el más complejo. Es el que lleva al usuario del problema a la
                solución en el menor tiempo posible."
              </blockquote>
              <p>
                {/* EDITABLE: Conclusión / próximos pasos */}
                Este Checkpoint 1 demuestra que la infraestructura tecnológica está funcionando: el bot
                recibe mensajes, los guarda en base de datos, el dashboard muestra estadísticas en vivo,
                y la PWA es instalable offline. Los próximos checkpoints integrarán el flujo completo
                de reservas, pagos y confirmaciones automáticas.
              </p>
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
            <div className="footer-meta">
              Checkpoint 1 — Agent 4 Buildathon 2026
            </div>
            <div className="footer-links">
              <a href="#resumen">Proyecto</a>
              <a href="#articulo">Artículo</a>
              <span className="footer-divider">·</span>
              <span className="footer-credit">Built with Replit Agent 4</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
