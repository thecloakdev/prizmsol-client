"use client";
import { AuthContext } from "@/providers/auth-provider";
import { useContext  } from "react";

export function useUser() {
    const authContext = useContext(AuthContext);
    return authContext;
}
