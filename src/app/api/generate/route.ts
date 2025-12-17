import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { code, language, docStyle } = await req.json();

  const systemPrompt = `You are an expert documentation writer. Generate comprehensive, clear, and professional documentation for the provided code.

Follow these guidelines:
- Use ${docStyle} documentation style
- Include a brief description of what the code does
- Document all functions, classes, methods, and their parameters
- Include return types and descriptions
- Add usage examples where appropriate
- Note any important caveats or edge cases
- Use proper markdown formatting

Output ONLY the documentation in markdown format, ready to be used.`;

  const userPrompt = `Generate documentation for the following ${language} code:

\`\`\`${language}
${code}
\`\`\``;

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    prompt: userPrompt,
  });

  return result.toTextStreamResponse();
}
