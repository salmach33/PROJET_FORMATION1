import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function Register({ onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.email || !form.password) { setError("Tous les champs sont requis"); return; }
    if (form.password.length < 6) { setError("Le mot de passe doit contenir au moins 6 caractères"); return; }
    if (form.password !== form.confirm) { setError("Les mots de passe ne correspondent pas"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Erreur d'inscription"); return; }

      localStorage.setItem("token", data.token);
      onLogin({ name: data.name, email: data.email });
      navigate("/formations");
    } catch { setError("Impossible de joindre le serveur"); }
    finally { setLoading(false); }
  };

  const strength = (pwd) => {
    if (!pwd) return 0;
    let s = 0;
    if (pwd.length >= 6) s++;
    if (pwd.length >= 10) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };

  const s = strength(form.password);
  const strengthColors = ["", "#ef4444", "#f97316", "#f59e0b", "#22c55e", "#16a34a"];
  const strengthLabels = ["", "Très faible", "Faible", "Moyen", "Fort", "Très fort"];

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
          width: 100%; max-width: 440px;
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
          text-align: center; color: #fff; margin-bottom: 0.4rem;
        }
        .auth-sub {
          text-align: center; color: rgba(255,255,255,0.4);
          font-size: 0.875rem; margin-bottom: 2rem;
        }

        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

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

        .strength-bar {
          display: flex; gap: 4px; margin-top: 0.4rem;
        }
        .strength-segment {
          flex: 1; height: 4px; border-radius: 999px;
          background: rgba(255,255,255,0.08);
          transition: background 0.3s;
        }

        .strength-label {
          font-size: 0.72rem; margin-top: 0.25rem;
          font-weight: 500;
        }

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
          text-align: center; margin-top: 1.5rem;
          font-size: 0.875rem; color: rgba(255,255,255,0.35);
        }
        .auth-footer a { color: #a5b4fc; text-decoration: none; font-weight: 500; }
        .auth-footer a:hover { text-decoration: underline; }

        .terms {
          text-align: center; font-size: 0.75rem; color: rgba(255,255,255,0.2);
          margin-top: 1.2rem; line-height: 1.5;
        }

        .spinner-sm {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="auth-logo-icon">🎓</div>
            <div className="auth-logo-text">Formation<span>App</span></div>
          </div>

          <h1 className="auth-title">Créer un compte</h1>
          <p className="auth-sub">Rejoignez la plateforme gratuitement</p>

          {error && <div className="error-msg">⚠️ {error}</div>}

          <div className="form-group">
            <label className="form-label">Nom complet</label>
            <input className="form-input" type="text" placeholder="Jean Dupont"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="vous@exemple.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input className="form-input" type="password" placeholder="Minimum 6 caractères"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            {form.password && (
              <>
                <div className="strength-bar">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="strength-segment"
                      style={{ background: i <= s ? strengthColors[s] : undefined }} />
                  ))}
                </div>
                <div className="strength-label" style={{ color: strengthColors[s] }}>
                  {strengthLabels[s]}
                </div>
              </>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Confirmer le mot de passe</label>
            <input className="form-input" type="password" placeholder="Répétez le mot de passe"
              value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={form.confirm && form.password !== form.confirm ? { borderColor: "rgba(239,68,68,0.5)" } : {}} />
          </div>

          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? <div className="spinner-sm" /> : "Créer mon compte →"}
          </button>

          <p className="terms">En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.</p>

          <div className="auth-footer">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
