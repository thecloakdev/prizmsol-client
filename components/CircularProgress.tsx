"use client";
import React from 'react';

const animate = (
    { timing = (timeFraction: any) => timeFraction, draw, duration }: {
        timing?: any;
        draw: any;
        duration: any;
    },
    callback?: any
) => {
    const requestAnimationFrame = window.requestAnimationFrame;

    if (requestAnimationFrame) {
        const start = performance.now();

        const step = (timestamp: number) => {
            let timeFraction = (timestamp - start) / duration;
            if (timeFraction < 0) timeFraction = 0;
            if (timeFraction > 1) timeFraction = 1;
            const progress = timing(timeFraction);
            draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(step);
            } else {
                callback?.();
            }
        };

        requestAnimationFrame(step);
    } else {
        draw(1);
        callback?.();
    }
};

export default function CircularProgress({ progress = 5, size = 25, strokeWidth = 2 }: {
    progress: number;
    size?: number;
    strokeWidth?: number;
}) {
    progress = Math.min(Math.max(0, progress), 100);
    const progressCircleRef = React.useRef(null);
    const center = size / 2;
    const radius = center - strokeWidth;
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray * ((100 - progress) / 100);

    const startAnim = () => {
        const { current: progressCircle }: any = progressCircleRef;

        if (progressCircle) {
            animate({
                duration: 1000,
                draw: (progress: any) => {
                    progressCircle.style.strokeDashoffset = `${dashArray - (dashArray - dashOffset) * progress
                        }px`;
                }
            });
        }
    }

    React.useEffect(() => {
        startAnim();
    }, []);

    React.useEffect(() => {
        startAnim();
    }, [progress]);

    return (
        <div className="wrap">
            <svg className="svg" style={{ width: size, height: size }}>
                <circle
                    className="text-neutral-300 dark:text-neutral-600 stroke-current fill-transparent"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                />
                <circle
                    ref={progressCircleRef}
                    className={`fill-transparent -rotate-90 origin-center stroke-current text-black dark:text-white`}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={`${dashArray}px`}
                />
            </svg>
        </div>
    );
};


