import Footer from "../Footer";
import Header from "../header";

export default async function CenteredLayout({ children }: {
    children: React.ReactNode;
}) {
    const renderHeader = () => {
        return <Header />;
    }

    return (
        <>
            {renderHeader()}
            <main className="flex flex-1 h-full bg-neutral-50 dark:bg-neutral-950 justify-center">
                <div className="flex flex-col flex-1 w-full max-w-7xl px-6">
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
}

