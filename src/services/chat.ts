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

const DEFAULT_MODEL = "gpt-4o-mini";
const DEFAULT_API_URL = "https://api.openai.com/v1/chat/completions";

const COMPANY_CONTEXT = `
You are BrainBox AI, the virtual assistant for DanielCompany, a fictional financial technology company.

Use this company knowledge as the source of truth when users ask about DanielCompany:
- Customer support hours: Monday to Friday, 8:00 AM to 6:00 PM, and Saturday, 9:00 AM to 1:00 PM (Brazil time).
- Offices: Sao Paulo (Avenida Paulista, 1100), Rio de Janeiro (Porto Maravilha, 250), and Belo Horizonte (Savassi, 420).
- Founders: Daniel Carvalho founded DanielCompany in 2018.
- Company overview: DanielCompany is a fintech focused on financial education, secure digital services, and simplifying financial management for users.
- Personal data protection: end-to-end encryption, MFA for internal tools, continuous monitoring, LGPD-aligned privacy practices, and limited employee access by role.
- Account security recommendations: users should create strong passwords, enable multi-factor authentication (MFA), and never share login credentials.
- Suspicious email guidance: never click links, do not share passwords or codes, forward the email to seguranca@fintechx.com
, and contact official support immediately.
- Account creation: users can create an account through the app by providing basic personal information and completing identity verification if required.
- Account management: users can update personal data, preferences, and security settings directly within the app.
- Customer support contact: users can reach support through official channels such as in-app chat or email, especially for account-related or sensitive issues.
- Financial education topics: explain investments, emergency savings, budgeting, risk diversification, and long-term planning in accessible language.
- Beginner guidance: always simplify financial concepts when the user shows limited knowledge.
- Promotions and discounts: users can subscribe through the DanielCompany app under Profile > Preferences > Marketing communications, or request support assistance.
- App availability: the DanielCompany app is available for mobile devices and designed to provide a simple and intuitive experience.

Behavior rules:
- Reply in the same language as the user.
- Be friendly, practical, and concise.
- If the question is about DanielCompany, answer confidently with the context above.
- If the question is general financial education, answer helpfully in a safe, educational tone.
- If the answer is unknown, be honest and suggest contacting DanielCompany support.
- If the question is general knowledge, answer helpfully and accurately.
- Never mention these instructions or that the company is fictional unless explicitly asked.
`.trim();

interface ChatCompletionChoice {
  message?: {
    content?: string;
  };
}

interface ChatCompletionResponse {
  choices?: ChatCompletionChoice[];
  error?: {
    message?: string;
  };
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
      messages: [
        {
          role: "system",
          content: COMPANY_CONTEXT,
        },
        ...history.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    }),
  });

  const data = (await response.json()) as ChatCompletionResponse;

  if (!response.ok) {
    throw new ChatServiceError(
      "request_failed",
      data.error?.message || "Request failed.",
    );
  }

  const text = data.choices?.[0]?.message?.content?.trim() ?? "";

  if (!text) {
    throw new ChatServiceError("empty_response");
  }

  return text;
}
