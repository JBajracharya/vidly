import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import NavBar from "./navBar";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movieID => {
    const movies = this.state.movies.filter(movie => movie._id !== movieID);
    console.log("movieid", movieID);

    // update the state and show the correct list on the DOM
    this.setState({ movies });
  };

  handleMoviesCount = moviesCount =>
    moviesCount > 0
      ? `Showing ${moviesCount} movies in the database!`
      : "There are no movies in your list";

  handleClickOnLike = movie => {
    //   instructor way
    // make copie and clone the movies state so that it doesn't change the original state
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
    // -> this method works as well
    //   console.log("cliked like", movie );
    //   if(movie.liked) {
    //       movie.liked = false;
    //   }else {
    //       movie.liked = true;
    //   }
    //   this.setState({movie});
  };

  handlePageChange = page => {
    // console.log("page change clicked", page);
    // -> setting state causes the page to re-render
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    // console.log("Genre Clicked", genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );

    const moviesEachPage = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filtered.length, data: moviesEachPage };
  };

  render() {
    const { currentPage, pageSize, sortColumn } = this.state;
    const { totalCount, data: moviesEachPage } = this.getPagedData();

    return (
      <div>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
              // To simplify these two properties are set to default props in listGroup component
              // textProperty="name"
              // valueProperty="_id"
            />
          </div>
          <div className="col">
            <h2>{this.handleMoviesCount(totalCount)}</h2>
            <MoviesTable
              movies={moviesEachPage}
              sortColumn={sortColumn}
              onLike={this.handleClickOnLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
