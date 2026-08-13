import { useState } from "react";
import { createSubmission } from "../api.js";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function ContactForm({ onSubmitted }) {
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState({ state: "idle", msg: "" }); // idle | loading | ok | err

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", msg: "" });

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => data.append(key, val));
      if (imageFile) data.append("image", imageFile);

      const res = await createSubmission(data);
      setStatus({ state: "ok", msg: "Thanks! We'll reach out within one business day." });
      setForm(initialForm);
      setImageFile(null);
      setPreview(null);
      onSubmitted?.(res.data.data);
    } catch (err) {
      setStatus({
        state: "err",
        msg: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <section className="form-section" id="apply">
      <div className="container">
        <div className="form-wrap">
          <div>
            <div className="eyebrow">Free Consultation</div>
            <h2>Tell us about your goals — we'll take it from there.</h2>
            <p style={{ color: "rgba(247,245,240,0.7)", maxWidth: 380 }}>
              Share your details and, if you have one, a photo of your latest academic
              transcript or marksheet. An advisor will follow up by email.
            </p>
          </div>

          <form className="form-card" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="field">
              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
              />
            </div>

            <div className="field">
              <label htmlFor="message">Message (optional)</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder="Preferred country, current grade, questions..."
              />
            </div>

            <div className="field">
              <label htmlFor="image">Attach a document / photo (optional)</label>
              <label className="field-file" htmlFor="image">
                {preview ? (
                  <img className="file-preview" src={preview} alt="Selected preview" />
                ) : null}
                {imageFile ? imageFile.name : "Click to choose an image (jpg, png, webp — up to 5MB)"}
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={{ display: "none" }}
              />
            </div>

            <button className="btn btn-primary" type="submit" disabled={status.state === "loading"}>
              {status.state === "loading" ? "Sending..." : "Send My Details"}
            </button>

            {status.state === "ok" && <div className="form-msg ok">{status.msg}</div>}
            {status.state === "err" && <div className="form-msg err">{status.msg}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
