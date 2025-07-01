"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function ProxyImage(props: ImageProps & { fallbackurl?: string }) {
    const [error, setError] = useState<React.SyntheticEvent<
        HTMLImageElement,
        Event
    > | null>(null)
    const url = process.env.NEXT_PUBLIC_URL;
    return (
        <Image
            {...props}
            src={error && props.fallbackurl ? `${url}api/static?url=${props.fallbackurl}` : `${url}api/static?url=${props.src}`}
            onError={setError}
        />
    );
}