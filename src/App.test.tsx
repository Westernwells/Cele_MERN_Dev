import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { AppStateProvider } from "./context/AppStateContext";

test("renders app correctly", () => {
  render(
    <AppStateProvider>
      <App />
    </AppStateProvider>
  );
  const linkElement = screen.getByText(/who are you buying for/i);
  expect(linkElement).toBeInTheDocument();
});
