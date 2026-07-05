import { useEffect, useState } from "react";
import { AlertCircle, Download, Inbox, KeyRound, Loader2, LogOut, RefreshCw } from "lucide-react";
import usePageMeta from "../lib/usePageMeta.js";
import { container } from "../lib/styles.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * Staff-only view of contact-form submissions. Requires the backend to run
 * with MASF_ADMIN_TOKEN set; the token is held in memory only (never stored)
 * and sent as the X-Admin-Token header. This route is not linked from the
 * site navigation and is disallowed in robots.txt.
 */
export default function Admin() {
  usePageMeta("Enquiries admin", "Staff-only listing of website enquiries.");

  // Keep this page out of search engines.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const [tokenInput, setTokenInput] = useState("");
  const [token, setToken] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [status, setStatus] = useState("signed-out"); // signed-out | loading | ready | error
  const [error, setError] = useState("");

  async function load(activeToken) {
    setStatus("loading");
    setError("");
    try {
      const response = await fetch(`${API_BASE}/api/submissions`, {
        headers: { "X-Admin-Token": activeToken },
      });
      if (response.status === 404) {
        throw new Error(
          "Admin listing is disabled. Set MASF_ADMIN_TOKEN in backend/.env and restart the backend."
        );
      }
      if (response.status === 403) {
        throw new Error("That token was not accepted. Check MASF_ADMIN_TOKEN and try again.");
      }
      if (!response.ok) {
        throw new Error(`Unexpected response from the server (HTTP ${response.status}).`);
      }
      setSubmissions(await response.json());
      setToken(activeToken);
      setStatus("ready");
    } catch (caught) {
      setError(
        caught instanceof TypeError
          ? "Could not reach the backend. Is it running on port 8000?"
          : caught.message
      );
      setStatus(token ? "ready" : "error");
    }
  }

  async function downloadAttachment(submission) {
    try {
      const response = await fetch(
        `${API_BASE}/api/submissions/${submission.id}/attachment`,
        { headers: { "X-Admin-Token": token } }
      );
      if (!response.ok) throw new Error(`Download failed (HTTP ${response.status}).`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = submission.attachment.replace(/^\d+_/, "");
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (caught) {
      setError(caught.message);
    }
  }

  if (!token) {
    return (
      <section className={`${container} pb-20 pt-32 sm:pb-28 sm:pt-36`}>
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <KeyRound className="h-8 w-8 text-brand-600" aria-hidden="true" />
          <h1 className="mt-4 font-display text-2xl font-bold text-brand-950">Enquiries admin</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Enter the admin token configured on the backend (<code className="text-xs">MASF_ADMIN_TOKEN</code>).
            The token is kept in memory only for this tab.
          </p>
          <form
            className="mt-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (tokenInput.trim()) load(tokenInput.trim());
            }}
          >
            <label htmlFor="admin-token" className="block text-sm font-semibold text-brand-950">
              Admin token
            </label>
            <input
              id="admin-token"
              type="password"
              autoComplete="off"
              value={tokenInput}
              onChange={(event) => setTokenInput(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm"
            />
            {(status === "error" || error) && (
              <p className="mt-3 flex items-start gap-2 text-xs font-medium text-red-600" role="alert">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading" || !tokenInput.trim()}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                "View enquiries"
              )}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className={`${container} pb-12 pt-28 sm:pb-16 sm:pt-32`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-brand-950">
            Enquiries
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {submissions.length} submission{submissions.length === 1 ? "" : "s"} (latest 200)
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => load(token)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-800"
          >
            <RefreshCw className={`h-4 w-4 ${status === "loading" ? "animate-spin" : ""}`} aria-hidden="true" />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              setToken("");
              setTokenInput("");
              setSubmissions([]);
              setStatus("signed-out");
              setError("");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 flex items-start gap-2 text-sm font-medium text-red-600" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {submissions.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-16 text-center">
          <Inbox className="h-10 w-10 text-slate-300" aria-hidden="true" />
          <p className="mt-4 text-sm text-slate-500">No enquiries yet.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[56rem] border-collapse bg-white text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th scope="col" className="px-4 py-3 font-semibold">#</th>
                <th scope="col" className="px-4 py-3 font-semibold">Received</th>
                <th scope="col" className="px-4 py-3 font-semibold">From</th>
                <th scope="col" className="px-4 py-3 font-semibold">Service</th>
                <th scope="col" className="px-4 py-3 font-semibold">Message</th>
                <th scope="col" className="px-4 py-3 font-semibold">Attachment</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-b border-slate-100 align-top last:border-b-0">
                  <td className="px-4 py-3 font-semibold text-slate-400">{submission.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {new Date(submission.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-brand-950">{submission.name}</p>
                    {submission.organization && (
                      <p className="text-xs text-slate-500">{submission.organization}</p>
                    )}
                    <a href={`mailto:${submission.email}`} className="text-xs text-brand-700 hover:underline">
                      {submission.email}
                    </a>
                    {submission.phone && <p className="text-xs text-slate-500">{submission.phone}</p>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{submission.service}</td>
                  <td className="max-w-md px-4 py-3 text-slate-600">
                    <details>
                      <summary className="cursor-pointer text-brand-700">
                        {submission.message.slice(0, 60)}
                        {submission.message.length > 60 ? "…" : ""}
                      </summary>
                      <p className="mt-2 whitespace-pre-wrap text-slate-600">{submission.message}</p>
                    </details>
                  </td>
                  <td className="px-4 py-3">
                    {submission.attachment ? (
                      <button
                        type="button"
                        onClick={() => downloadAttachment(submission)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-brand-300 px-3 py-1.5 text-xs font-semibold text-brand-800 transition hover:bg-brand-50"
                      >
                        <Download className="h-3.5 w-3.5" aria-hidden="true" />
                        Download
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
