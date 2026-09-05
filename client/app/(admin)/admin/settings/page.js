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
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-gray">
          Workspace
        </p>
        <h1 className="mt-2 flex items-center gap-3 text-3xl font-bold text-slate">
          <Settings size={28} /> Settings
        </h1>
        <p className="mt-1 text-gray">Manage your VibeMood admin workspace.</p>
      </div>
      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {settings.map(({ title, description, icon: Icon }) => (
          <button
            className="group rounded-xl border border-border bg-surface p-6 text-left transition hover:border-slate hover:shadow-sm"
            key={title}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-soft text-slate">
              <Icon size={21} />
            </span>
            <h2 className="mt-5 text-lg font-bold text-slate">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray">{description}</p>
            <span className="mt-5 inline-block text-sm font-semibold text-slate group-hover:underline">
              Open settings
            </span>
          </button>
        ))}
      </section>
      <section className="mt-6 max-w-3xl rounded-xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate">Store preferences</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate">
            Store name
            <input
              className="mt-2 w-full rounded-lg border p-3 font-normal outline-none focus:border-slate"
              defaultValue="VibeMood"
            />
          </label>
          <label className="text-sm font-semibold text-slate">
            Currency
            <select
              className="mt-2 w-full rounded-lg border p-3 font-normal outline-none focus:border-slate"
              defaultValue="USD"
            >
              <option>USD ($)</option>
              <option>BDT (৳)</option>
            </select>
          </label>
        </div>
        <button className="mt-6 rounded-lg bg-slate px-5 py-3 text-sm font-semibold text-text-light hover:bg-slate-light">
          Save preferences
        </button>
      </section>
    </main>
  );
}
