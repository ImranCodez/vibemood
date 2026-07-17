import Sidebar from "@/app/components/admin/SideNavbar";

export default async function AdminLayout({ children }) {
  return (
    <>
      <div className="flex bg-gray-200">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
