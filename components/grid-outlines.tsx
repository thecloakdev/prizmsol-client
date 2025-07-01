export default function GridOutlines() {
    return (
        <div className="absolute flex justify-center w-full pointer-events-none">
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 px-4 h-screen w-full max-w-7xl">
                <div className="border-x border-black/[0.035] dark:border-white/[0.035]"></div>
                <div className="border-x border-black/[0.035] dark:border-white/[0.035]"></div>
                <div className="hidden lg:block border-x border-black/[0.035] dark:border-white/[0.035]"></div>
                <div className="hidden lg:block border-x border-black/[0.035] dark:border-white/[0.035]"></div>
            </div>
        </div>
    );
}
