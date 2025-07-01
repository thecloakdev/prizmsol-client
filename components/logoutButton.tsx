"use server";
import { Power } from "lucide-react";
import { Button } from "./ui/button";

export default async function LogoutButton() {
    return (
        <form>
            <input type="hidden" name="rq" value="abort" />
            <Button
                variant="ghost"
                className="px-0 py-3 m-0 h-0 w-full text-start justify-start"
            >
                <Power className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </form>
    );
}
