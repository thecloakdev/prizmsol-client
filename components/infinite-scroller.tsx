import { Loader2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function InfiniteScroller({
    items,
    hasMore = true,
    fetchData,
    Component,
    containerRef
}: {
    items: Array<any>;
    hasMore?: boolean;
    fetchData: () => Promise<void>;
    Component: React.ElementType;
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const SCROLL_THRESHOLD = 0;
    const [loading, setLoading] = useState<boolean>(false);
    const loaderRef = useRef(null);

    useEffect(() => {
        if (items.length === 0) {
            setLoading(true);
            fetchData();
        }
    }, []);

    const handleFetchData = async () => {
        if (loading || !hasMore) return;
        try {
            setLoading(true);
            await fetchData();
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleScroll = () => {
        if (!containerRef.current || loading || !hasMore) return;

        const container = containerRef.current;

        // Calculate how close we are to the bottom
        const scrollPosition = container.scrollTop + container.clientHeight;
        const scrollThreshold = container.scrollHeight - SCROLL_THRESHOLD;

        // If we're close enough to the bottom, fetch more data
        if (scrollPosition >= scrollThreshold) {
            setLoading(true);
            handleFetchData();
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore, items]);

    console.log("isLoading", loading);

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
            <ul className="flex flex-col gap-2.5 w-full">
                {items.map((item, index: number) => (
                    <li className='flex flex-1 w-full' key={index}>
                        <Component item={item} index={index} />
                    </li>
                ))}
            </ul>

            {loading && (
                <div className="flex justify-center my-4">
                    <Loader2Icon className="animate-spin text-neutral-500" size={24} />
                </div>
            )}

            {!loading && hasMore && (
                <div ref={loaderRef} className="h-4 w-full"></div>
            )}
        </div>
    );
}