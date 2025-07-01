"use client";

export default function AnimatedBadge({ text }: { text: string }) {
  return (
    <div className="flex relative self-center justify-center items-center p-[2px] animated-shine shine rounded-full overflow-hidden">
      <div className="bg-white dark:bg-neutral-950 text-md rounded-full">
        <span className="flex font-semibold py-2 px-5">{text}</span>
      </div>
    </div>
  );
}
