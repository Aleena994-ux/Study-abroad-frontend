import { useEffect, useState, useCallback } from "react";
import { getSubmissions, deleteSubmission } from "../api.js";

export default function AdminList({ refreshKey }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getSubmissions();
      setItems(res.data.data);
    } catch (err) {
      setError("Could not load submissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this submission? This also removes its uploaded image.")) return;
    setDeletingId(id);
    try {
      await deleteSubmission(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="admin">
      <div className="container">
        <div className="admin-head">
          <div>
            <div className="eyebrow">Internal</div>
            <h2>Submitted Leads</h2>
          </div>
          <button className="btn btn-ghost" style={{ color: "var(--navy)", borderColor: "var(--hairline)" }} onClick={load}>
            Refresh
          </button>
        </div>

        {loading && <div className="empty-state">Loading submissions...</div>}
        {!loading && error && <div className="empty-state">{error}</div>}
        {!loading && !error && items.length === 0 && (
          <div className="empty-state">No submissions yet — the form above will populate this list.</div>
        )}

        {!loading && !error && items.length > 0 && (
          <table className="lead-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Submitted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.imagePath ? (
                      <img className="lead-thumb" src={item.imagePath} alt={`${item.name} upload`} />
                    ) : (
                      <div className="lead-thumb-empty" />
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone || "—"}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                    >
                      {deletingId === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
