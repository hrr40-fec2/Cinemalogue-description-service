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
  width: 8%;
  margin: 0;
  `;

const FullStar = styled(StarFull)`
  color: yellow;
  width: 25px;
  height: 25px;
  margin: auto 5px auto;
`;

const SelectedFullStar = styled(FullStar)`
  color: #0e8bc4;
`;

const SelectedStarRadioButton = styled(FullStar)`
  color: #0e8bc4;
  width: 8%;
  margin: 0;
`;

const CancelFormButton = styled(TimesCircle)`
  border-right: 1px solid grey;
  color: grey;
  width: 10%;
  padding: 0 3%;
  &:hover {
    color: red;
  }
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
  &:hover {
    background-color: #0e8bc4;
  }
`;

const LargeRating = styled.span`
  color: white;
  font-size: 23px;
`;

const RatingSubtext = styled.span`
  padding: none;
  margin: none;
  font-size: 80%;
  color: #a5a8a8;
  &: hover {
    text-decoration: underline;
    color: #0e8bc4;
  }
`;

const RatingsContainer = styled.div`
  position: relative;
  width: 275px;
  height: 40px;
  display: flex;
  justify-content: flex-end;
`;

const RatingForm = styled.div`

`;

const FormContainer = styled.div`
  position: absolute;
  right: 62px;
  width: 230px;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #524f49;
  padding: none;
  border-radius: 5px;
  border: 1px solid grey;
  margin: 2px;
`;

class Ratings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayForm: false,
      cancelFormButtonHover: false,
      ratingFormHover: false
    };
    this.handleInput = this.handleInput.bind(this);
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
    this.setState({displayForm: false, ratingFormHover: false});
    //call method from parent that posts the update, gets new data and rerenders
    this.props.handleRatingInput(data);
  }

  renderRatingForm () {

    var getStarIcon = (value) => {
      if (value <= this.state.ratingFormHover) {
        return <SelectedStarRadioButton
          onMouseEnter={() => {this.setState({ratingFormHover: value})}}
          onMouseLeave={() => {this.setState({ratingFormHover: false})}}>
        </SelectedStarRadioButton>
      } else {
        return <StarRadioButton
          onMouseEnter={() => {this.setState({ratingFormHover: value})}}
          onMouseLeave={() => {this.setState({ratingFormHover: false})}}>
        </StarRadioButton>
      }
    };

    if (this.state.displayForm) {
      return (
        <FormContainer>
          <RatingForm>
            <CancelFormButton
              onClick={() => {this.setState({displayForm: false})}}
              onMouseEnter={() => {this.setState({ cancelFormButtonHover: true })}}
              onMouseLeave={() => { this.setState( {cancelFormButtonHover: false} )}}>
            </CancelFormButton>
            {[1,2,3,4,5,6,7,8,9,10].map(value => {
              return (
              <label className="star">
                <input hidden type="radio" name="stars" value={value} onClick={(e) => {this.handleInput(e)}}></input>
                {getStarIcon(value)}
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
          <div><LargeRating>{this.props.average}</LargeRating>/10</div>
          <RatingSubtext href="/">{this.props.amount}</RatingSubtext>
        </RatingInfo>
      );
    }
  }

  getRateThisButton () {
    if (this.state.ratingFormHover) {
      return (
        <RateThisButton>
          <LargeRating>{this.state.ratingFormHover}</LargeRating>
          <div>
            <SelectedFullStar/>
            <RatingSubtext>You</RatingSubtext>
          </div>
        </RateThisButton>
      );
    } else {
      return <RateThisButton onClick={() => {this.setState({displayForm: true})
    }}><EmptyStar /><span>Rate<br/>This</span></RateThisButton>
    }
  }

  render () {
    return (
      <RatingsContainer>
        {this.renderRatingForm()}
        {this.getRateThisButton()}
      </RatingsContainer>
      );

  }

}

export default Ratings;