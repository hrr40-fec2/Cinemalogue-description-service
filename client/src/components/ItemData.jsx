import React from 'react';
import Ratings from './Ratings.jsx';
import TitleBlock from './TitleBlock.jsx';

class ItemData extends React.Component {
  //the movie object should be probably passed down as a prop from a parent component rather than fetched inside ItemData
  //thinking of the page as a whole, each element on the page would use the data for the movie being rendered
  //and the get request would happen when the whole page renders/rerenders (the movieID for the get request coming from a
  //click or search by the user) rather than separately for different modules

  getMovieDetails () {
    var {movie} = this.props;
    if (movie) {
      return (
        <div className="movieDetailsOverview">
          <TitleBlock>
            <button className="watchlistRibbon"></button>
            <div className="header">
              <h1>{movie.title}</h1> <h2>{movie.releaseDate}</h2>
            </div>
            <div className="subtext">
              <span>{movie.mpaaRating} | {movie.runtime} | {movie.genres} | {movie.releaseDate} </span>
            </div>
            <Ratings average={movie.imdbRatingsAverage} amount={movie.imdbRatings} handleRatingInput={this.props.handleRatingInput}/>
          </TitleBlock>
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