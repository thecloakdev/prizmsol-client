import Footer from "../Footer";
import Header from "../header";

export default async function FullLayout({ children, hideFooter }: {
    children: React.ReactNode;
    hideFooter?: boolean;
}) {

    const renderHeader = () => {
        return <Header />;
    }

    return (
        <>
            {renderHeader()}
            <main className="flex flex-1 h-full bg-neutral-50 dark:bg-neutral-950 justify-center">
                <div className="flex flex-col flex-1 w-full px-6">
                    {children}
                </div>
            </main>
            {!hideFooter && <Footer />}
        </>
    );
}

