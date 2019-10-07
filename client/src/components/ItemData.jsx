import React from 'react';
import TitleOverview from './TitleBlock.jsx';
import DescriptionBlock from './DescriptionBlock.jsx';

class ItemData extends React.Component {
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