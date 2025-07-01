"use server";

export async function generateSpeech(formData: FormData) {
    const text = formData.get("text") as string;
    console.log("text: ", text);
}
