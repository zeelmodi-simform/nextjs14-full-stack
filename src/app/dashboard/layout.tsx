import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <SideBar />
            <div className="flex flex-col">
                <NavBar />
                { children }
            </div>
        </div>
    );
};