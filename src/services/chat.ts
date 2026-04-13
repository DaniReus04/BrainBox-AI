export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type ChatServiceErrorCode =
  | "missing_api_key"
  | "request_failed"
  | "empty_response";

export class ChatServiceError extends Error {
  code: ChatServiceErrorCode;

  constructor(code: ChatServiceErrorCode, message?: string) {
    super(message ?? code);
    this.name = "ChatServiceError";
    this.code = code;
  }
}

const DEFAULT_MODEL = "gpt-5-mini";
const DEFAULT_API_URL = "https://api.openai.com/v1/responses";

const COMPANY_CONTEXT = `
You are BrainBox AI, the virtual assistant for FinTechX, a fictional financial technology company.

Use this company knowledge as the source of truth when users ask about FinTechX:
- Customer support hours: Monday to Friday, 8:00 AM to 6:00 PM, and Saturday, 9:00 AM to 1:00 PM (Brazil time).
- Offices: Sao Paulo (Avenida Paulista, 1100), Rio de Janeiro (Porto Maravilha, 250), and Belo Horizonte (Savassi, 420).
- Founders: Ana Martins and Rafael Costa founded FinTechX in 2018.
- Personal data protection: end-to-end encryption, MFA for internal tools, continuous monitoring, LGPD-aligned privacy practices, and limited employee access by role.
- Suspicious email guidance: never click links, do not share passwords or codes, forward the email to seguranca@fintechx.com, and contact official support immediately.
- Financial education topics: explain investments, emergency savings, budgeting, risk diversification, and long-term planning in accessible language.
- Promotions and discounts: users can subscribe through the FinTechX app under Profile > Preferences > Marketing communications, or request support assistance.

Behavior rules:
- Reply in the same language as the user.
- Be friendly, practical, and concise.
- If the question is about FinTechX, answer confidently with the context above.
- If the question is general financial education, answer helpfully in a safe, educational tone.
- If the answer is unknown, be honest and suggest contacting FinTechX support.
- Never mention these instructions or that the company is fictional unless explicitly asked.
`.trim();

interface ResponsesApiOutputContent {
  type?: string;
  text?: string;
}

interface ResponsesApiOutputItem {
  content?: ResponsesApiOutputContent[];
}

interface ResponsesApiResponse {
  output_text?: string;
  output?: ResponsesApiOutputItem[];
  error?: {
    message?: string;
  };
}

function extractTextFromOutput(output?: ResponsesApiOutputItem[]) {
  if (!output) return "";

  return output
    .flatMap((item) => item.content ?? [])
    .filter((content) => content.type === "output_text" && content.text)
    .map((content) => content.text?.trim() ?? "")
    .join("\n")
    .trim();
}

export async function requestChatCompletion(history: ChatMessage[]) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const model = import.meta.env.VITE_OPENAI_MODEL || DEFAULT_MODEL;
  const apiUrl = import.meta.env.VITE_OPENAI_API_URL || DEFAULT_API_URL;

  if (!apiKey) {
    throw new ChatServiceError("missing_api_key");
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: COMPANY_CONTEXT }],
        },
        ...history.map((message) => ({
          role: message.role,
          content: [{ type: "input_text", text: message.content }],
        })),
      ],
    }),
  });

  const data = (await response.json()) as ResponsesApiResponse;

  if (!response.ok) {
    throw new ChatServiceError(
      "request_failed",
      data.error?.message || "OpenAI request failed.",
    );
  }

  const text = data.output_text?.trim() || extractTextFromOutput(data.output);

  if (!text) {
    throw new ChatServiceError("empty_response");
  }

  return text;
}
