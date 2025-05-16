/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import useMovies from "./hooks/useMovies";
import useLocalStorage from "./hooks/useLocalStorage";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Nav from "./components/Navbar/Nav";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import NavSearchResults from "./components/Navbar/NavSearchResults";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import MovieList from "./components/Movies/MovieList";
import MovieDetails from "./components/Movies/MovieDetails";
import MyListSummary from "./components/SelectedMovies/MyListSummary";
import MyMovieList from "./components/SelectedMovies/MyMovieList";

const api_key = "b468b084";
export default function App() {
  const [query, Setquery] = useState("");
  const [selectedMovies, setSelectedMovies] = useLocalStorage(
    [],
    "selectedMovies"
  );
  const [selectedMovie, setSelectedMovie] = useState(null);

  const {
    movies,
    loading,
    error,
    currentPage,
    totalPage,
    totalResults,
    nextPage,
    previousPage,
  } = useMovies(query);

  function handleSelectedMovie(id) {
    setSelectedMovie((selectedMovie) => (id === selectedMovie ? null : id));
  }

  function handleUnselectedMovie() {
    setSelectedMovie(null);
  }

  function handleAddToList(movie) {
    setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
    handleUnselectedMovie();
  }

  function handleDeleteFromList(id) {
    setSelectedMovies((selectedMovies) =>
      selectedMovies.filter((m) => m.imdbID !== id)
    );
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={Setquery} />
        <NavSearchResults totalResults={totalResults} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            <ListContainer>
              {/* {loading ? <Loading /> : <MovieList movies={movies} />} */}
              {loading && <Loading />}
              {!loading && !error && (
                <>
                  {movies.length > 0 && (
                    <>
                      <MovieList
                        movies={movies}
                        onSelectedMovie={handleSelectedMovie}
                        selectedMovie={selectedMovie}
                      />
                      <Pagination
                        nextPage={nextPage}
                        previousPage={previousPage}
                        currentPage={currentPage}
                        totalPage={totalPage}
                      />
                    </>
                  )}
                </>
              )}
              {error && <ErrorMessage message={error} />}
            </ListContainer>
          </div>
          <div className="col-md-3">
            <ListContainer>
              <>
                {selectedMovie ? (
                  <MovieDetails
                    selectedMovie={selectedMovie}
                    onUnselectMovie={handleUnselectedMovie}
                    onAddToList={handleAddToList}
                    selectedMovies={selectedMovies}
                  />
                ) : (
                  <>
                    <MyListSummary selectedMovies={selectedMovies} />
                    <MyMovieList
                      selectedMovies={selectedMovies}
                      onDeleteFromList={handleDeleteFromList}
                    />
                  </>
                )}
              </>
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}
