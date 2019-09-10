import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ItemData from './ItemData.jsx';
import $ from 'jquery';

const ItemDataContainer = styled.div`
  font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
  font-size: 16px;
`;

class ItemOverview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      movie: null
    };
    this.handleRatingInput = this.handleRatingInput.bind(this);
  }


  componentDidMount () {
    this.fetchMovieData();
    //Fetching the movie data would likely actually happen within click and/or search input event in which user selects a movie,
    //the movieID being passed in as an argument inside the parent handler that gets called after an event in a child component
  }

  fetchMovieData () {
  //we'll use a random movieID because we don't currently have any user input/events and this module only renders details for one movie
  //hence first make a request to get a random movieID from the database, then make the API call for the movie itself
  var url = '/movies/random_id';
  $.get(url, (movieID) => {
    url = '/movies/' + movieID;
    $.get(url, (movie) => {
      this.setState({movie: movie[0]});
      });
    });

  }

  handleRatingInput (data) {
    //post the updated ratings data
    var movieID = this.state.movie._id;
    var url = '/movies/' + movieID;
    $.post(url, data).done((result) => {
      //then repeat the get request and rerender
      $.get(url, (movie) => {
        this.setState({movie: movie[0]});
        });
    });
  }

  render () {
    return (
      <ItemDataContainer>
        <ItemData movie={this.state.movie} handleRatingInput={this.handleRatingInput}/>
      </ItemDataContainer>
    );
  }
}

export default ItemOverview;