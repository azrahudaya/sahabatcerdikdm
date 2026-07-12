import { useEffect, useState } from "react";

import { useAuth } from "../auth/AuthContext.jsx";
import PageMeta from "../components/PageMeta.jsx";

const dayOptions = [
  { label: "Sen", value: "senin" },
  { label: "Sel", value: "selasa" },
  { label: "Rab", value: "rabu" },
  { label: "Kam", value: "kamis" },
  { label: "Jum", value: "jumat" },
  { label: "Sab", value: "sabtu" },
  { label: "Min", value: "minggu" }
];

function createDefaultForm(user) {
  return {
    name: user?.name || "",
    phone: user?.phone || "",
    time: "07:00",
    focus: "",
    days: dayOptions.map((day) => day.value)
  };
}

export default function WhatsAppReminderPage({ page }) {
  const { token, user } = useAuth();
  const [form, setForm] = useState(() => createDefaultForm(user));
  const [whatsappStatus, setWhatsappStatus] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [editingReminderId, setEditingReminderId] = useState("");
  const [busyReminderId, setBusyReminderId] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  async function loadReminderData() {
    const [statusResponse, remindersResponse] = await Promise.all([
      fetch("/api/whatsapp/status"),
      fetch("/api/reminders/whatsapp", {
        headers: authHeaders
      })
    ]);

    if (statusResponse.ok) {
      setWhatsappStatus(await statusResponse.json());
    }

    if (remindersResponse.ok) {
      const data = await remindersResponse.json();
      setReminders(data.reminders || []);
    }
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    loadReminderData().catch(() => {
      setError("Status reminder belum bisa dimuat.");
    });
  }, [token]);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      name: current.name || user?.name || "",
      phone: current.phone || user?.phone || ""
    }));
  }, [user]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function toggleDay(day) {
    setForm((current) => ({
      ...current,
      days: current.days.includes(day)
        ? current.days.filter((item) => item !== day)
        : [...current.days, day]
    }));
  }

  async function saveReminder(event) {
    event.preventDefault();
    setIsSaving(true);
    setNotice("");
    setError("");

    try {
      const response = await fetch(
        editingReminderId
          ? `/api/reminders/whatsapp/${editingReminderId}`
          : "/api/reminders/whatsapp",
        {
          method: editingReminderId ? "PATCH" : "POST",
          headers: {
            ...authHeaders,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Reminder belum bisa disimpan.");
      }

      setNotice(editingReminderId ? "Perubahan reminder tersimpan." : "Reminder WhatsApp tersimpan.");
      setEditingReminderId("");
      setForm(createDefaultForm(user));
      await loadReminderData();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  }

  function editReminder(reminder) {
    setEditingReminderId(reminder.id);
    setForm({
      name: reminder.name || "",
      phone: reminder.phone || "",
      time: reminder.time || "07:00",
      focus: reminder.focus || "",
      days: reminder.days || []
    });
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEditing() {
    setEditingReminderId("");
    setForm(createDefaultForm(user));
    setError("");
    setNotice("");
  }

  async function updateReminderStatus(reminder) {
    setBusyReminderId(reminder.id);
    setNotice("");
    setError("");

    try {
      const response = await fetch(`/api/reminders/whatsapp/${reminder.id}`, {
        method: "PATCH",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ enabled: !reminder.enabled })
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Status reminder belum bisa diubah.");
      }

      setReminders((current) =>
        current.map((item) => item.id === reminder.id ? data.reminder : item)
      );
      setNotice(data.reminder.enabled ? "Reminder diaktifkan." : "Reminder dijeda.");
    } catch (statusError) {
      setError(statusError.message);
    } finally {
      setBusyReminderId("");
    }
  }

  async function deleteReminder(reminder) {
    if (!window.confirm("Hapus reminder ini?")) {
      return;
    }

    setBusyReminderId(reminder.id);
    setNotice("");
    setError("");

    try {
      const response = await fetch(`/api/reminders/whatsapp/${reminder.id}`, {
        method: "DELETE",
        headers: authHeaders
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Reminder belum bisa dihapus.");
      }

      setReminders((current) => current.filter((item) => item.id !== reminder.id));
      if (editingReminderId === reminder.id) {
        cancelEditing();
      }
      setNotice("Reminder dihapus.");
    } catch (deleteError) {
      setError(deleteError.message);
    } finally {
      setBusyReminderId("");
    }
  }

  async function sendTestMessage() {
    setIsTesting(true);
    setNotice("");
    setError("");

    try {
      const response = await fetch("/api/reminders/whatsapp/test", {
        method: "POST",
        headers: {
          ...authHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Pesan test belum bisa dikirim.");
      }

      const data = await response.json();
      setNotice(
        data.result?.status === "mock_sent"
          ? "Pesan test berhasil diproses."
          : "Pesan test berhasil diproses."
      );
      await loadReminderData();
    } catch (testError) {
      setError(testError.message);
    } finally {
      setIsTesting(false);
    }
  }

  return (
    <section className="content-section content-shell">
      <PageMeta title="Reminder WhatsApp" description={page.intro} />

      <div className="reminder-layout">
        <div className="reminder-copy">
          <h1>{page.title}</h1>
          <p>{page.intro}</p>

          <div className="whatsapp-status-card">
            <span>Status WhatsApp</span>
            <strong>{whatsappStatus?.status === "ready" ? "Terhubung" : "Belum terhubung"}</strong>
            <p>Reminder aktif saat WhatsApp terhubung.</p>
          </div>
        </div>

        <form className="reminder-form-card" onSubmit={saveReminder}>
          <div className="reminder-form-heading">
            <h2>{editingReminderId ? "Ubah reminder" : "Buat reminder"}</h2>
            {editingReminderId ? (
              <button className="text-button" type="button" onClick={cancelEditing}>Batal</button>
            ) : null}
          </div>
          <label>
            Nama penerima
            <input
              placeholder="Contoh: Azra"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </label>

          <label>
            Nomor WhatsApp
            <input
              inputMode="tel"
              placeholder="Contoh: 081234567890"
              required
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </label>

          <label>
            Jam reminder
            <input
              required
              type="time"
              value={form.time}
              onChange={(event) => updateField("time", event.target.value)}
            />
          </label>

          <label>
            Fokus pesan (opsional)
            <textarea
              rows="4"
              placeholder="Kosongkan untuk memakai pesan otomatis."
              value={form.focus}
              onChange={(event) => updateField("focus", event.target.value)}
            />
          </label>

          <fieldset>
            <legend>Hari aktif</legend>
            <div className="reminder-day-grid">
              {dayOptions.map((day) => (
                <label className="reminder-day" key={day.value}>
                  <input
                    checked={form.days.includes(day.value)}
                    type="checkbox"
                    onChange={() => toggleDay(day.value)}
                  />
                  <span>{day.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="reminder-form-actions">
            <button className="button button-primary" disabled={isSaving} type="submit">
              {isSaving ? "Menyimpan..." : editingReminderId ? "Simpan perubahan" : "Simpan reminder"}
            </button>
            <button
              className="button button-secondary"
              disabled={isTesting || !form.phone}
              type="button"
              onClick={sendTestMessage}
            >
              {isTesting ? "Mengirim..." : "Kirim test"}
            </button>
          </div>

          {notice ? <p className="reminder-notice">{notice}</p> : null}
          {error ? <p className="feedback-error">{error}</p> : null}
        </form>
      </div>

      <div className="reminder-list-card">
        <div className="section-heading">
          <h2>Reminder tersimpan.</h2>
          <p>Dikirim sesuai jadwal.</p>
        </div>

        {reminders.length ? (
          <div className="reminder-list">
            {reminders.map((reminder) => (
              <article className="reminder-list-item" key={reminder.id}>
                <div className="reminder-list-head">
                  <span>{reminder.time}</span>
                  <span className={`reminder-status${reminder.enabled ? " is-active" : ""}`}>
                    {reminder.enabled ? "Aktif" : "Dijeda"}
                  </span>
                </div>
                <strong>{reminder.name || "Sahabat"} - {reminder.phone}</strong>
                <p>{reminder.focus}</p>
                <small>
                  {reminder.days?.length ? reminder.days.join(", ") : "setiap hari"}
                  {reminder.lastSentAt ? ` | terakhir terkirim ${new Date(reminder.lastSentAt).toLocaleString("id-ID")}` : ""}
                  {reminder.lastError ? ` | error: ${reminder.lastError}` : ""}
                </small>
                <div className="reminder-item-actions">
                  <button
                    className="button button-secondary button-compact"
                    disabled={busyReminderId === reminder.id}
                    type="button"
                    onClick={() => updateReminderStatus(reminder)}
                  >
                    {reminder.enabled ? "Jeda" : "Aktifkan"}
                  </button>
                  <button
                    className="button button-secondary button-compact"
                    disabled={busyReminderId === reminder.id}
                    type="button"
                    onClick={() => editReminder(reminder)}
                  >
                    Ubah
                  </button>
                  <button
                    className="text-button text-button-danger"
                    disabled={busyReminderId === reminder.id}
                    type="button"
                    onClick={() => deleteReminder(reminder)}
                  >
                    Hapus
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-history">Belum ada reminder WhatsApp yang tersimpan.</p>
        )}
      </div>
    </section>
  );
}
