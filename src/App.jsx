import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { useSearch } from "./hooks/useSearch";
import { Games } from "./components/games/Games";
import { SearchGames } from "./services/searchGames";
function App() {
  const { search, updateSearch, error } = useSearch();
  const { games, setGames, setSearchGames, isLoading } = SearchGames();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error) {
      setGames([]);
      setSearchGames(search);
    }
  };
  return (
    <div className="page" style={{ height: games?.length < 1 ? "100vh" : "" }}>
      <header className="header">
        <h1 style={{ color: "white" }}>Buscador de juegos</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="The Witcher"
            onChange={(event) => updateSearch(event.target.value)}
            maxLength={255}
          />
          <p className="error">{error}</p>
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        {games?.length > 0 ? (
          <Games games={games} />
        ) : isLoading ? (
          <h1 className="warning">Buscando juegos</h1>
        ) : (
          <h1 className="warning">No se encontraron juegos</h1>
        )}
      </main>
    </div>
  );
}

export default App;
