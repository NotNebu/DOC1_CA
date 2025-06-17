import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StoryForm } from "../StoryForm";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
  ) as any;
});

test("submits form, calls onAdd, and resets fields", async () => {
  const onAdd = vi.fn();

  render(<StoryForm onAdd={onAdd} />);

  const titleInput = screen.getByPlaceholderText("Title");
  const contentInput = screen.getByPlaceholderText("Content");
  const departmentInput = screen.getByPlaceholderText("Department");

  // Simulér brugerinput
  fireEvent.change(titleInput, { target: { value: "Test title" } });
  fireEvent.change(contentInput, { target: { value: "Some content" } });
  fireEvent.change(departmentInput, { target: { value: "News" } });

  // Klik submit
  fireEvent.click(screen.getByText("Add Story"));

  // Vent på fetch og post-submit handlinger
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:30080/api/stories",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          title: "Test title",
          content: "Some content",
          department: "News",
        }),
      })
    );
    expect(onAdd).toHaveBeenCalled();
    expect(titleInput).toHaveValue("");
    expect(contentInput).toHaveValue("");
    expect(departmentInput).toHaveValue("");
  });
});
