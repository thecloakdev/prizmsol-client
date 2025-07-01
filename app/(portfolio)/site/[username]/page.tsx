export default async function Site({
    params
}: {
    params: Promise<{ username: string; }>
}) {
    const p = await params;
    return (
        <div className="flex flex-1 flex-col justify-center items-center">
            <span className="font-bold text-4xl capitalize">You're viewing {p.username}'s Site</span>
        </div>
    );
}