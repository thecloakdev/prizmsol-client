"use client";
import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { isEmpty, throttle } from "lodash";

export default function UsernameField() {
    const [username, setUsername] = useState("");
    const [usernameAvailable, setUsernameAvailable] = useState(true);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);

        // check if username is available and throttle.
        const check =  useCallback(throttle(checkAvailability, 1000), [username]);
        check();
    }

    const checkAvailability = async () => {
        const response = await fetch(`/api/account/get/username/${username}`);
        const data = await response.json();
        if ( isEmpty(data.id) ) {
            setUsernameAvailable(true);
        } else {
            setUsernameAvailable(false);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" name="username" placeholder="Enter your username" autoComplete="off" onChange={handleChange} />
            {!usernameAvailable && <p className="text-red-500 text-sm">Username is already in use</p>}
        </div>
    );
}
