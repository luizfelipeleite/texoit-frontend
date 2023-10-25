import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";

describe("Dashboard Component", () => {
  it("renders dashboard component", () => {
    render(<Dashboard />);
    const headerElement = screen.getByText("List years with multiple winners");
    expect(headerElement).toBeInTheDocument();
  });
});
