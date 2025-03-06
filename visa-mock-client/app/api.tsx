import { FormEvent } from "react";

const API_URL = "http://localhost";
const API_PORT = "8072";
export const ENDPOINT = `${API_URL}:${API_PORT}`;


export async function evaluateResume(event: FormEvent<HTMLFormElement>) {
    console.log(event.currentTarget);
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    console.log(formData);

    const response = await fetch(`${ENDPOINT}/evaluate`, {
        method: "POST",
        body: formData.get("dropzone-file"),
        headers: { 
            "Content-Type": "multipart/form-data" 
        }
    });

    // Handle response if necessary
    const data = await response.json()
    console.log(data);
    return data;
}
