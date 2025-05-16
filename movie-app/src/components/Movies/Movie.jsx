export default function Movie({ movie, onSelectedMovie, selectedMovie }) {
  return (
    <div className="col mb-2">
      <div
        className={`card movie ${
          selectedMovie === movie.imdbID ? "selected-movie" : ""
        }`}
        onClick={() => onSelectedMovie(movie.imdbID)}
      >
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "../public/img/istockphoto-931643150-612x612.jpg"
          }
          alt={movie.Title}
          className="card-img-top"
        />
        <div className="card-body">
          <h6 className="card-title">{movie.Title}</h6>
          <div>
            <i className="bi bi-calendar2-date me-1"></i>
            <span>{movie.Year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
