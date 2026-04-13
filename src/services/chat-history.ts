import type { ChatMessage } from "@/services/chat";

const STORAGE_KEY = "brainbox_recent_threads";
const MAX_STORED_THREADS = 20;

export interface ChatThreadSummary {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
}

export interface StoredChatThread extends ChatThreadSummary {
  messages: ChatMessage[];
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function safeParseThreads(raw: string | null) {
  if (!raw) return [] as StoredChatThread[];

  try {
    const parsed = JSON.parse(raw) as StoredChatThread[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function truncateText(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

function buildTitle(messages: ChatMessage[]) {
  const firstUserMessage = messages.find((message) => message.role === "user");
  return truncateText(firstUserMessage?.content || "New Chat", 36);
}

function buildPreview(messages: ChatMessage[]) {
  const lastMessage = messages.at(-1);
  return truncateText(lastMessage?.content || "", 72);
}

export function createThreadId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `thread-${Date.now()}`;
}

export function getStoredThreads() {
  if (!canUseStorage()) return [] as StoredChatThread[];
  return safeParseThreads(localStorage.getItem(STORAGE_KEY));
}

export function getStoredThreadById(threadId: string) {
  return getStoredThreads().find((thread) => thread.id === threadId) ?? null;
}

export function getRecentThreadSummaries(limit?: number) {
  const threads = getStoredThreads().map<ChatThreadSummary>(
    ({ id, title, preview, updatedAt }) => ({
      id,
      title,
      preview,
      updatedAt,
    }),
  );

  return typeof limit === "number" ? threads.slice(0, limit) : threads;
}

export function upsertStoredThread(threadId: string, messages: ChatMessage[]) {
  if (!canUseStorage() || messages.length === 0) return;

  const nextThread: StoredChatThread = {
    id: threadId,
    title: buildTitle(messages),
    preview: buildPreview(messages),
    updatedAt: new Date().toISOString(),
    messages,
  };

  const currentThreads = getStoredThreads().filter(
    (thread) => thread.id !== threadId,
  );
  const nextThreads = [nextThread, ...currentThreads].slice(
    0,
    MAX_STORED_THREADS,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextThreads));
}

export function deleteStoredThread(threadId: string) {
  if (!canUseStorage()) return;

  const nextThreads = getStoredThreads().filter(
    (thread) => thread.id !== threadId,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextThreads));
}
