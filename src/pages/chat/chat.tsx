import {
  ArrowClockwise,
  CaretLeft,
  Check,
  Copy,
  DownloadSimple,
} from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import logoBlack from "@/assets/img/logo-black.png";
import logoWhite from "@/assets/img/logo-white.png";
import robotImage from "@/assets/img/robot-image.png";
import { Button } from "@/components/ui/button";
import { ChatActionsMenu } from "@/components/ui/chat-actions-menu";
import { ChatInput } from "@/components/ui/chat-input";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import {
  type ChatMessage,
  ChatServiceError,
  requestChatCompletion,
} from "@/services/chat";
import {
  createThreadId,
  deleteStoredThread,
  getStoredThreadById,
  upsertStoredThread,
} from "@/services/chat-history";

function ChatPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const requestedThreadId = searchParams.get("thread");
  const [threadId, setThreadId] = useState<string | null>(requestedThreadId);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const emptyStateItems = [
    t("chat.infoOne"),
    t("chat.infoTwo"),
    t("chat.infoThree"),
    t("chat.infoFour"),
    t("chat.infoFive"),
  ];

  const messageCount = messages.length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll must re-run when message count or loading state changes
  useEffect(() => {
    if (!scrollAreaRef.current) return;

    scrollAreaRef.current.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messageCount, isLoading]);

  useEffect(() => {
    if (!requestedThreadId) {
      setThreadId(null);
      setMessages([]);
      setError(null);
      return;
    }

    const storedThread = getStoredThreadById(requestedThreadId);

    if (!storedThread) {
      setThreadId(requestedThreadId);
      setMessages([]);
      setError(null);
      return;
    }

    setThreadId(storedThread.id);
    setMessages(storedThread.messages);
    setError(null);
  }, [requestedThreadId]);

  const lastUserMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === "user"),
    [messages],
  );

  const resolveErrorMessage = (submissionError: unknown) => {
    if (submissionError instanceof ChatServiceError) {
      if (submissionError.code === "missing_api_key") {
        return t("chat.errorMissingKey");
      }

      if (submissionError.code === "empty_response") {
        return t("chat.errorEmptyResponse");
      }

      return submissionError.message === "OpenAI request failed."
        ? t("chat.errorRequestFailed")
        : submissionError.message;
    }

    if (submissionError instanceof Error && submissionError.message) {
      return submissionError.message;
    }

    return t("chat.errorRequestFailed");
  };

  const requestAssistantReply = async (
    activeThreadId: string,
    history: ChatMessage[],
  ) => {
    setError(null);
    setIsLoading(true);

    try {
      const assistantReply = await requestChatCompletion(history);
      const nextMessages: ChatMessage[] = [
        ...history,
        {
          role: "assistant",
          content: assistantReply,
        },
      ];
      setMessages(nextMessages);
      upsertStoredThread(activeThreadId, nextMessages);
    } catch (submissionError) {
      setError(resolveErrorMessage(submissionError));
    } finally {
      setIsLoading(false);
    }
  };

  const submitMessage = async (messageContent: string) => {
    const trimmedMessage = messageContent.trim();

    if (!trimmedMessage || isLoading) return;

    const activeThreadId = threadId ?? createThreadId();

    if (!threadId) {
      setThreadId(activeThreadId);
      setSearchParams({ thread: activeThreadId }, { replace: true });
    }

    const nextHistory: ChatMessage[] = [
      ...messages,
      {
        role: "user",
        content: trimmedMessage,
      } satisfies ChatMessage,
    ];

    setMessages(nextHistory);
    setInputValue("");
    upsertStoredThread(activeThreadId, nextHistory);

    await requestAssistantReply(activeThreadId, nextHistory);
  };

  const handleRegenerate = async () => {
    if (!lastUserMessage) return;

    const historyWithoutLastAssistant =
      messages.at(-1)?.role === "assistant" ? messages.slice(0, -1) : messages;

    setMessages(historyWithoutLastAssistant);
    if (!threadId) return;
    upsertStoredThread(threadId, historyWithoutLastAssistant);
    await requestAssistantReply(threadId, historyWithoutLastAssistant);
  };

  const handleDeleteChat = () => {
    if (threadId) {
      deleteStoredThread(threadId);
    }

    setMessages([]);
    setInputValue("");
    setError(null);
    setThreadId(null);
    setSearchParams({}, { replace: true });
    navigate("/home");
  };

  return (
    <main className="flex h-screen w-full flex-col bg-background text-foreground">
      <section className="flex min-h-0 w-full flex-1 flex-col bg-background">
        <header className="shrink-0 border-b border-border bg-background">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-[40px_auto] items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="inline-flex size-10 items-center justify-center rounded-[12px] bg-secondary text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.06)] cursor-pointer"
                aria-label={t("chat.backToHome")}
              >
                <CaretLeft size={18} weight="bold" />
              </button>
            </div>

            <div className="flex items-center justify-end gap-2">
              <ThemeToggle className="static left-auto top-auto size-10 rounded-[12px] hover:text-foreground" />
              <LanguageToggle
                buttonClassName="size-10 rounded-[12px] text-[11px] font-semibold tracking-[0.12em]"
                menuClassName="right-0 left-auto"
              />
              <ChatActionsMenu
                messages={messages}
                onDelete={handleDeleteChat}
                downloadTitle={threadId || "brainbox-chat"}
              />
            </div>
          </div>
        </header>

        <div
          ref={scrollAreaRef}
          className={cn(
            "flex-1 overflow-y-auto custom-scrollbar",
            messages.length === 0
              ? "bg-background"
              : "bg-white dark:bg-[#171a1b]",
          )}
        >
          <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col">
            {messages.length === 0 ? (
              <div className="flex flex-1 flex-col px-4 pb-6 pt-8 sm:px-6 lg:px-10">
                <div className="mx-auto w-full max-w-[520px] text-center">
                  <h2 className="mt-7 text-[28px] font-semibold tracking-tight text-foreground/55">
                    {t("chat.emptyTitle")}
                  </h2>
                </div>

                <div className="mx-auto mt-10 grid w-full max-w-[520px] gap-3">
                  {emptyStateItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-[14px] bg-secondary px-5 py-4 text-center text-[12px] leading-6 text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full">
                {messages.map((message) => {
                  const isUser = message.role === "user";

                  return (
                    <article
                      key={`${message.role}-${message.content.slice(0, 20)}`}
                      className={cn(
                        "border-b border-black/4 dark:border-white/4",
                        isUser
                          ? "bg-[#ffffff] dark:bg-[#171a1b]"
                          : "bg-[#f6f6f6] dark:bg-[#26292a]",
                      )}
                    >
                      <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 lg:px-10">
                        <div className="flex items-center gap-3">
                          <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-secondary">
                            {isUser ? (
                              <img
                                src={robotImage}
                                alt=""
                                aria-hidden="true"
                                className="size-7 object-cover"
                              />
                            ) : (
                              <>
                                <img
                                  src={logoBlack}
                                  alt=""
                                  aria-hidden="true"
                                  className="h-4 w-auto object-cover dark:hidden"
                                />
                                <img
                                  src={logoWhite}
                                  alt=""
                                  aria-hidden="true"
                                  className="hidden h-4 w-auto object-cover dark:block"
                                />
                              </>
                            )}
                          </div>

                          <p className="min-w-0 flex-1 truncate text-[10px] font-medium">
                            {message.content}
                          </p>
                        </div>

                        {!isUser && (
                          <>
                            <div className="mt-2 flex justify-end gap-3 text-muted-foreground">
                              <button
                                type="button"
                                aria-label="Copy answer"
                                className="cursor-pointer transition-colors hover:text-foreground"
                                onClick={() => {
                                  const idx = messages.indexOf(message);
                                  navigator.clipboard.writeText(
                                    message.content,
                                  );
                                  setCopiedIndex(idx);
                                  setTimeout(() => setCopiedIndex(null), 2000);
                                }}
                              >
                                {copiedIndex === messages.indexOf(message) ? (
                                  <Check size={14} className="text-green-500" />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>
                              <button
                                type="button"
                                aria-label="Download answer as PDF"
                                className="cursor-pointer transition-colors hover:text-foreground"
                                onClick={() => {
                                  const doc = new jsPDF({
                                    unit: "pt",
                                    format: "a4",
                                  });
                                  const margin = 48;
                                  const usable =
                                    doc.internal.pageSize.getWidth() -
                                    margin * 2;
                                  doc.setFont("helvetica", "normal");
                                  doc.setFontSize(11);
                                  const lines = doc.splitTextToSize(
                                    message.content,
                                    usable,
                                  );
                                  doc.text(lines, margin, margin);
                                  doc.save("brainbox-answer.pdf");
                                }}
                              >
                                <DownloadSimple size={14} />
                              </button>
                            </div>

                            <p className="mt-3 max-w-[680px] text-[11px] leading-[1.9] text-foreground/78">
                              {message.content}
                            </p>
                          </>
                        )}
                      </div>
                    </article>
                  );
                })}

                {isLoading && (
                  <div className="bg-[#f6f6f6] dark:bg-[#26292a]">
                    <div className="mx-auto w-full max-w-5xl px-4 py-5 text-[11px] leading-[1.9] text-foreground/78 sm:px-6 lg:px-10">
                      {t("chat.thinking")}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-border bg-background px-4 pb-5 pt-4 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-5xl">
            {error && (
              <div className="mb-3 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-xs leading-6 text-destructive">
                {error}
              </div>
            )}

            {messages.length > 0 && lastUserMessage && (
              <div className="mb-5 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRegenerate}
                  disabled={isLoading}
                  className="h-[38px] rounded-[10px] border-border bg-transparent px-4 text-[11px] font-normal text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  <ArrowClockwise size={13} />
                  {t("chat.regenerate")}
                </Button>
              </div>
            )}

            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={submitMessage}
              disabled={isLoading}
              placeholder={t("chat.inputPlaceholder")}
              sendLabel={t("chat.sendMessage")}
              className="bg-secondary"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export { ChatPage };
