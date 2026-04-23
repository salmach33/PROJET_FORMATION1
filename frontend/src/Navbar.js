import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          background: rgba(10, 10, 20, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'DM Sans', sans-serif;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }

        .navbar-brand .logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          box-shadow: 0 0 20px rgba(99,102,241,0.4);
        }

        .navbar-brand .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .navbar-brand .logo-text span {
          color: #a855f7;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .nav-link {
          text-decoration: none;
          color: rgba(255,255,255,0.55);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.45rem 1rem;
          border-radius: 8px;
          transition: all 0.2s;
          letter-spacing: 0.01em;
        }

        .nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.08);
        }

        .nav-link.active {
          color: #fff;
          background: rgba(99,102,241,0.18);
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 0.3rem 0.9rem 0.3rem 0.4rem;
        }

        .user-avatar {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
        }

        .user-name {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }

        .btn-logout {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
          font-family: 'DM Sans', sans-serif;
          padding: 0.4rem 0.9rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          border-color: #ef4444;
          color: #ef4444;
          background: rgba(239,68,68,0.08);
        }

        .btn-nav-auth {
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.45rem 1.1rem;
          border-radius: 9px;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .btn-login {
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
        }
        .btn-login:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

        .btn-register {
          color: #fff;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border: none;
          box-shadow: 0 0 16px rgba(99,102,241,0.35);
        }
        .btn-register:hover { box-shadow: 0 0 24px rgba(99,102,241,0.55); transform: translateY(-1px); }
      `}</style>

      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <div className="logo-icon">🎓</div>
          <span className="logo-text">Formation<span>App</span></span>
        </Link>

        {user && (
          <div className="navbar-links">
            <Link to="/" className={`nav-link${isActive("/") ? " active" : ""}`}>Accueil</Link>
            <Link to="/formations" className={`nav-link${isActive("/formations") ? " active" : ""}`}>Formations</Link>
          </div>
        )}

        <div className="navbar-right">
          {user ? (
            <>
              <div className="user-pill">
                <div className="user-avatar">{user.name?.[0] || "U"}</div>
                <span className="user-name">{user.name}</span>
              </div>
              <button className="btn-logout" onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-nav-auth btn-login">Connexion</Link>
              <Link to="/register" className="btn-nav-auth btn-register">S'inscrire</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
