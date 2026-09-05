import Sidebar from "../components/admin/SideNavbar";

export default function Providers({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
