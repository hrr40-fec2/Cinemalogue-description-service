import styled from 'styled-components';
import React from 'react';
import Ratings from './Ratings.jsx';
import {Bookmark} from 'styled-icons/icomoon/Bookmark';
import {Plus} from 'styled-icons/fa-solid/Plus';

const TitleBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #302d2d;
  color: grey;
  padding: 10px 10px 12px 10px;
`;

const WatchlistRibbon = styled(Bookmark)`
  width: 50px;
  &:hover {
    color: #4e4f4f;
  }
`;

const PlusSign = styled(Plus)`
  color: white;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.span`
  color: white;
  font-size: 170%;
  margin: none;
  `;

const Year = styled.span`
  font-size: 25px;
  margin: none;
  &:hover {
    color: #0e8bc4;
    text-decoration: underline;
  }
`;

const Subtext = styled.div`
  font-size: 75%;
`;

const TitleOverview = ({movie, handleRatingInput}) => {
  return (
    <TitleBlock>
      <Header>
        <WatchlistRibbon><PlusSign></PlusSign></WatchlistRibbon>
        <div className="movieinfo">
          <div className="titleAndYear">
            <Title>{movie.title}</Title> <Year>({movie.releaseDate.split(' ')[2]})</Year>
          </div>
          <Subtext>
            <span>{movie.mpaaRating} | {movie.runtime} | {movie.genres[0]}, {movie.genres[1]}, {movie.genres[2]} | {movie.releaseDate} </span>
          </Subtext>
        </div>
      </Header>
      <Ratings average={movie.imdbRatingsAverage} amount={movie.imdbRatings} handleRatingInput={handleRatingInput}/>
    </TitleBlock>

  );
};

export default TitleOverview;