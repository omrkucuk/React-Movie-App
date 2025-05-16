import useMovieDetails from "../../hooks/useMovieDetails";
import Loading from "../Loading";
export default function MovieDetails({
  selectedMovie,
  onUnselectMovie,
  onAddToList,
  selectedMovies,
}) {
  const { movie, loading } = useMovieDetails(selectedMovie);

  const isAddedToList = selectedMovies
    .map((m) => m.imdbID)
    .includes(selectedMovie);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="border p-2 mb-3">
          <div className="row">
            <div className="col-4">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "../public/img/istockphoto-931643150-612x612.jpg"
                }
                alt={movie.Title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-8">
              <h6>{movie.Title}</h6>
              <p>
                <i className="bi bi-calendar2-date me-1"></i>
                <span>{movie.Year}</span>
              </p>
              <p>
                <i className="bi bi-star-fill text-warning"></i>
                <span>{movie.imdbRating}</span>
              </p>
            </div>
            <div className="col-12 border-top p-3 mt-3">
              <p>{movie.Plot}</p>
              {
                <p>
                  {movie.Genre?.split(", ").map((genre, index) => (
                    <span
                      key={index}
                      className="badge text-bg-primary me-1 p-2"
                    >
                      {genre}
                    </span>
                  ))}
                </p>
              }
              {!isAddedToList ? (
                <button
                  className="btn btn-primary me-1"
                  onClick={() => onAddToList(movie)}
                >
                  Listeye Ekle
                </button>
              ) : (
                <p>Film listenizde.</p>
              )}

              <button className="btn btn-danger" onClick={onUnselectMovie}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
