import ollama from "ollama";

export async function summarize(text) {
  const response = await ollama.chat({
    model: "qwen2.5:3b",
    messages: [
      {
        role: "system",
        content:
          "You are an expert note summarizer. Summarize the note in clear bullet points.",
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return response.message.content;
}