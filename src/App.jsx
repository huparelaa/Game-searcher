import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { useSearch } from "./hooks/useSearch";
import { Games } from "./components/games/Games";
import { API_URL } from "./utils/api";
function App() {
  const [games, setGames] = useState(null);
  const [page, setPage] = useState(1);
  const [searchGames, setSearch] = useState("");
  useEffect(() => {
    fetch(`${API_URL}&search=${search}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        if (games) {
          setGames([...games, ...res.results]);
        } else {
          setGames(res.results);
        }
      });
  }, [searchGames, page]);

  const { search, updateSearch, error } = useSearch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error) {
      setSearch(search);
      setGames([]);
    }
  };
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = window.innerHeight + window.scrollY;
      if (currentHeight >= scrollHeight) {
        setPage(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div className="page">
      <header className="header">
        <h1 style={{ color: "white" }}>Buscador de juegos</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Hades, Undertale..."
            onChange={(event) => updateSearch(event.target.value)}
            maxLength={255}
          />
          <p className="error">{error}</p>
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        {games ? (
          <>
            <Games games={games} />
          </>
        ) : (
          <p style={{ textAlign: "center", height: "100vh", color: "#fff" }}>
            Cargando juegos...
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
