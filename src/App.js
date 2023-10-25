import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MovieList from "./pages/MovieList";
import './assets/styles/index.scss';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="menu">
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/movie-list">Movie List</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/movie-list" element={<MovieList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
