import React from 'react';
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
  }

  fetchMovieData () {
  //Get a random movie from the database to display. This is for demoing the
  //service as an independent unit. When connected to other services, the
  //movieID would hearken from user input/events and the first get request should be removed
  var url = '/movies/random_id';
  $.get(url, (movieID) => {
    url = '/movies/' + movieID;
    $.get(url, (movie) => {
      this.setState({movie: movie[0]});
      });
    });

  }

  handleRatingInput (data) {
    var movieID = this.state.movie._id;
    var url = '/movies/' + movieID;
    $.post(url, data).done((result) => {
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