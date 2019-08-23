import React from 'react';
import Ratings from './Ratings.jsx';
import $ from 'jquery';


class ItemData extends React.Component {
  //where would movieId/name get selected? presumably by user interaction
  //on a parent App component, when they click on a movie name or identifier it will setstate/render ItemData
  //and pass down the selected movie as prop

  constructor (props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount () {
      var url = '/movies/' + this.props.movieID;
      $.get(url, (movie) => {
        this.setState({movie: movie[0]});
      });
  }

  getMovieDetails () {
    var {movie} = this.state;
    if (movie) {
      return (
        <div className="movieDetailsOverview">
          <div className="titleBlock">
            <button className="watchlistRibbon"></button>
            <div className="header">
              <h1>{movie.title}</h1> <h2>{movie.releaseDate}</h2>
            </div>
            <div className="subtext">
              <span>{movie.mpaaRating} | {movie.runtime} | {movie.genres} | {movie.releaseDate} </span>
            </div>
            <Ratings average={movie.imdbRatingsAverage} amount={movie.imdbRatings}/>
          </div>
          <div className="moviesummary">
            <div className="poster">
              <img src={movie.imageUrl}></img>
              <p>{movie.blurb}</p>
              <span>Director: {movie.director}</span>
              <span>Writer: {movie.writer}</span>
              <span>Stars: {movie.stars}</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
       <div className="movieDetailsOverview">
          Loading...
        </div>
      );
    }
  }

  render () {
    return this.getMovieDetails();
  }
}

export default ItemData;