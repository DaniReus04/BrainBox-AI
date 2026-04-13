import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("brainbox_theme");
  });

  afterEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("brainbox_theme");
  });

  it("should render with light mode aria-label by default", () => {
    render(<ThemeToggle />);
    expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();
  });

  it("should render with dark mode aria-label when dark class is present", () => {
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);
    expect(screen.getByLabelText("Switch to light mode")).toBeInTheDocument();
  });

  it("should toggle from light to dark on click", () => {
    render(<ThemeToggle />);
    screen.getByLabelText("Switch to dark mode").click();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should toggle from dark to light on click", () => {
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);
    screen.getByLabelText("Switch to light mode").click();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("should apply custom className", () => {
    render(<ThemeToggle className="custom-class" />);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("should persist theme to localStorage on toggle", () => {
    render(<ThemeToggle />);
    screen.getByLabelText("Switch to dark mode").click();
    expect(localStorage.getItem("brainbox_theme")).toBe("dark");
  });

  it("should render a button element", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
