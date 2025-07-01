"use client";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{ user: any, isLoading: boolean, refreshUser: () => void }>({
    user: null,
    isLoading: true,
    refreshUser: () => { },
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/account/me", {
            next: {
                revalidate: 60 * 60 * 24 * 7,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    setUser(null);
                } else {
                    setUser(data);
                }
                setIsLoading(false);
            });
    }, []);

    const refreshUser = () => {
        setIsLoading(true);
        fetch("/api/account/me?revalidate=true")
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    setUser(null);
                } else {
                    setUser(data);
                }
                setIsLoading(false);
            });
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}
