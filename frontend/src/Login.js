import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) { setError("Tous les champs sont requis"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Erreur de connexion"); return; }

      localStorage.setItem("token", data.token);
      onLogin({ name: data.name, email: data.email });
      navigate("/formations");
    } catch { setError("Impossible de joindre le serveur"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .auth-page {
          min-height: 100vh;
          background: #080812;
          display: flex; align-items: center; justify-content: center;
          padding: 2rem;
          font-family: 'DM Sans', sans-serif;
        }

        .auth-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 2.5rem;
          width: 100%; max-width: 420px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.4);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp { from { opacity:0; transform: translateY(24px) } to { opacity:1; transform: translateY(0) } }

        .auth-logo {
          display: flex; align-items: center; gap: 0.6rem;
          justify-content: center; margin-bottom: 2rem;
        }
        .auth-logo-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 0 24px rgba(99,102,241,0.4);
        }
        .auth-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem; font-weight: 800; color: #fff;
        }
        .auth-logo-text span { color: #a855f7; }

        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem; font-weight: 800;
          text-align: center; color: #fff;
          margin-bottom: 0.4rem;
        }
        .auth-sub {
          text-align: center; color: rgba(255,255,255,0.4);
          font-size: 0.875rem; margin-bottom: 2rem;
        }

        .form-group { margin-bottom: 1.1rem; }

        .form-label {
          display: block; font-size: 0.78rem; font-weight: 600;
          color: rgba(255,255,255,0.45); text-transform: uppercase;
          letter-spacing: 0.06em; margin-bottom: 0.4rem;
        }

        .form-input {
          width: 100%; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
          color: #fff; font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          padding: 0.75rem 1rem; outline: none; transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.2); }
        .form-input:focus { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.05); }

        .error-msg {
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25);
          border-radius: 10px; color: #f87171;
          padding: 0.75rem 1rem; font-size: 0.85rem; margin-bottom: 1rem;
        }

        .btn-submit {
          width: 100%; padding: 0.85rem;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border: none; border-radius: 12px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 600;
          cursor: pointer; margin-top: 0.5rem;
          box-shadow: 0 0 24px rgba(99,102,241,0.4);
          transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        }
        .btn-submit:hover { box-shadow: 0 0 36px rgba(99,102,241,0.6); transform: translateY(-1px); }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .auth-footer {
          text-align: center; margin-top: 1.75rem;
          font-size: 0.875rem; color: rgba(255,255,255,0.35);
        }
        .auth-footer a { color: #a5b4fc; text-decoration: none; font-weight: 500; }
        .auth-footer a:hover { text-decoration: underline; }

        .spinner-sm {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1;
          height: 1px; background: rgba(255,255,255,0.08);
        }
        .divider span { font-size: 0.75rem; color: rgba(255,255,255,0.25); }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="auth-logo-icon">🎓</div>
            <div className="auth-logo-text">Formation<span>App</span></div>
          </div>

          <h1 className="auth-title">Bon retour !</h1>
          <p className="auth-sub">Connectez-vous à votre compte</p>

          {error && <div className="error-msg">⚠️ {error}</div>}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="vous@exemple.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input className="form-input" type="password" placeholder="••••••••"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>

          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? <div className="spinner-sm" /> : "Se connecter →"}
          </button>

          <div className="divider"><span>ou</span></div>

          <div className="auth-footer">
            Pas encore de compte ? <Link to="/register">S'inscrire</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
