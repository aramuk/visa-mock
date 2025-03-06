import { FormEvent } from "react";

const API_URL = "http://localhost";
const API_PORT = "8072";
export const ENDPOINT = `${API_URL}:${API_PORT}`;


export type EvaluationResponse = {
    rating: {
        rating: string;
        reasoning: string;
    };
    achievements: [{
        achievement: string;
        criteria: string;
        context: string;
        reasoning: string;
    }];
}

export async function evaluateResume(formData: FormData) {
    const response = await fetch(`${ENDPOINT}/evaluate`, {
        method: "POST",
        body: formData,
    });

    return response;
}
