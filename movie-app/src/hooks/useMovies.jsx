import { useEffect, useState } from "react";
const api_key = "b468b084";

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function previousPage() {
    setCurrentPage(currentPage - 1);
  }
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getMovies(page) {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${api_key}&s=${query}&page=${page}`,
          { signal: signal }
        );

        if (!res.ok) {
          throw new Error("Bilinmeyen bir hata oluştu");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Film bulunamadı");
        }

        console.log(data);

        setMovies(data.Search);
        setTotalPage(data.totalResults / 10);
        setTotalResults(data.totalResults);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("aborted...");
        } else {
          setError(err.message);
        }
      }

      setLoading(false);
    }

    // fetch(`https://www.omdbapi.com/?apikey=${api_key}&s=${query}`)
    //   .then((res) => res.json())
    //   .then((data) => setMovies(data.Search));

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getMovies(currentPage);

    return () => {
      controller.abort();
    };
  }, [query, currentPage]);

  return {
    movies,
    loading,
    error,
    currentPage,
    totalPage,
    totalResults,
    nextPage,
    previousPage,
  };
}
