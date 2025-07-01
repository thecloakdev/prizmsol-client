'use client';

// interface CodeBlockProps {
//   node: any;
//   inline: boolean;
//   className: string;
//   children: any;
// }

export function CodeBlock({
  node,
  inline,
  className,
  children,
  ...props
}: any) {
  if (!inline) {
    return (
      <div className="not-prose flex flex-col">
        <pre
          {...props}
          className={`text-sm w-full overflow-x-auto dark:bg-neutral-900 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl dark:text-neutral-50 text-neutral-900`}
        >
          <code className="whitespace-pre-wrap break-words">{children}</code>
        </pre>
      </div>
    );
  } else {
    return (
      <code
        className={`${className} text-sm bg-neutral-100 dark:bg-neutral-800 py-0.5 px-1 rounded-md`}
        {...props}
      >
        {children}
      </code>
    );
  }
}

