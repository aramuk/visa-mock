"use client";

import React from 'react'
import Dropzone from 'react-dropzone'

import Image from "next/image";
import { evaluateResume } from "./api";

export default function NextJS() {
    return (
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                {/* Add some padding to the header to make it more UX friendly */}
                <header className="flex flex-col gap-2 p-6">
                    <h1 className="text-4xl font-bold">O1 Eligibility Evaluator</h1>
                    <p className="text-lg">This mock tool is designed to help you determine if you are eligible for an O-1 visa. It is not a substitute for legal advice.</p>
                </header>
                <div className="flex flex-col gap-4 p-6 row-start-1 items-center w-80% sm:items-start">
                    <form onSubmit={evaluateResume}>
                        {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps({ name: "resume-upload", accept: ".pdf, .tex, .txt" })} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone> */}
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload Resume/CV</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF or Text File</p>
                                </div>
                                <input id="resume-upload" type="file" className="hidden" accept=".pdf, .tex, .txt" />
                            </label>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Upload
                        </button>
                    </form>
                </div>
            </main>
            {/* Center the footer on the bottom of the page and darken the background slightly */}
            <div className="flex flex-col gap-4 p-6 row-start-3 items-center w-80% sm:items-start">
                <footer className="flex gap-6 flex-wrap items-center justify-center">
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
                    </a>
                </footer>
            </div>
        </div>
    );
}
