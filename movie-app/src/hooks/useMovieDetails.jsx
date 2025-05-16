import { useEffect, useState } from "react";
const api_key = "b468b084";

export default function useMovieDetails(id) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${api_key}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setLoading(false);
      }

      getMovieDetails();
    },
    [id]
  );

  return { movie, loading };
}
