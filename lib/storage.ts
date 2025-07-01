"use client";
export const saveUserPreference = (key: string, value: any) => {
    if (typeof window === "undefined") {
        return null;
    }
    const userPreferences = JSON.parse(localStorage.getItem("user-preferences") || "{}");
    userPreferences[key] = value;
    localStorage.setItem("user-preferences", JSON.stringify(userPreferences));
};

export const getUserPreference = (key: string) => {
    if (typeof window === "undefined") {
        return null;
    }
    return JSON.parse(localStorage.getItem("user-preferences") || "{}")[key];
};