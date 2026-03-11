import { GoogleGenAI } from "@google/genai";
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema";

const interviewReportSchema = z.object({
    jobDescription: z.string().describe("The job description"),
    resume: z.string().describe("The resume"),
    selfDescription: z.string().describe("The self description"),
    matchScore: z.number().describe("A score between 0 and 100 representing the match between the candidate's profile and the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The question to be asked by the interviewer"),
        intention: z.string().describe("The intention of the question to be asked by the interviewer"),
        answer: z.string().describe("How to answer the question, what points to cover, what to avoid, what to emphasize")
    })).describe("The technical questions that can be asked in the interview along with the intention of the question and how to answer the question, what points to cover, what to avoid, what to emphasize"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The question to be asked by the interviewer"),
        intention: z.string().describe("The intention of the question to be asked by the interviewer"),
        answer: z.string().describe("How to answer the question, what points to cover, what to avoid, what to emphasize")
    })).describe("The behavioral questions that can be asked in the interview along with the intention of the question and how to answer the question, what points to cover, what to avoid, what to emphasize"),
    skillsGap: z.array(z.object({
        skill: z.string().describe("The skill candidate is lacking"),
        severity: z.string().describe("The severity of the skill gap")
    })).describe("The list of skills gap in the candidate's profile along with their severity"),
    preprationplans: z.array(z.object({
        day: z.string().describe("The day number in prepration plans, starting from 1"),
        focus: z.string().describe("The main focus of this day, e.g data structures and algorithms, system design, etc."),
        tasks: z.array(z.string().describe("The tasks to be completed on the day to follow ,e.g practice questions, revise concepts, etc."))
    })).describe("A day wise preparation plan for the candidate to prepare for the interview")
})
// The client gets the API key from the environment variable `GEMINI_API_KEY`.

async function invokeGeminiAi() {

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    });
    console.log(response.text);
}
export { invokeGeminiAi };