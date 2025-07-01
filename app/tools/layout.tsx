import Footer from "@/components/Footer";
import Header from "@/components/header";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col flex-1 w-full items-center">
                <div className="flex flex-col flex-1 max-w-7xl w-full px-4">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
