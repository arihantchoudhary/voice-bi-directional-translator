import { Langbase, Workflow } from "langbase";
import { NextRequest, NextResponse } from 'next/server';

// Define the structure of the expected input
interface AgentInput {
  input: string;
}

// Define the structure for environment variables (adjust as needed)
interface AgentEnv {
  LANGBASE_API_KEY?: string;
  OPENAI_API_KEY?: string;
  // Add other necessary env vars here
}

async function translationCallAgent({ input, env }: { input: string; env: AgentEnv }) {
  if (!env.LANGBASE_API_KEY) {
    throw new Error("LANGBASE_API_KEY environment variable is not set.");
  }
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set.");
  }

  const langbase = new Langbase({
    apiKey: env.LANGBASE_API_KEY,
  });

  const { step } = new Workflow({
    debug: true, // Enable debug logging for the workflow
  });

  // Step 1: Detect the language of the incoming message
  const languageDetection = await step({
    id: "detect_language",
    run: async () => {
      console.log("Step 1: Detecting language for input:", input);
      try {
        const { output } = await langbase.agent.run({
          model: "openai:gpt-4.1-mini",
          apiKey: env.OPENAI_API_KEY!,
          instructions: "You are a language detection specialist. Analyze the provided text and determine what language it is. Return only the ISO language code (e.g., 'en' for English, 'es' for Spanish, 'fr' for French, etc.). If you can't determine the language, return 'en'.",
          input: [
            { role: "user", content: input }
          ],
          stream: false,
        });
        console.log("Language detected:", output.trim());
        return output.trim();
      } catch (error) {
        console.error("Error in language detection step:", error);
        return "en"; // Default on error
      }
    }
  });

  // Step 2: Get user's preferred language from memory or use default
  const userPreferences = await step({
    id: "get_user_preferences",
    run: async () => {
      console.log("Step 2: Getting user preferences");
      try {
        // Note: Memory retrieval might need adjustment based on actual memory structure
        const memoryResults = await langbase.memories.retrieve({
          query: "user language preferences",
          memory: [{ name: "translation-agent-memory-1746369141115" }], // Ensure this memory name is correct
        });
        
        // Define a basic type for memory results if not available from langbase SDK
        interface MemoryResult { text: string; [key: string]: any; }
        const context = memoryResults.map((m: MemoryResult) => m.text).join("\n");
        console.log("Retrieved memory context:", context);

        // Extract user preferences from memory or use default
        const { output } = await langbase.agent.run({
          model: "openai:gpt-4.1-mini",
          apiKey: env.OPENAI_API_KEY!,
          instructions: "Extract the user's preferred language code (e.g., 'en', 'es') from the context. If not found or context is empty, return 'en' as default.",
          input: [
            { role: "user", content: `Context: ${context || "No preferences found."}\n\nExtract the preferred language code.` }
          ],
          stream: false,
        });
        console.log("User preferred language:", output.trim());
        return output.trim();
      } catch (error) {
        console.error("Error retrieving/processing user preferences:", error);
        return "en"; // Default to English if preferences can't be retrieved/processed
      }
    }
  });

  // Step 3: Translate the input to user's preferred language
  const translatedInput = await step({
    id: "translate_to_preferred",
    run: async () => {
      console.log(`Step 3: Translating input from ${languageDetection} to ${userPreferences}`);
      // Skip translation if already in preferred language
      if (languageDetection === userPreferences) {
        console.log("Input already in preferred language. Skipping translation.");
        return { text: input, needsTranslation: false };
      }
      
      try {
        const { output } = await langbase.agent.run({
          model: "openai:gpt-4.1-mini",
          apiKey: env.OPENAI_API_KEY!,
          instructions: `You are a professional translator. Translate the following text from ${languageDetection} to ${userPreferences}. Maintain the original meaning, tone, and context as accurately as possible. Return only the translated text.`,
          input: [
            { role: "user", content: input }
          ],
          stream: false,
        });
        console.log("Translated input:", output);
        return { text: output, needsTranslation: true };
      } catch (error) {
        console.error("Error in input translation step:", error);
        return { text: input, needsTranslation: false }; // Return original on error
      }
    }
  });

  // Step 4: Generate a response in the user's preferred language
  const response = await step({
    id: "generate_response",
    run: async () => {
      console.log(`Step 4: Generating response in ${userPreferences}`);
      try {
        const { output } = await langbase.agent.run({
          model: "openai:gpt-4.1-mini",
          apiKey: env.OPENAI_API_KEY!,
          instructions: `You are a helpful voice assistant that speaks ${userPreferences}. Respond to the user's message in a conversational, helpful manner. Keep responses concise as this is a voice conversation.`,
          input: [
            { role: "user", content: translatedInput.text }
          ],
          stream: false,
        });
        console.log("Generated response:", output);
        return output;
      } catch (error) {
        console.error("Error in response generation step:", error);
        return `Sorry, I encountered an error generating a response in ${userPreferences}.`; // Fallback response
      }
    }
  });

  // Step 5: Translate the response back to the caller's language
  const translatedResponse = await step({
    id: "translate_response",
    run: async () => {
      console.log(`Step 5: Translating response from ${userPreferences} to ${languageDetection}`);
      // Skip translation if caller's language is the same as user's preferred language
      if (languageDetection === userPreferences) {
        console.log("Response already in caller's language. Skipping translation.");
        return response;
      }
      
      try {
        const { output } = await langbase.agent.run({
          model: "openai:gpt-4.1-mini",
          apiKey: env.OPENAI_API_KEY!,
          instructions: `You are a professional translator. Translate the following text from ${userPreferences} to ${languageDetection}. Maintain the original meaning, tone, and context as accurately as possible. Return only the translated text.`,
          input: [
            { role: "user", content: response }
          ],
          stream: false,
        });
        console.log("Translated response:", output);
        return output;
      } catch (error) {
        console.error("Error in response translation step:", error);
        return response; // Return original response on error
      }
    }
  });

  // Return both the original and translated responses
  const result = {
    originalLanguage: languageDetection,
    preferredLanguage: userPreferences,
    translatedInput: translatedInput.needsTranslation ? translatedInput.text : null,
    responseInPreferredLanguage: response,
    responseInCallerLanguage: translatedResponse,
    // For voice systems, we'll return the appropriate audio response
    audioResponse: languageDetection === userPreferences ? response : translatedResponse
  };
  console.log("Final result:", result);
  return result;
}

// Next.js API route handler
export async function POST(req: NextRequest) {
  try {
    const body: AgentInput = await req.json();
    const { input } = body;

    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }

    // Pass environment variables securely
    const env: AgentEnv = {
      LANGBASE_API_KEY: process.env.LANGBASE_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    };

    const result = await translationCallAgent({ input, env });
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("API Route Error:", error);
    // Don't expose detailed internal errors to the client
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: 'Failed to process translation request.', details: errorMessage }, { status: 500 });
  }
}
