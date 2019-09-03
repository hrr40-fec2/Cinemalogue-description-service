import React from 'react';
import styled from 'styled-components';
import {StarFull} from 'styled-icons/icomoon/StarFull';
import {StarEmpty} from 'styled-icons/icomoon/StarEmpty';
import {TimesCircle} from 'styled-icons/fa-solid/TimesCircle';

const EmptyStar = styled(StarEmpty)`
  color: grey;
  width: 28px;
  height: 28px;
  margin: auto 5px auto;
`;

const StarRadioButton = styled(EmptyStar)`
  width: 7%;
  height: 7%;
  margin: 1px;
`;

const FullStar = styled(StarFull)`
  color: yellow;
  width: 25px;
  height: 25px;
  margin: auto 5px auto;
`;


const SelectedStarRadioButton = styled(FullStar)`
  color: blue;
  margin: 0;
`;

const CancelFormButton = styled(TimesCircle)`
  border-right: 1px solid grey;
  padding-right: 5%;
  color: grey;
  width: 10%;
  height: 10%;
  margin: 0;
`;

const RatingInfo = styled.div`
  color: #4e4f4f;
  font-size: 15px;
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 5%;
`;

const RateThisButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 11px;
  height: 100%;
  color: white;
  border-left: 1px solid grey;
`;

const RatingAverage = styled.span`
  color: white;
  font-size: 23px;
`;

const RatingsAmount = styled.span`
  padding: none;
  margin: none;
  font-size: 80%;
  color: #a5a8a8;
`;

const RatingsContainer = styled.div`
  position: relative;
  width: 250px;
  height: 40px;
  display: flex;
  justify-content: flex-end;
`;

const RatingForm = styled.div`
  margin: 2px;
`;

const FormContainer = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  align-items: center;
  background-color: #524f49;
  padding: 4%;
  border-radius: 5px;
  border: 1px solid grey;
`;

class Ratings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayForm: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleRateThisClick = this.handleRateThisClick.bind(this);
    this.handleCancelFormClick = this.handleCancelFormClick.bind(this);
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

  handleCancelFormClick () {
    this.setState({displayForm: false});
  }

  renderRatingForm () {
    if (this.state.displayForm) {
      return (
        <FormContainer>
          <RatingForm>
            <CancelFormButton onClick={this.handleCancelFormClick}></CancelFormButton>
            {[1,2,3,4,5,6,7,8,9,10].map(value => {
              return (
              <label className="star">
                <input hidden type="radio" name="stars" value={value} onClick={(e) => {this.handleInput(e)}}></input>
                <StarRadioButton></StarRadioButton>
              </label>
              );
            })}
          </RatingForm>
        </FormContainer>
      );
    } else {
      return (
        <RatingInfo>
          <FullStar />
          <div><RatingAverage>{this.props.average}</RatingAverage>/10</div>
          <RatingsAmount href="/">{this.props.amount}</RatingsAmount>
        </RatingInfo>
      );
    }
  }

  render () {
    return (
      <RatingsContainer>
        {this.renderRatingForm()}
        <RateThisButton onClick={this.handleRateThisClick} ><EmptyStar /><span>Rate<br/>This</span></RateThisButton>
      </RatingsContainer>
      );

  }

}

export default Ratings;