import { BookIcon, CodeIcon, PencilIcon } from "lucide-react";

export const pills = [{
    name: "Code",
    prompt: "Develop a comprehensive study plan for learning Python, including recommended resources, time allocation for topics, and practical exercises. Ensure the plan balances theory with hands-on practice, designed specifically for someone with no prior programming experience.",
    Icon: CodeIcon
}, {
    name: "Research",
    prompt: "Create a fully detailed essay on the life and times of Kobe Bryant. Include his childhood, teen years and his full journey to becoming a legendary athlete.",
    Icon: BookIcon
}, {
    name: "Creative Writing",
    prompt: "Create a Youtube script for reviewing the iPhone 16 Pro Max against the Samsung Galaxy s23 Ultra. Outline all features, pros vs cons and everything else.",
    Icon: PencilIcon
}, {
    name: "Resume",
    prompt: "Create a detailed resume for that is tailored to getting a job at Google as a Fullstack software engineer. Imagine you have all the skills and experience required for the role.",
    Icon: BookIcon
}];

type AIModels = {
    name: string,
    displayName: string,
    plan: number
}

export const aiModels: Array<AIModels> = [{
    name: "gpt-4.1-mini",
    displayName: "GPT-4.1 mini",
    plan: 0,
}, {
    name: "gpt-4.1-nano",
    displayName: "GPT-4.1 nano",
    plan: 0,
}, {
    name: "gpt-4o-mini",
    displayName: "GPT-4o mini",
    plan: 0,
}, {
    name: "gpt-4o",
    displayName: "GPT-4o",
    plan: 1,
}, {
    name: "gemini-2.0-flash",
    displayName: "Gemini 2.0 Flash",
    plan: 0
}, {
    name: "gemini-2.0-pro-exp-02-05",
    displayName: "Gemini 2.0 Pro",
    plan: 1
}];