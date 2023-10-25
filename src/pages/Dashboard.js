import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { fetchData, API_URL } from "../utils/api";
import magnifyingGlassImage from "../assets/images/magnifying-glass-solid.svg";

function Dashboard() {
  const [multipleWinnerYears, setMultipleWinnerYears] = useState([]);
  const [topStudios, setTopStudios] = useState([]);
  const [producerIntervals, setProducerIntervals] = useState([]);
  const [searchYear, setSearchYear] = useState("");
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const multipleWinnerYearsData = await fetchData(
          `${API_URL}/movies?projection=years-with-multiple-winners`
        );
        setMultipleWinnerYears(multipleWinnerYearsData.years);

        const topStudiosData = await fetchData(
          `${API_URL}/movies?projection=studios-with-win-count`
        );
        setTopStudios(topStudiosData.studios);

        const producerIntervalsData = await fetchData(
          `${API_URL}/movies?projection=max-min-win-interval-for-producers`
        );
        setProducerIntervals(producerIntervalsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const searchWinnersByYear = async () => {
      if (searchYear) {
        try {
          const winnersData = await fetchData(
            `${API_URL}/movies?winner=true&year=${searchYear}`
          );
          console.log(winnersData);
          setWinners(winnersData);
        } catch (error) {
          console.error("Error fetching winners for a specific year: ", error);
        }
      }
    };

    searchWinnersByYear();
  }, [searchYear]);

  const headersMapping = {
    year: "Year",
    winnerCount: "Win Count",
    winCount: "Win Count",
    name: "Name",
    producer: "Producer",
    interval: "Interval",
    previousWin: "Previous Year",
    followingWin: "Following Year",
    id: "Id",
    title: "Title",
  };

  return (
    <div className="dashboard-container">
      <div className="grid-container">
        <div className="grid-item">
          <h3>List years with multiple winners</h3>
          <Table
            data={multipleWinnerYears}
            headers={["year", "winnerCount"]}
            headersMapping={headersMapping}
          />
        </div>
        <div className="grid-item">
          <h3>Top 3 Studios with winners</h3>
          <Table
            data={topStudios.slice(0, 3)}
            headers={["name", "winCount"]}
            headersMapping={headersMapping}
          />
        </div>
        <div className="grid-item">
          <h3>Producers with longest and shortest interval between wins</h3>
          <h3>Maximum</h3>
          <Table
            data={producerIntervals.max}
            headers={["producer", "interval", "previousWin", "followingWin"]}
            headersMapping={headersMapping}
          />
          <h3>Minimum</h3>
          <Table
            data={producerIntervals.min}
            headers={["producer", "interval", "previousWin", "followingWin"]}
            headersMapping={headersMapping}
          />
        </div>
        <div className="grid-item">
          <h3>Search Winners by Year</h3>
          <div className="search-year">
            <input
              type="number"
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
              placeholder="Search by year"
            />
            <img
              className="magnifying-glass"
              src={magnifyingGlassImage}
              alt="Search"
            />
          </div>
          <Table
            data={winners}
            headers={["id", "year", "title"]}
            headersMapping={headersMapping}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
