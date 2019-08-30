import React from 'react';
import styled from 'styled-components';
import {StarFull} from 'styled-icons/icomoon/StarFull';
import {StarEmpty} from 'styled-icons/icomoon/StarEmpty';

const EmptyStar = styled(StarEmpty)`
  color: grey;
  width: 28px;
  height: 28px;
  margin: auto 5px auto;
`;

const FullStar = styled(StarFull)`
  color: yellow;
  width: 25px;
  height: 25px;
  margin: auto 5px auto;
`;

const RatingInfo = styled.div`
  color: #4e4f4f;
  font-size: 15px;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: none;
  margin: none;
`;

const RateThisButton = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 13px;
  width: 40%;
  height: 100%;
  color: white;
  background-color: transparent;
  border: none;
  border-left: 1px solid grey;
  padding: none;
`;

const RatingAverage = styled.span`
  color: white;
  font-size: 23px;
`;

const RatingsAmount = styled.span`
  padding: none;
  margin: none;
`;

const RatingsBox = styled.div`
  width: 180px;
  height: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;


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
      <RatingsBox>
        <RatingInfo>
          <FullStar />
          <div><RatingAverage>{this.props.average}</RatingAverage>/10</div>
          <RatingsAmount href="/">{this.props.amount}</RatingsAmount>
        </RatingInfo>
        <RateThisButton onClick={this.handleRateThisClick} ><EmptyStar /><span>Rate<br/>This</span></RateThisButton>
        {this.renderRatingForm()}
      </RatingsBox>
      );

  }

}

export default Ratings;