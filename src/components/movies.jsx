import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres:[],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({movies: getMovies(), genres: getGenres()});
  }

  handleDelete = movieID => {
    const movies = this.state.movies.filter(movie => movie._id !== movieID);
    console.log("movieid", movieID);

    // update the state and show the correct list on the DOM
    this.setState({ movies });
  };

  handleMoviesCount = movies =>
    movies.length > 0
      ? `Showing ${movies.length} movies in the database!`
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
    console.log("page change clicked", page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log("Genre Clicked", genre);
  };



  render() {
    const { movies, currentPage, pageSize } = this.state;

    const moviesEachPage = paginate(movies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup 
          items={this.state.genres}
          onItemSelect={this.handleGenreSelect}
          textProperty="name"
          valueProperty="_id" />
        </div>
        <div className="col">
          <h2>{this.handleMoviesCount(movies)}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {moviesEachPage.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    {/* liked and onClicking are the custom properties defined and passed into Like class as props */}
                    <Like
                      liked={movie.liked}
                      onClicking={() => this.handleClickOnLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie._id)}
                      className="btn btn-danger btn-sm m-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
