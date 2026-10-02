export default function StatCard({ title, value, color }) {
  return (
    <div className="border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_24px_rgba(16,24,39,0.04)]">
      <p className="text-sm font-bold uppercase tracking-widest text-[#667085]">
        {title}
      </p>

      <h2 className={`mt-3 text-4xl font-extrabold ${color}`}>{value}</h2>
    </div>
  );
}
