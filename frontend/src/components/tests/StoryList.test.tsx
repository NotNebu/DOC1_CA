import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { StoryList } from "../StoryList";

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.resetAllMocks();
});

test("fetches and displays stories", async () => {
  // Mock GET request
  (fetch as any).mockResolvedValueOnce({
    json: async () => [
      { id: 1, title: "Test Story", content: "Hello", department: "News" },
    ],
  });

  render(<StoryList />);

  // Wait for useEffect to complete
  await waitFor(() => {
    expect(screen.getByText("Test Story")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("News")).toBeInTheDocument();
  });
});

test("deletes story and refetches", async () => {
  // First fetch call
  (fetch as any).mockResolvedValueOnce({
    json: async () => [
      { id: 1, title: "To Delete", content: "bye", department: "Crime" },
    ],
  });

  // Delete call
  (fetch as any).mockResolvedValueOnce({ ok: true });

  // Second fetch after delete
  (fetch as any).mockResolvedValueOnce({
    json: async () => [],
  });

  render(<StoryList />);

  await waitFor(() => {
    expect(screen.getByText("To Delete")).toBeInTheDocument();
  });

  // Click delete
  fireEvent.click(screen.getByText("Delete"));

  await waitFor(() => {
    expect(screen.queryByText("To Delete")).not.toBeInTheDocument();
  });

  expect(fetch).toHaveBeenCalledTimes(3); // 1x GET, 1x DELETE, 1x re-fetch
});
