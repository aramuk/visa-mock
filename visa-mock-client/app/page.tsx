"use client";

import React from 'react'

import Image from "next/image";
import { evaluateResume, EvaluationResponse } from "./api";

import { useState } from 'react';

export default function EvaluationPage() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [evaluation, setEvaluation] = useState<EvaluationResponse | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) setFile(droppedFile);
    };

    const handleEvaluateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const response = await evaluateResume(formData);


            if (response.ok) {
                setFile(null);
                setError(null);
                const evaluation = await response.json();
                console.log(evaluation);
                setEvaluation(evaluation);
            }
        } catch (error) {
            setError(`Error evaluating resume: ${error}`);
        }
        setLoading(false);
    };

    if (evaluation !== null) {
        console.log(evaluation);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex flex-col gap-2 p-6">
                <h1 className="text-4xl font-bold">O1 Visa Eligibility Evaluator</h1>
                <p className="text-lg">This mock tool is designed to help you determine if you are eligible for an O-1 visa. It is not a substitute for legal advice.</p>
            </header>
            <main className="flex-grow">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left column */}
                        <div className="w-full md:w-1/2">
                            <form onSubmit={handleEvaluateSubmit}>
                                {error && <p className="text-red-500">{error}</p>}
                                <div
                                    onDrop={handleDrop}
                                >
                                    <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload Resume/CV</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF or Text File</p>
                                        </div>
                                        <input
                                            id="resume-upload"
                                            type="file"
                                            className="hidden"
                                            accept=".pdf, .tex, .txt"
                                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                        />
                                    </label>
                                </div>
                                <div className="flex flex-col gap-2 p-2">
                                    <button
                                        type="submit"
                                        disabled={!file || loading}
                                        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                                    >
                                        {loading ? "Evaluating..." : "Upload File"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right column */}
                        <div className="w-full md:w-1/2">
                            {evaluation && (<div className="flex flex-col gap-6 p-6">
                                <h2 className="text-2xl font-bold">Evaluation</h2>
                                <div className="chip">
                                    <p><span><b>Overall Rating:</b></span> {evaluation.rating.rating.toUpperCase()}</p>
                                    <p><span><b>Summary:</b></span> {evaluation.rating.reasoning}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-bold">Achievements</h3>
                                    {evaluation.achievements.map((achievement, index) => (
                                        <div className="chip" key={`achievement-${index}`}>
                                            <p><span><b>Achievement:</b></span> {achievement.achievement}</p>
                                            <p><span><b>Criteria:</b></span> {achievement.criteria.replace("_", " ").toUpperCase()}</p>
                                            <p><span><b>Context:</b></span> {achievement.context}</p>
                                            <p><span><b>Reasoning:</b></span> {achievement.reasoning}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <footer className="w-full bg-gray-800 text-white py-6 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-bold">O1-Visa Eligibility Evaluator</h3>
                        </div>
                        <div className="flex space-x-4">
                            <a
                                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                                href="https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    aria-hidden
                                    src="/file.svg"
                                    alt="File icon"
                                    width={16}
                                    height={16}
                                />
                                O-1 Visa Overview
                            </a>
                            <a
                                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                                href="https://www.uscis.gov/policy-manual/volume-2-part-m"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    aria-hidden
                                    src="/window.svg"
                                    alt="Window icon"
                                    width={16}
                                    height={16}
                                />
                                Policy Manual
                            </a>                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
