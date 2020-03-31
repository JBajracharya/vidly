import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => <Like liked={movie.liked} onClicking={() => this.props.onLike(movie)} />
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.onDelete(movie._id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { onDelete, onLike, onSort, movies, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
