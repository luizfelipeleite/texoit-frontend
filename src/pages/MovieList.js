import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { fetchData, API_URL } from "../utils/api";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedWinner, setSelectedWinner] = useState("all");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const yearFilter = selectedYear ? `&year=${selectedYear}` : "";
        let winnerFilter = "";
        if (selectedWinner === "true") {
          winnerFilter = "&winner=true";
        } else if (selectedWinner === "false") {
          winnerFilter = "&winner=false";
        }
        const url = `${API_URL}/movies?page=${page}&size=15${yearFilter}${winnerFilter}`;

        const moviesData = await fetchData(url);
        console.log(moviesData);
        const transformedMovies = moviesData.content.map((movie) => ({
          ...movie,
          winner: movie.winner ? "Yes" : "No",
        }));
        setMovies(transformedMovies);
        setTotalPages(moviesData.totalPages);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };
    fetchMovies();
  }, [selectedYear, selectedWinner, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="movie-list-container">
      <h2>Movie List</h2>
      <Table
        data={movies}
        headers={["id", "year", "title", "winner"]}
        headersMapping={{
          id: "ID",
          year: "Year",
          title: "Title",
          winner: "Winner?",
        }}
        filters={{
          year: selectedYear,
          winner: selectedWinner,
        }}
        onYearFilterChange={(value) => setSelectedYear(value)}
        onWinnerFilterChange={(value) => setSelectedWinner(value)}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default MovieList;
