import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ItemData from './ItemData.jsx';
import $ from 'jquery';

//hardcoded movieID because don't have any user input/events and this module only renders details for one movie
var movieID = '5d5f2e5eebc81a1179bbbc1e';

const ItemDataContainer = styled.div`
  position: absolute;
  top: 75px;
  left: 100px;
  width: 75%;
  font-family: 'Helvetica Neue', 'Helvetica', sans-serif;
  font-size: 16px;
`;

class App extends React.Component {
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
    var url = '/movies/' + movieID;
    $.get(url, (movie) => {
        this.setState({movie: movie[0]});
      });
  }

  handleRatingInput (data) {
    //post the updated ratings data
    var url = '/movies/' + movieID;
    $.post(url, data).done((result) => {
      //then repeat the get request and rerender
      this.fetchMovieData();
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

export default App;