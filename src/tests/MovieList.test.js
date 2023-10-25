import { render, screen } from "@testing-library/react";
import MovieList from "../pages/MovieList";

describe("MovieList Component", () => {
  it("renders movie list component", () => {
    render(<MovieList />);
    const headerElement = screen.getByText("Movie List");
    expect(headerElement).toBeInTheDocument();
  });
});
