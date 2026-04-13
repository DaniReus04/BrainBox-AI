import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChatActionsMenu } from "./chat-actions-menu";

const {
  saveMock,
  textMock,
  roundedRectMock,
  addPageMock,
  splitTextToSizeMock,
} = vi.hoisted(() => ({
  saveMock: vi.fn(),
  textMock: vi.fn(),
  roundedRectMock: vi.fn(),
  addPageMock: vi.fn(),
  splitTextToSizeMock: vi.fn((text: string) => [text]),
}));

vi.mock("jspdf", () => ({
  jsPDF: class {
    internal = {
      pageSize: {
        getWidth: () => 595,
        getHeight: () => 842,
      },
    };

    setFont = vi.fn();
    setFontSize = vi.fn();
    setTextColor = vi.fn();
    text = textMock;
    setDrawColor = vi.fn();
    setFillColor = vi.fn();
    roundedRect = roundedRectMock;
    addPage = addPageMock;
    splitTextToSize = splitTextToSizeMock;
    save = saveMock;
  },
}));

const messages = [
  { role: "user" as const, content: "Hello" },
  { role: "assistant" as const, content: "Hi there" },
];

describe("ChatActionsMenu", () => {
  beforeEach(() => {
    saveMock.mockClear();
    textMock.mockClear();
    roundedRectMock.mockClear();
    addPageMock.mockClear();
    splitTextToSizeMock.mockClear();
  });

  it("should open the dropdown menu", () => {
    render(
      <ChatActionsMenu
        messages={messages}
        downloadTitle="brainbox-chat"
        onDelete={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByLabelText("Open chat options"));

    expect(screen.getByText("Download Chat")).toBeInTheDocument();
    expect(screen.getByText("Delete Chat")).toBeInTheDocument();
  });

  it("should close the dropdown when clicking outside", () => {
    render(
      <div>
        <button type="button">Outside</button>
        <ChatActionsMenu
          messages={messages}
          downloadTitle="brainbox-chat"
          onDelete={vi.fn()}
        />
      </div>,
    );

    fireEvent.click(screen.getByLabelText("Open chat options"));
    fireEvent.mouseDown(screen.getByText("Outside"));

    expect(screen.queryByText("Download Chat")).not.toBeInTheDocument();
  });

  it("should export the chat as pdf when download is clicked", () => {
    render(
      <ChatActionsMenu
        messages={messages}
        downloadTitle="brainbox-chat"
        onDelete={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByLabelText("Open chat options"));
    fireEvent.click(screen.getByText("Download Chat"));

    expect(saveMock).toHaveBeenCalledWith("brainbox-chat.pdf");
    expect(textMock).toHaveBeenCalled();
    expect(roundedRectMock).toHaveBeenCalled();
  });

  it("should open confirmation dialog before deleting", () => {
    render(
      <ChatActionsMenu
        messages={messages}
        downloadTitle="brainbox-chat"
        onDelete={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByLabelText("Open chat options"));
    fireEvent.click(screen.getByText("Delete Chat"));

    expect(screen.getByText("Delete chat?")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete this chat?"),
    ).toBeInTheDocument();
  });

  it("should call onDelete when deletion is confirmed", () => {
    const onDelete = vi.fn();

    render(
      <ChatActionsMenu
        messages={messages}
        downloadTitle="brainbox-chat"
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText("Open chat options"));
    fireEvent.click(screen.getByText("Delete Chat"));
    fireEvent.click(screen.getByText("Delete"));

    expect(onDelete).toHaveBeenCalledOnce();
  });
});
