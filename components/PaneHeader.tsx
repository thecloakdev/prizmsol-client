export default function PaneHeader(props: { children: React.ReactNode }) {
    return (
        <div className="flex sticky top-0 z-10 p-2.5 bg-neutral-50/80 dark:bg-[#101012]/80 backdrop-blur-lg border-b-[0.5px] border-neutral-300 dark:border-neutral-800 h-[40px]">{props.children}</div>
    );
}
