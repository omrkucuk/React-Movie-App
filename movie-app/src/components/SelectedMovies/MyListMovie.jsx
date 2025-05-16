export default function MyListMovie({ movie, onDeleteFromList }) {
  return (
    <div className="card mb-2">
      <div className="row">
        <div className="col-4">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h6 className="card-title">{movie.Title}</h6>
            <div className="d-flex justify-content-between">
              <p>
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <i className="bi bi-hourglass text-warning me-1"></i>
                <span>{movie.Runtime} dk</span>
              </p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => onDeleteFromList(movie.imdbID)}
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
