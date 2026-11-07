import { StrictMode } from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

const addPlayer = (name) => {
  fireEvent.change(screen.getByPlaceholderText("Player Name"), {
    target: { value: name },
  });
  fireEvent.click(screen.getByRole("button", { name: "Add Player" }));
};

test("adds players and keeps their scores independent and nonnegative", () => {
  render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  expect(screen.getByRole("button", { name: "Generate" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Add Player" })).toBeDisabled();
  expect(screen.getByText("You have no players yet :(")).toBeInTheDocument();

  addPlayer("Alice");
  addPlayer("Bob");

  const [alice, bob] = screen.getAllByRole("listitem");
  expect(within(alice).getByText("Alice")).toBeInTheDocument();
  expect(within(bob).getByText("Bob")).toBeInTheDocument();
  expect(within(alice).getByRole("button", { name: "-" })).toBeDisabled();
  fireEvent.click(within(alice).getByRole("button", { name: "+" }));
  expect(within(alice).getByText("1")).toBeInTheDocument();
  expect(within(bob).getByText("0")).toBeInTheDocument();
  fireEvent.click(within(alice).getByRole("button", { name: "-" }));
  expect(within(alice).getByText("0")).toBeInTheDocument();
  expect(within(alice).getByRole("button", { name: "-" })).toBeDisabled();
  expect(screen.getByPlaceholderText("Player Name")).toHaveValue("");
  expect(screen.getByRole("button", { name: "Generate" })).toBeEnabled();
});

test("starts the countdown only after generating a quote and cleans up on unmount", async () => {
  jest.useFakeTimers();
  const originalFetch = global.fetch;
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ quote: "A test quote." }),
  });
  const alert = jest.spyOn(window, "alert").mockImplementation(() => {});

  try {
    const { container, unmount } = render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    act(() => jest.advanceTimersByTime(20000));
    expect(alert).not.toHaveBeenCalled();
    expect(container.querySelector(".Timer p")).toBeEmptyDOMElement();

    addPlayer("Alice");
    fireEvent.click(screen.getByRole("button", { name: "Hard" }));
    expect(screen.getByText("hard")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Generate" }));
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "https://dummyjson.com/quotes/random",
    );
    expect(screen.getByText("A test quote.")).toBeInTheDocument();
    expect(container.querySelector(".Accent").textContent).toMatch(/ Accent$/);

    act(() => jest.advanceTimersByTime(1000));
    expect(container.querySelector(".Timer")).toHaveTextContent("14");
    expect(screen.getByRole("button", { name: "Generate" })).toBeDisabled();
    act(() => jest.advanceTimersByTime(15000));
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith("Time Over!");
    expect(screen.getByRole("button", { name: "Generate" })).toBeEnabled();

    global.fetch.mockResolvedValue({
      json: async () => ({ quote: "Another quote." }),
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Generate" }));
    });
    act(() => jest.advanceTimersByTime(1000));
    expect(container.querySelector(".Timer")).toHaveTextContent("14");
    unmount();
    expect(jest.getTimerCount()).toBe(0);
    act(() => jest.advanceTimersByTime(20000));
    expect(alert).toHaveBeenCalledTimes(1);
  } finally {
    global.fetch = originalFetch;
    alert.mockRestore();
    jest.useRealTimers();
  }
});
