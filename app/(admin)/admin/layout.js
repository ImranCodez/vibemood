import Sidebar from "@/app/components/admin/SideNavbar";
import Navbar from "@/app/components/Navbar";

export default async function Layout({ children }) {
  return (
    <>
      <div className="flex bg-gray-100">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
