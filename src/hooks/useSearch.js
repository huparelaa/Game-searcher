import { useState, useEffect, useRef } from "react";

export function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState("");
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError(
        "De momento los desarrolladores siguen empeñándose en poner nombres a los juegos"
      );
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("La mayoría de los juegos inician con una letra");
      return;
    }
    if (search.length < 3) {
      setError("Ese nombre parece ser un poco corto");
      return;
    }
    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}
