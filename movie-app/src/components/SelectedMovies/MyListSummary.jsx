import { getAverage } from "../../Helpers";

export default function MyListSummary({ selectedMovies }) {
  const avgRating = getAverage(
    selectedMovies.map((m) => parseFloat(m.imdbRating))
  );

  const avgDuration = getAverage(
    selectedMovies.map((m) => parseInt(m.Runtime))
  );
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>Listeye [{selectedMovies.length}] film eklendi.</h5>
        <div className="d-flex justify-content-between">
          <p>
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span>{avgRating.toFixed(2)}</span>
          </p>
          <p>
            <i className="bi bi-hourglass-split text-warning me-1"></i>
            <span>{avgDuration} dk</span>
          </p>
        </div>
      </div>
    </div>
  );
}
