import styled from 'styled-components';
import React from 'react';
import Ratings from './Ratings.jsx';

const TitleBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #302d2d;
  color: grey;
`;

const WatchlistRibbon = styled.div`
`;

const Title = styled.span`
  color: white;
  font-size: 40px;
  margin: none;
  `;

const Year = styled.span`
  font-size: 25px;
  margin: none;
`;
//import icons for watchlistribbon?

const TitleOverview = ({movie, handleRatingInput}) => {
  return (
    <TitleBlock>
      <div className="headerAndSubtext">
        <WatchlistRibbon></WatchlistRibbon>
        <div className="header">
          <Title>{movie.title}</Title> <Year>({movie.releaseDate.split(' ')[2]})</Year>
        </div>
        <div className="subtext">
          <span>{movie.mpaaRating} | {movie.runtime} | {movie.genres} | {movie.releaseDate} </span>
        </div>
      </div>
      <Ratings average={movie.imdbRatingsAverage} amount={movie.imdbRatings} handleRatingInput={handleRatingInput}/>
    </TitleBlock>

  );
}

export default TitleOverview;