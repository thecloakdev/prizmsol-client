"use client";
import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { isEmpty, throttle } from "lodash";

export default function EmailField() {
    const [email, setEmail] = useState("");
    const [emailAvailable, setEmailAvailable] = useState(true);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);

        // check if username is available and throttle.
        const check =  useCallback(throttle(checkAvailability, 1000), [email]);
        check();
    }

    const checkAvailability = async () => {
        const response = await fetch(`/api/account/attempt/email?email=${email}`);
        const data = await response.json();
        if ( isEmpty(data.id) ) {
            setEmailAvailable(true);
        } else {
            setEmailAvailable(false);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" placeholder="Enter your email" autoComplete="off" onChange={handleChange} />
            {!emailAvailable && <p className="text-red-500 text-sm">Email is already in use</p>}
        </div>
    );
}
