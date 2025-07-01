import Link from 'next/link';
import { ModeToggle } from './ui/mode-toggle';
export default function Footer() {
    return (
        <footer className="flex flex-col py-5 justify-center items-center bg-neutral-50 dark:bg-neutral-900 w-full border-t border-black/[0.06] dark:border-white/[0.06]">
            <div className="flex flex-row justify-between w-full max-w-7xl px-6 py-4">
                <div className='flex flex-col gap-1.5'>
                    <ul className='flex gap-5'>
                        <li className="text-sm">
                            <Link href="mailto:ahmedabdibusiness@gmail.com">Contact</Link>
                        </li>
                        <li className="text-sm">
                            <Link href="/terms">Terms</Link>
                        </li>
                        <li className="text-sm">
                            <Link href="/privacy">Privacy</Link>
                        </li>
                    </ul>
                    <span className="text-sm opacity-60" tabIndex={0}>{new Date().getFullYear()} &copy; Prizmsol. All rights reserved.</span>
                </div>
                <div className='flex gap-5 items-start'>
                    <ModeToggle />
                </div>
            </div>
        </footer>
    );
}
