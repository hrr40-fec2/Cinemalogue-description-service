import React from 'react';
import styled from 'styled-components';

const Poster = styled.img`
  width: 25%;
  height: 95%;
`;

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 280px;
  border-bottom: 1px solid grey;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  color: grey;
  width: 70%;
  height: 95%;
  padding-left: 15px;
`;

const DescriptionBlock = ({movie}) => {
  return (
    <Block>
        <Poster src={movie.imageUrl}></Poster>
        <Details>
          <p>{movie.blurb}</p>
          <span>Director: <a href="/">{movie.director}</a></span>
          <span>Writer: <a href="/">{movie.writer}</a></span>
          <span>Stars: <a href="/">{movie.stars[0]}</a>, <a href="/">{movie.stars[1]}</a>, <a href="/">{movie.stars[2]}</a></span>
        </Details>
    </Block>
  );
}

export default DescriptionBlock;