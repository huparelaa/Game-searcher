import {useState,useEffect} from 'react';
import { API_URL } from "../utils/api";
export function SearchGames (){
  const [games, setGames] = useState(null);
  const [page, setPage] = useState(1);
  const [searchGames, setSearchGames] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    fetch(`${API_URL}&search=${searchGames}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        if (games) {
          setGames([...games, ...res.results]);
        } else {
          setGames(res.results);
        }
        setIsLoading(false)
      });
  }, [searchGames, page]);

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

  return {games,setGames,setSearchGames, isLoading}
}

