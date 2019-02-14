import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {
  Card,
  CardImgOverlay,
  CardTitle,
} from 'reactstrap';

/*
  Functional components receive props as an argument

  High Order Components, can be used to add extra data to the props.
  In this case the withRouter HOC, give the component the ability to use
  the history prop, to manipulate the router.

  This is another way of redirecting in react. The history object, contains the
  browsing history of the current browser session. We can update to navigate to
  a new route, or go back to a previous one. In this case, when the user clicks
  on the card, is redirected to the details page.
*/
const MovieCard = (props) => {
  const handleCardClick = () => {
    const { movie, history } = props;
    history.push(`/movies/${movie.imdbID}`);
  }

  const { movie } = props;

  return (
    <CardContainer
      background={movie.Poster}
      inverse
    >
      <HoverOverlay onClick={handleCardClick}>
        <OverlayContainer>
          <MovieTitle>
            {movie.Title}
          </MovieTitle>
        </OverlayContainer>
      </HoverOverlay>
    </CardContainer>
  );
}

export default withRouter(MovieCard);

const HoverOverlay = styled.div`
  && {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    cursor: pointer;
  }
`;

const CardContainer = styled(Card)`
  background: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.3);
  border-radius: .5rem !important;
  height: 380px;
  margin-bottom: 30px;

  &:hover {
    transform: scale(1.06);
  }

  &:hover > ${HoverOverlay} {
    z-index: 10;
    opacity: 1;
  }
`;

const OverlayContainer = styled(CardImgOverlay)`
  background: rgba(0,0,0,0.5);
  border-radius: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieTitle = styled(CardTitle)`
  font-size: 28px;
  line-height: 34px;
  text-align: center;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.9);
  font-weight: 600;
`;
