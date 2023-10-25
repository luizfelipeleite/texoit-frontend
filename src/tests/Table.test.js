import { render, screen } from "@testing-library/react";
import Table from "../components/Table";

describe("Table Component", () => {
  it("renders table component with data", () => {
    const data = [
      { id: 1, year: 2022, title: "Movie 1", winner: "Yes" },
      { id: 2, year: 2023, title: "Movie 2", winner: "No" },
    ];

    render(
      <Table
        data={data}
        headers={["id", "year", "title", "winner"]}
        headersMapping={{
          id: "ID",
          year: "Year",
          title: "Title",
          winner: "Winner?",
        }}
      />
    );

    const firstRow = screen.getByText("1");
    const secondRow = screen.getByText("Movie 2");
    expect(firstRow).toBeInTheDocument();
    expect(secondRow).toBeInTheDocument();
  });
});
