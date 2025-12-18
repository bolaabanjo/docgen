import { cencori } from "@/lib/cencori";
import { AuthenticationError, SafetyError, RateLimitError } from "cencori";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { code, language, docStyle } = await req.json();

    if (!process.env.CENCORI_API_KEY || process.env.CENCORI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "MISSING_API_KEY", message: "Cencori API key not configured. Please add CENCORI_API_KEY to your .env.local file." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

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

    const stream = cencori.ai.chatStream({
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.delta) {
              controller.enqueue(encoder.encode(chunk.delta));
            }
          }
          controller.close();
        } catch (error: any) {
          console.error("Streaming error:", error);
          let errorMessage = "Streaming failed";

          if (error instanceof SafetyError) {
            errorMessage = "SAFETY_VIOLATION: Input or output blocked by Cencori safety filters.";
          } else if (error instanceof RateLimitError) {
            errorMessage = "RATE_LIMIT_EXCEEDED: Too many requests.";
          } else if (error instanceof AuthenticationError) {
            errorMessage = "AUTHENTICATION_FAILED: Invalid Cencori API key.";
          }

          controller.error(new Error(errorMessage));
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ error: "INTERNAL_SERVER_ERROR", message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
