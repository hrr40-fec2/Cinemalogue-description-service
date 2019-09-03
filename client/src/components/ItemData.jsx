import React from 'react';
import TitleOverview from './TitleBlock.jsx';
import DescriptionBlock from './DescriptionBlock.jsx';

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
          <TitleOverview movie={movie} handleRatingInput={this.props.handleRatingInput}></TitleOverview>
          <DescriptionBlock movie={movie}></DescriptionBlock>
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