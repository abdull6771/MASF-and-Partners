import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Paperclip,
  Phone,
  Send,
} from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import { DotGrid } from "../components/Motifs.jsx";
import { company, serviceOptions } from "../data/content.js";
import usePageMeta from "../lib/usePageMeta.js";
import { container } from "../lib/styles.js";

// Deployed separately from the backend? Set VITE_API_BASE_URL to its origin.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

// Optional Cloudflare Turnstile anti-spam. Set VITE_TURNSTILE_SITE_KEY here
// and MASF_TURNSTILE_SECRET on the backend to activate the challenge.
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "";

const MAX_ATTACHMENT_MB = 10;
const ATTACHMENT_ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg";
const ATTACHMENT_EXTENSIONS = ATTACHMENT_ACCEPT.split(",");

function useTurnstileScript() {
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    if (document.querySelector('script[data-masf="turnstile"]')) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.dataset.masf = "turnstile";
    document.head.appendChild(script);
  }, []);
}

const EMPTY_FORM = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  service: serviceOptions[0],
  message: "",
  website: "", // honeypot — hidden from humans, checked by the backend
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\s-]{7,20}$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim()))
    errors.phone = "Please enter a valid phone number (digits, +, spaces).";
  if (values.message.trim().length < 10)
    errors.message = "Please describe your enquiry in at least 10 characters.";
  return errors;
}

function Field({ id, label, required = false, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-brand-950">
        {label}
        {required && (
          <span className="text-amber-600" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (invalid) =>
  `w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-brand-500 ${
    invalid ? "border-red-400" : "border-slate-300"
  }`;

function ContactForm() {
  useTurnstileScript();
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState("");
  const [referenceId, setReferenceId] = useState(null);
  const [attachmentName, setAttachmentName] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Website enquiry — ${values.service}`);
    const body = encodeURIComponent(
      [
        `Name: ${values.name || "-"}`,
        `Organisation: ${values.organization || "-"}`,
        `Email: ${values.email || "-"}`,
        `Phone: ${values.phone || "-"}`,
        `Service of interest: ${values.service}`,
        "",
        values.message,
      ].join("\n")
    );
    return `mailto:${company.email}?subject=${subject}&body=${body}`;
  }, [values]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  function handleAttachmentChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      setAttachmentName("");
      setErrors((previous) => ({ ...previous, attachment: undefined }));
      return;
    }
    const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    let attachmentError;
    if (!ATTACHMENT_EXTENSIONS.includes(extension)) {
      attachmentError = "Unsupported file type. Use PDF, Word, Excel, PNG or JPG.";
    } else if (file.size > MAX_ATTACHMENT_MB * 1024 * 1024) {
      attachmentError = `File is too large — the maximum is ${MAX_ATTACHMENT_MB} MB.`;
    }
    setAttachmentName(attachmentError ? "" : file.name);
    if (attachmentError) event.target.value = "";
    setErrors((previous) => ({ ...previous, attachment: attachmentError }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = { ...validate(values) };
    if (errors.attachment) nextErrors.attachment = errors.attachment;
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      // Multipart form data: text fields, optional attachment, and (when
      // Turnstile is enabled) the auto-injected cf-turnstile-response field.
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        body: new FormData(form),
      });
      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        setReferenceId(data?.id ?? null);
        setStatus("success");
        return;
      }
      const data = await response.json().catch(() => null);
      setServerMessage(
        typeof data?.detail === "string"
          ? data.detail
          : "The server could not accept the submission. Please try again, or email us directly."
      );
      setStatus("error");
      window.turnstile?.reset?.();
    } catch {
      setServerMessage(
        "We could not reach the server — it may be offline. Your message is preserved below; you can send it by email instead."
      );
      setStatus("error");
      window.turnstile?.reset?.();
    }
  }

  function reset() {
    setValues(EMPTY_FORM);
    setErrors({});
    setReferenceId(null);
    setServerMessage("");
    setAttachmentName("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center rounded-3xl border border-brand-200 bg-brand-50/70 p-8 sm:p-10"
      >
        <CheckCircle2 className="h-10 w-10 text-brand-600" aria-hidden="true" />
        <h2 className="mt-5 font-display text-2xl font-bold text-brand-950">
          Thank you — your enquiry is in.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Our team typically responds within one business day.
          {referenceId && (
            <>
              {" "}
              Your reference number is{" "}
              <strong className="text-brand-800">#{String(referenceId).padStart(4, "0")}</strong>.
            </>
          )}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Urgent? Call us on{" "}
          <a href={company.phones[0].href} className="font-semibold text-brand-700">
            {company.phones[0].display}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-300 px-5 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-100"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-xl font-bold text-brand-950">Send us your brief</h2>
      <p className="mt-1.5 text-sm text-slate-500">
        Fields marked <span className="font-semibold text-amber-600">*</span> are required.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Full name" required error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass(errors.name)}
            placeholder="e.g. Amina Bello"
          />
        </Field>
        <Field id="contact-organization" label="Organisation" error={errors.organization}>
          <input
            id="contact-organization"
            name="organization"
            type="text"
            autoComplete="organization"
            value={values.organization}
            onChange={handleChange}
            className={inputClass(false)}
            placeholder="Ministry, company or agency"
          />
        </Field>
        <Field id="contact-email" label="Email address" required error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass(errors.email)}
            placeholder="you@organisation.gov.ng"
          />
        </Field>
        <Field id="contact-phone" label="Phone" error={errors.phone}>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={inputClass(errors.phone)}
            placeholder="0803 000 0000"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="contact-service" label="Service of interest">
          <select
            id="contact-service"
            name="service"
            value={values.service}
            onChange={handleChange}
            className={inputClass(false)}
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field id="contact-message" label="Message" required error={errors.message}>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={inputClass(errors.message)}
            placeholder="Tell us about the site, the scope and your timeline…"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="contact-attachment" label="Attach RFQ / tender document (optional)" error={errors.attachment}>
          <input
            id="contact-attachment"
            name="attachment"
            type="file"
            accept={ATTACHMENT_ACCEPT}
            onChange={handleAttachmentChange}
            aria-invalid={Boolean(errors.attachment)}
            aria-describedby={errors.attachment ? "contact-attachment-error" : "contact-attachment-hint"}
            className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white text-sm text-slate-600 transition file:mr-4 file:cursor-pointer file:rounded-l-xl file:border-0 file:bg-brand-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-brand-800 hover:file:bg-brand-100"
          />
          <p id="contact-attachment-hint" className="mt-1.5 flex items-center gap-1 text-xs text-slate-500">
            <Paperclip className="h-3 w-3" aria-hidden="true" />
            PDF, Word, Excel or image — up to {MAX_ATTACHMENT_MB} MB.
            {attachmentName && (
              <span className="font-medium text-brand-700"> Selected: {attachmentName}</span>
            )}
          </p>
        </Field>
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="cf-turnstile mt-5" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" />
      )}

      {/* Honeypot — visually hidden and skipped by screen readers/tab order. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="flex items-start gap-2 text-sm font-medium text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {serverMessage}
            </p>
            <a
              href={mailtoHref}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Send this message by email instead
            </a>
            {attachmentName && (
              <p className="mt-2 text-xs text-red-600/80">
                Email links cannot carry attachments — please re-attach “{attachmentName}” in your
                email client.
              </p>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Submit enquiry
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

function ContactDetails() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-xl font-bold text-brand-950">Reach us directly</h2>
        <ul className="mt-5 space-y-5 text-sm">
          <li className="flex gap-3.5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
            <div>
              <p className="font-semibold text-brand-950">Head office</p>
              <p className="mt-1 leading-relaxed text-slate-600">
                {company.address.suite},
                <br />
                {company.address.line2}, {company.address.city}, {company.address.country}
              </p>
              <p className="mt-1 text-xs text-slate-500">{company.address.poBox}</p>
            </div>
          </li>
          <li className="flex gap-3.5">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
            <div>
              <p className="font-semibold text-brand-950">Phone</p>
              <ul className="mt-1 space-y-1">
                {company.phones.map((phone) => (
                  <li key={phone.href}>
                    <a href={phone.href} className="rounded-sm text-slate-600 transition hover:text-brand-700">
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="flex gap-3.5">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
            <div>
              <p className="font-semibold text-brand-950">Email</p>
              <a
                href={`mailto:${company.email}`}
                className="mt-1 inline-block break-all rounded-sm text-slate-600 transition hover:text-brand-700"
              >
                {company.email}
              </a>
            </div>
          </li>
          <li className="flex gap-3.5">
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
            <div>
              <p className="font-semibold text-brand-950">WhatsApp</p>
              <a
                href={company.whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block rounded-sm text-slate-600 transition hover:text-brand-700"
              >
                Chat with us on {company.whatsapp.display}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </li>
        </ul>
        <ul className="mt-6 flex gap-3 border-t border-slate-100 pt-5" aria-label="Social media">
          {company.social.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-400 hover:text-brand-700"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Map placeholder — swap for an embedded map when an API key is available. */}
      <div className="on-dark relative flex-1 overflow-hidden rounded-3xl bg-linear-to-br from-sea-900 via-brand-950 to-brand-900 p-8">
        <DotGrid className="absolute inset-0 h-full w-full text-white/[0.08]" id="map-dots" />
        <div className="relative flex h-full min-h-56 flex-col items-start justify-end">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-brand-950 shadow-lg">
            <MapPin className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-4 font-display text-lg font-bold text-white">Wuse II, Abuja</p>
          <p className="mt-1 text-sm text-brand-100/80">
            {company.address.suite} — behind AP Plaza.
          </p>
          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            Open in Google Maps
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  usePageMeta(
    "Contact",
    "Contact MASF & Partners Limited — Suite B21, Business Plaza, Wuse II, Abuja. Call 0903 818 7814 or send your project brief through our enquiry form."
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are planning"
        lede="A tender, a site, a system that keeps failing — describe it and we will come back with a clear next step. Typical response time: one business day."
        motif="circuit"
      />
      <section className="py-14 sm:py-16 lg:py-20">
        <div className={`${container} grid gap-8 lg:grid-cols-[0.9fr_1.1fr]`}>
          <Reveal className="h-full">
            <ContactDetails />
          </Reveal>
          <Reveal delay={100} className="h-full">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
