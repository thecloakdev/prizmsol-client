"use client";
import { TypeAnimation } from "react-type-animation";

export default function ComingSoon() {
    return (
        <TypeAnimation
            sequence={[
                'We are working on something for podcasters',
                1000,
                'We are working on something for creators',
                1000,
                'We are working on something for gamers',
                1000,
                'We are working on something for brands',
                1000,
                'We are working on something for agencies',
                1000,
                'We are working on something for you',
                1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '1em', display: 'inline-block' }}
            repeat={Infinity}
        />
    );
}
