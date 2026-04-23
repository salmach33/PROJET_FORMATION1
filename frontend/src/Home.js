import { Link } from "react-router-dom";

function Home({ user }) {
  const stats = [
    { value: "120+", label: "Formations" },
    { value: "3 400", label: "Apprenants" },
    { value: "98%", label: "Satisfaction" },
  ];

  const features = [
    { icon: "🚀", title: "Apprentissage rapide", desc: "Des parcours structurés pour progresser efficacement à votre rythme." },
    { icon: "📊", title: "Suivi en temps réel", desc: "Visualisez vos progrès et gérez vos formations depuis un tableau de bord centralisé." },
    { icon: "🔐", title: "Accès sécurisé", desc: "Vos données protégées avec une authentification robuste et chiffrée." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .home-page {
          min-height: 100vh;
          background: #080812;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          padding-top: 64px;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          padding: 7rem 2rem 5rem;
          text-align: center;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: -100px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 500px;
          background: radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 999px;
          padding: 0.35rem 1rem;
          font-size: 0.78rem;
          color: #a5b4fc;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0 auto 1.5rem;
          max-width: 800px;
        }

        .hero h1 .gradient-text {
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.5);
          max-width: 520px;
          margin: 0 auto 3rem;
          line-height: 1.7;
          font-weight: 300;
        }

        .hero-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2rem;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #fff;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          box-shadow: 0 0 30px rgba(99,102,241,0.45);
          transition: all 0.25s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(99,102,241,0.6); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2rem;
          background: transparent;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.25s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-secondary:hover { color: #fff; border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.05); }

        /* ── STATS ── */
        .stats-row {
          display: flex;
          justify-content: center;
          gap: 0;
          margin: 4rem auto;
          max-width: 600px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
        }

        .stat-item {
          flex: 1;
          text-align: center;
          padding: 1.5rem 1rem;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .stat-item:last-child { border-right: none; }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 1.9rem;
          font-weight: 800;
          background: linear-gradient(135deg, #818cf8, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 0.25rem;
        }

        /* ── FEATURES ── */
        .features-section {
          padding: 4rem 2rem 6rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-label {
          text-align: center;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #818cf8;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: 3.5rem;
          letter-spacing: -0.02em;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s;
        }
        .feature-card:hover {
          background: rgba(99,102,241,0.06);
          border-color: rgba(99,102,241,0.25);
          transform: translateY(-4px);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1.2rem;
          display: block;
        }

        .feature-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 0.6rem;
        }

        .feature-desc {
          color: rgba(255,255,255,0.45);
          font-size: 0.88rem;
          line-height: 1.65;
        }

        /* ── WELCOME BANNER (logged in) ── */
        .welcome-banner {
          margin: 2rem auto;
          max-width: 700px;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1));
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .welcome-text { font-size: 1rem; color: rgba(255,255,255,0.85); }
        .welcome-text strong { color: #fff; font-family: 'Syne', sans-serif; }
      `}</style>

      <div className="home-page">
        <section className="hero">
          <div className="hero-glow" />


          <h1>
            Gérez vos<br />
            <span className="gradient-text">formations</span> 
          </h1>

          <p className="hero-sub">
            Un outil centralisé pour créer, organiser et suivre toutes vos formations professionnelles en toute simplicité.
          </p>

          {user ? (
            <div className="welcome-banner" style={{ margin: "0 auto 2rem" }}>
              <div className="welcome-text">
                Bienvenue, <strong>{user.name}</strong> 👋 — Prêt à gérer vos formations ?
              </div>
              <Link to="/formations" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
                Voir les formations →
              </Link>
            </div>
          ) : (
            <div className="hero-cta">
              <Link to="/register" className="btn-primary">Commencer gratuitement →</Link>
              <Link to="/login" className="btn-secondary">Se connecter</Link>
            </div>
          )}
        </section>

        <div className="stats-row">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="features-section">
          <p className="section-label">Pourquoi nous choisir</p>
          <h2 className="section-title">Tout ce dont vous avez besoin</h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <span className="feature-icon">{f.icon}</span>
                <div className="feature-title">{f.title}</div>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
