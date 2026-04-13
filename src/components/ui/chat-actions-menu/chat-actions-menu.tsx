import { DotsThree, DownloadSimple, Trash } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/services/chat";

interface ChatActionsMenuProps {
  messages: ChatMessage[];
  onDelete: () => void;
  downloadTitle: string;
}

function sanitizeFilename(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "brainbox-chat"
  );
}

function downloadChatAsPdf(messages: ChatMessage[], title: string) {
  if (messages.length === 0) return;

  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const usableWidth = pageWidth - margin * 2;
  let cursorY = margin;

  const addPageIfNeeded = (requiredHeight: number) => {
    if (cursorY + requiredHeight <= pageHeight - margin) return;
    doc.addPage();
    cursorY = margin;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, margin, cursorY);
  cursorY += 28;

  messages.forEach((message) => {
    const roleLabel = message.role === "user" ? "User" : "Assistant";
    const bodyLines = doc.splitTextToSize(message.content, usableWidth - 24);
    const blockHeight = 24 + bodyLines.length * 16 + 20;

    addPageIfNeeded(blockHeight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(90, 90, 90);
    doc.text(roleLabel, margin, cursorY);
    cursorY += 10;

    doc.setDrawColor(229, 231, 235);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(
      margin,
      cursorY,
      usableWidth,
      24 + bodyLines.length * 16,
      12,
      12,
      "S",
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(17, 24, 39);
    doc.text(bodyLines, margin + 12, cursorY + 18);

    cursorY += 24 + bodyLines.length * 16 + 20;
  });

  doc.save(`${sanitizeFilename(title)}.pdf`);
}

function ChatActionsMenu({
  messages,
  onDelete,
  downloadTitle,
}: ChatActionsMenuProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleDownload = () => {
    if (!hasMessages) return;
    downloadChatAsPdf(messages, downloadTitle);
    setOpen(false);
  };

  const handleDelete = () => {
    if (!hasMessages) return;
    setConfirmOpen(true);
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setConfirmOpen(false);
  };

  return (
    <>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={t("chat.menuLabel")}
          aria-expanded={open}
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-[12px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <DotsThree size={22} weight="bold" />
        </button>

        {open && (
          <div className="absolute right-0 top-full z-30 mt-2 min-w-[180px] rounded-[16px] border border-border/70 bg-card p-1.5 shadow-[0_14px_34px_rgba(0,0,0,0.14)]">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!hasMessages}
              className={cn(
                "flex w-full cursor-pointer items-center gap-2 rounded-[12px] px-3 py-2.5 text-left text-sm transition-colors",
                hasMessages
                  ? "text-foreground hover:bg-secondary"
                  : "cursor-not-allowed text-muted-foreground/60",
              )}
            >
              <DownloadSimple size={18} />
              <span>{t("chat.downloadAction")}</span>
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={!hasMessages}
              className={cn(
                "flex w-full cursor-pointer items-center gap-2 rounded-[12px] px-3 py-2.5 text-left text-sm transition-colors",
                hasMessages
                  ? "text-destructive hover:bg-destructive/10"
                  : "cursor-not-allowed text-muted-foreground/60",
              )}
            >
              <Trash size={18} />
              <span>{t("chat.deleteAction")}</span>
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={t("chat.deleteDialogTitle")}
        description={t("chat.deleteConfirm")}
        cancelLabel={t("chat.deleteCancel")}
        confirmLabel={t("chat.deleteConfirmAction")}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        destructive
      />
    </>
  );
}

export { ChatActionsMenu };
