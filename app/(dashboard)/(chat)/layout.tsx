export default function StudioLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-1 flex-col w-full">
            <div className="flex flex-1 h-[calc(100vh-124px)] overflow-hidden overflow-y-scroll">
                {children}
            </div>
        </div>
    );
}
