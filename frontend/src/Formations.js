import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";
const LEVELS = ["Débutant", "Intermédiaire", "Avancé"];
const CATEGORIES = ["Développement", "Design", "Management", "Marketing", "Data", "Autre"];

const emptyForm = { title: "", description: "", duration: "", level: "Débutant", category: "" };

function Formations() {
  const [formations, setFormations] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/formations`, { headers });
      const data = await res.json();
      setFormations(data);
    } catch { showToast("Erreur de connexion", "error"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };
  const openEdit = (f) => {
    setForm({ title: f.title, description: f.description, duration: f.duration, level: f.level, category: f.category });
    setEditId(f._id);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) { showToast("Le titre est requis", "error"); return; }
    const url = editId ? `${API}/formations/${editId}` : `${API}/formations`;
    const method = editId ? "PUT" : "POST";
    await fetch(url, { method, headers, body: JSON.stringify(form) });
    showToast(editId ? "Formation modifiée ✓" : "Formation ajoutée ✓");
    setShowModal(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/formations/${id}`, { method: "DELETE", headers });
    showToast("Formation supprimée");
    setDeleteConfirm(null);
    fetchData();
  };

  const filtered = formations.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.category?.toLowerCase().includes(search.toLowerCase())
  );

  const levelColor = (level) => {
    if (level === "Débutant") return "#22c55e";
    if (level === "Intermédiaire") return "#f59e0b";
    return "#ef4444";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .page {
          min-height: 100vh;
          background: #080812;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          padding: 88px 2rem 3rem;
        }

        /* ── HEADER ── */
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .page-title span { color: #a855f7; }

        .header-right { display: flex; align-items: center; gap: 0.75rem; }

        /* ── SEARCH ── */
        .search-box {
          position: relative;
        }
        .search-box input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          padding: 0.55rem 1rem 0.55rem 2.4rem;
          width: 240px;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-box input::placeholder { color: rgba(255,255,255,0.3); }
        .search-box input:focus { border-color: rgba(99,102,241,0.5); }
        .search-icon {
          position: absolute;
          left: 0.75rem; top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
          font-size: 0.85rem;
          pointer-events: none;
        }

        /* ── BTN ── */
        .btn-add {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #fff; border: none; border-radius: 10px;
          padding: 0.6rem 1.3rem; font-size: 0.875rem; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 0 20px rgba(99,102,241,0.35);
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-add:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(99,102,241,0.55); }

        /* ── TABLE ── */
        .table-wrapper {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
        }

        table { width: 100%; border-collapse: collapse; }

        thead {
          background: rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        th {
          padding: 1rem 1.25rem;
          text-align: left;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.35);
          font-weight: 600;
          white-space: nowrap;
        }

        td {
          padding: 1rem 1.25rem;
          font-size: 0.875rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }

        tr:last-child td { border-bottom: none; }

        tr:hover td { background: rgba(255,255,255,0.02); }

        .cell-title { font-weight: 500; color: #fff; }
        .cell-desc { color: rgba(255,255,255,0.4); font-size: 0.8rem; margin-top: 0.15rem; }

        .badge {
          display: inline-flex; align-items: center;
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          font-size: 0.72rem; font-weight: 600;
          border: 1px solid;
        }

        .badge-cat {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.3);
          color: #a5b4fc;
        }

        .duration-cell { color: rgba(255,255,255,0.6); font-size: 0.82rem; }

        .actions { display: flex; gap: 0.4rem; }

        .btn-icon {
          width: 32px; height: 32px;
          border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.5); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; transition: all 0.2s;
        }
        .btn-icon:hover { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.4); color: #a5b4fc; }
        .btn-icon.danger:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.3); color: #f87171; }

        /* ── EMPTY ── */
        .empty-state {
          text-align: center; padding: 4rem 2rem;
          color: rgba(255,255,255,0.3);
        }
        .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
        .empty-state p { font-size: 0.9rem; }

        /* ── MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          z-index: 9000;
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }

        .modal {
          background: #12121e;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 2rem;
          width: 100%; max-width: 520px;
          animation: slideUp 0.25s ease;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5);
        }

        .modal-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.75rem;
        }

        .modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem; font-weight: 700;
        }

        .btn-close {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5); cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .btn-close:hover { color: #fff; background: rgba(255,255,255,0.1); }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-full { grid-column: 1 / -1; }

        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }

        label {
          font-size: 0.78rem; font-weight: 600;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        .form-control {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          padding: 0.65rem 0.9rem; outline: none; transition: border-color 0.2s;
          width: 100%;
        }
        .form-control::placeholder { color: rgba(255,255,255,0.2); }
        .form-control:focus { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.05); }
        select.form-control option { background: #1a1a2e; }

        .modal-footer {
          display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.75rem;
        }

        .btn-cancel {
          padding: 0.65rem 1.3rem; border-radius: 10px;
          background: transparent; border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5); cursor: pointer; font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .btn-cancel:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

        .btn-save {
          padding: 0.65rem 1.5rem; border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border: none; color: #fff; cursor: pointer; font-size: 0.875rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 0 20px rgba(99,102,241,0.35);
          transition: all 0.2s;
        }
        .btn-save:hover { box-shadow: 0 0 30px rgba(99,102,241,0.55); }

        /* ── DELETE CONFIRM ── */
        .confirm-box {
          background: #12121e; border: 1px solid rgba(239,68,68,0.25);
          border-radius: 16px; padding: 2rem; max-width: 400px; width: 100%;
          animation: slideUp 0.2s ease;
          box-shadow: 0 0 40px rgba(239,68,68,0.1);
        }
        .confirm-box h3 { font-family: 'Syne', sans-serif; font-size: 1.1rem; margin: 0 0 0.5rem; }
        .confirm-box p { color: rgba(255,255,255,0.45); font-size: 0.875rem; margin: 0 0 1.5rem; }
        .confirm-actions { display: flex; gap: 0.75rem; justify-content: flex-end; }
        .btn-danger {
          padding: 0.6rem 1.3rem; border-radius: 10px;
          background: #ef4444; border: none; color: #fff;
          cursor: pointer; font-size: 0.875rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .btn-danger:hover { background: #dc2626; }

        /* ── TOAST ── */
        .toast {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
          padding: 0.85rem 1.4rem;
          border-radius: 12px; font-size: 0.875rem; font-weight: 500;
          animation: slideUp 0.3s ease;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          font-family: 'DM Sans', sans-serif;
        }
        .toast.success { background: #166534; border: 1px solid #22c55e; color: #bbf7d0; }
        .toast.error   { background: #7f1d1d; border: 1px solid #ef4444; color: #fecaca; }

        /* ── LOADING ── */
        .loading { text-align: center; padding: 5rem; color: rgba(255,255,255,0.3); }
        .spinner {
          width: 40px; height: 40px; border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.08);
          border-top-color: #6366f1;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── COUNT ── */
        .count-badge {
          background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.25);
          border-radius: 999px; padding: 0.2rem 0.7rem;
          font-size: 0.75rem; color: #a5b4fc; font-weight: 600;
        }

        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
          table { font-size: 0.8rem; }
          th, td { padding: 0.75rem; }
        }
      `}</style>

      <div className="page">
        {/* HEADER */}
        <div className="page-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h1 className="page-title">Mes <span>formations</span></h1>
            <span className="count-badge">{formations.length}</span>
          </div>

          <div className="header-right">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher..."
              />
            </div>
            <button className="btn-add" onClick={openAdd}>＋ Ajouter</button>
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="loading">
            <div className="spinner" />
            <p>Chargement…</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Formation</th>
                  <th>Catégorie</th>
                  <th>Niveau</th>
                  <th>Durée</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="empty-state">
                        <div className="empty-icon">🗂️</div>
                        <p>Aucune formation trouvée.<br />Cliquez sur "Ajouter" pour commencer.</p>
                      </div>
                    </td>
                  </tr>
                ) : filtered.map(f => (
                  <tr key={f._id}>
                    <td>
                      <div className="cell-title">{f.title}</div>
                      {f.description && <div className="cell-desc">{f.description.slice(0, 60)}{f.description.length > 60 ? "…" : ""}</div>}
                    </td>
                    <td>
                      {f.category && <span className="badge badge-cat">{f.category}</span>}
                    </td>
                    <td>
                      <span className="badge" style={{
                        color: levelColor(f.level),
                        borderColor: levelColor(f.level) + "55",
                        background: levelColor(f.level) + "18",
                      }}>
                        {f.level}
                      </span>
                    </td>
                    <td className="duration-cell">{f.duration || "—"}</td>
                    <td>
                      <div className="actions">
                        <button className="btn-icon" title="Modifier" onClick={() => openEdit(f)}>✏️</button>
                        <button className="btn-icon danger" title="Supprimer" onClick={() => setDeleteConfirm(f)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">{editId ? "✏️ Modifier la formation" : "➕ Nouvelle formation"}</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="form-grid">
              <div className="form-group form-full">
                <label>Titre *</label>
                <input className="form-control" placeholder="Ex : React avancé" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>

              <div className="form-group form-full">
                <label>Description</label>
                <textarea className="form-control" rows={3} placeholder="Décrivez la formation…" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: "none" }} />
              </div>

              <div className="form-group">
                <label>Catégorie</label>
                <select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">— Sélectionner —</option>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Niveau</label>
                <select className="form-control" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
                  {LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>

              <div className="form-group form-full">
                <label>Durée</label>
                <input className="form-control" placeholder="Ex : 3 jours, 20h…" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn-save" onClick={handleSubmit}>{editId ? "Enregistrer" : "Ajouter"}</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setDeleteConfirm(null); }}>
          <div className="confirm-box">
            <h3>🗑 Supprimer la formation ?</h3>
            <p>« {deleteConfirm.title} » sera définitivement supprimée. Cette action est irréversible.</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>Annuler</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteConfirm._id)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
}

export default Formations;
