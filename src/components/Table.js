import React from "react";
import backwardStep from "../assets/images/backward-step-solid.svg";
import caretLeft from "../assets/images/caret-left-solid.svg";
import caretRight from "../assets/images/caret-right-solid.svg";
import forwardStep from "../assets/images/forward-step-solid.svg";

function Table({
  data,
  headers,
  headersMapping,
  filters,
  onYearFilterChange,
  onWinnerFilterChange,
  page,
  totalPages,
  onPageChange,
}) {
  if (!Array.isArray(data)) {
    return <p>Data is not available.</p>;
  }

  const createPageNumbers = () => {
    const maxPageButtons = 5;
    const halfButtons = Math.floor(maxPageButtons / 2);

    const start = Math.max(
      Math.min(page - halfButtons, totalPages - maxPageButtons),
      0
    );
    return Array.from({ length: maxPageButtons }, (_, i) => start + i + 1);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>
                {headersMapping[header] || header}
                {filters && header === "year" && (
                  <input
                    type="text"
                    value={filters.year}
                    onChange={(e) => onYearFilterChange(e.target.value)}
                    placeholder="Enter Year"
                  />
                )}
                {filters && header === "winner" && (
                  <select
                    value={filters.winner}
                    onChange={(e) => onWinnerFilterChange(e.target.value)}
                  >
                    <option value="all">Yes/No</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>
                  {item.hasOwnProperty(header) ? item[header] : "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {onPageChange && (
        <div className="pagination">
          <button onClick={() => onPageChange(0)} disabled={page === 0}>
            <img src={backwardStep} alt="First" className="pagination-icon" />
          </button>
          <button onClick={() => onPageChange(page - 1)} disabled={page === 0}>
            <img src={caretLeft} alt="Previous" className="pagination-icon" />
          </button>
          {createPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber - 1)}
              className={page === pageNumber - 1 ? "active-page" : ""}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages - 1}
          >
            <img src={caretRight} alt="Next" className="pagination-icon" />
          </button>
          <button
            onClick={() => onPageChange(totalPages - 1)}
            disabled={page === totalPages - 1}
          >
            <img src={forwardStep} alt="Last" className="pagination-icon" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
