"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Globe, Lock, Settings } from "lucide-react";

const settings = [
  {
    title: "Store profile",
    description: "Update your store name, email, and contact details.",
    icon: Globe,
  },
  {
    title: "Notifications",
    description:
      "Choose which order and inventory alerts appear in your workspace.",
    icon: Bell,
  },
  {
    title: "Security",
    description: "Review password, session, and account security preferences.",
    icon: Lock,
  },
];

export default function SettingsPage() {
  const preferencesForm = useRef(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("vibemood-store-preferences");
    if (!stored || !preferencesForm.current) return;
    try {
      const preferences = JSON.parse(stored);
      preferencesForm.current.elements.storeName.value =
        preferences.storeName || "VibeMood";
      preferencesForm.current.elements.currency.value =
        preferences.currency || "BDT";
    } catch {
      localStorage.removeItem("vibemood-store-preferences");
    }
  }, []);

  const savePreferences = (event) => {
    event.preventDefault();
    const values = new FormData(preferencesForm.current);
    localStorage.setItem(
      "vibemood-store-preferences",
      JSON.stringify({
        storeName: values.get("storeName"),
        currency: values.get("currency"),
      }),
    );
    setSaved(true);
  };

  return (
    <main className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#6C3FEA]">
          Workspace
        </p>
        <h1 className="mt-2 flex items-center gap-3 text-3xl font-extrabold tracking-tight text-slate">
          <Settings size={28} /> Settings
        </h1>
        <p className="mt-1 text-gray">Manage your VibeMood admin workspace.</p>
      </div>
      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {settings.map(({ title, description, icon: Icon }) => (
          <article
            className="group border border-[#E5E7EB] bg-white p-6 text-left transition hover:border-[#6C3FEA] hover:shadow-[0_8px_24px_rgba(16,24,39,0.06)]"
            key={title}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-soft text-slate">
              <Icon size={21} className="text-[#6C3FEA]" />
            </span>
            <h2 className="mt-5 text-lg font-bold text-slate">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray">{description}</p>
          </article>
        ))}
      </section>
      <section className="mt-6 max-w-3xl rounded-xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate">Store preferences</h2>
        <form ref={preferencesForm} onSubmit={savePreferences}>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate">
              Store name
              <input
                name="storeName"
                className="mt-2 w-full rounded-lg border p-3 font-normal outline-none focus:border-slate"
                defaultValue="VibeMood"
              />
            </label>
            <label className="text-sm font-semibold text-slate">
              Currency
              <select
                name="currency"
                className="mt-2 w-full rounded-lg border p-3 font-normal outline-none focus:border-slate"
                defaultValue="BDT"
              >
                <option value="USD">USD ($)</option>
                <option value="BDT">BDT (৳)</option>
              </select>
            </label>
          </div>
          <p className="mt-4 text-sm text-gray">
            Saved in this browser only; these preferences are not synced to the
            store server.
          </p>
          <button
            type="submit"
            className="mt-6 rounded-lg bg-slate px-5 py-3 text-sm font-semibold text-text-light hover:bg-slate-light"
          >
            Save preferences
          </button>
          {saved && (
            <p role="status" className="mt-3 text-sm text-green-700">
              Preferences saved in this browser.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
