import React from 'react';
import ReactDOM from 'react-dom';
import ItemData from './components/ItemData.jsx';

//hardcoded movieID because don't have any user input/events and this module only renders details for one movie
var movieID = '5d5f2e5eebc81a1179bbbc2a';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      movie: null;
    };
  }

  //would likely actually happen within click and/or search input event in which user selects a movie
  componentDidMount () {
    var url = '/movies/' + movieID;
    $.get(url, (movie) => {
      this.setState({movie: movie[0]});
    });
  }

  render () {
    return (
      <ItemData movie={this.state.movie} />
    );
  }
}


ReactDOM.render(<App />, document.getElementById('itemdata'));

