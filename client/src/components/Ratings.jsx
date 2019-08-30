import React from 'react';
import RateThisButton from './RateThisButton.jsx';
import StarIcon from './StarIcon.jsx';

class Ratings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayForm: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleRateThisClick = this.handleRateThisClick.bind(this);
  }

  handleInput (e) {
    var {average, amount} = this.props;
    var newRating = Number(e.target.value);
    //calculate new values for average rating and amount of ratings
    var newAverage = ((average * amount + newRating) / (amount + 1)).toFixed(1);
    var newAmount = amount + 1;
    var data = {
      imdbRatings: newAmount,
      imdbRatingsAverage: Number(newAverage)
    }
    this.setState({displayForm: false});
    //call method from parent that posts the update, gets new data and rerenders
    this.props.handleRatingInput(data);
  }

  handleRateThisClick () {
    this.setState({displayForm: true});
  }

  renderRatingForm () {
    if (this.state.displayForm) {
      return (
        <div className="stars">
          <form>
            <input type="radio" name="stars" value="1" onClick={(e) => {this.handleInput(e)}}></input>
            <input type="radio" name="stars" value="2" onClick={(e) => {this.handleInput(e)}}></input>
            <input type="radio" name="stars" value="3" onClick={(e) => {this.handleInput(e)}}></input>
            <input type="radio" name="stars" value="4" onClick={(e) => {this.handleInput(e)}}></input>
            <input type="radio" name="stars" value="5" onClick={(e) => {this.handleInput(e)}}></input>
            <input type="radio" name="stars" value="6" onClick={(e) => {this.handleInput(e)}}></input>
            <input type="radio" name="stars" value="7" onClick={(e) => {this.handleInput(e)}}></input>
            <input type="radio" name="stars" value="8" onClick={(e) => {this.handleInput(e)}}></input>
            <input type="radio" name="stars" value="9" onClick={(e) => {this.handleInput(e)}}></input>
            <input type="radio" name="stars" value="10" onClick={(e) => {this.handleInput(e)}}></input>
          </form>
        </div>
      );
    } else {
      return (
        <div className="stars"></div>
      );
    }
  }

  render () {
    return (
      <div className="imdbRatings">
        {this.props.average} stars, {this.props.amount} ratings
        <RateThisButton onClick={this.handleRateThisClick} ><StarIcon />Rate This</RateThisButton>
        {this.renderRatingForm()}
      </div>
      );

  }

}

export default Ratings;