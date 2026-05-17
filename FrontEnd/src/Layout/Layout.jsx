import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const layout = () => {
  return (
    //sidebar
    <SidebarProvider>
      <Topbar />
      <main className="w-full mt-16">
        <div className="w-full min-h-[calc(100vh-64px)]">
          <Outlet />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default layout;
