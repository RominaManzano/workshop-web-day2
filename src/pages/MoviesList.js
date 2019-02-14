import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  Container,
  Col,
  Row,
} from 'reactstrap';

import MovieCard from '../components/MovieCard';
import SearchInput from '../components/SearchInput';

/*
  react life-cycle methods can only be accesed on class-based components.
  As a class in any other language, react classes, have their own methods.
  One of the most important and the one we use for getting the data is 'componentDidMount'.
  This method is called right after the component is loaded onto the browser, and is
  the perfect place to initialize the data.
  The other important life-cycle method is the 'render' method. It takes care of
  displaying our JSX content on the browser.
*/

class MoviesList extends Component {
  state = {
    movies: [],
    loading: true,
    loadingSpinner: false,
    message: '',
    searchTerm: '',
  };

  componentDidMount() {
    axios.get('https://wc-workshop-api.herokuapp.com/v1/movies')
      .then(res => {
        const movies = res.data.data;

        setTimeout(() => {
          this.setState({
            movies,
            loading: false
          });
        }, 1000);
      })
      .catch(error => {
        this.setState({
          message: 'An error ocurred',
          loading: false,
        });
      });
  }

  /* Data mapping */
  renderMovieCards = () => {
    const { movies } = this.state;

    if (movies.length <= 0) {
      return (
        <NoResults>
          No se encontraron resultados
        </NoResults>
      );
    }

    const movieCards = movies.map(movie => (
      <Col lg="3" md="3" sm="6" xs="12" key={movie.imdbID}>
        <MovieCard movie={movie} />
      </Col>
    ));

    return (
      <StyledRow>
        {movieCards}
      </StyledRow>
    );
  }

  handleSearchSubmit = (event) => {
    const { searchTerm } = this.state;

    event.preventDefault();
    this.setState({ loadingSpinner: true });

    axios.get('https://wc-workshop-api.herokuapp.com/v1/movies', {
      params: { 'search': searchTerm }
    })
      .then(res => {
        const movies = res.data.data;

        setTimeout(() => {
          this.setState({
            movies,
            loading: false,
            loadingSpinner: false,
          });
        }, 1000);
      })
      .catch(error => {
        this.setState({
          message: 'No se encontraron películas',
          loading: false,
          loadingSpinner: false,
        });
      });
  };

  handleInputChange = (event) => {
    this.setState({searchTerm: event.target.value});
  }

  render() {
    const { loading, message, searchTerm, loadingSpinner } = this.state;

    /* If we try to process data before we have it, the app will break down */
    if (loading) {
      return null;
    }

    if (message) {
      return <span>{message}</span>;
    }

    return (
      <Container>
        <StyledRow>
          <Col md={{ size: 6, offset: 3 }} xs={{ size: 10, offset: 1 }}>
            <SearchInput
              handleSearchSubmit={this.handleSearchSubmit}
              handleInputChange={this.handleInputChange}
              searchTerm={searchTerm}
              loading={loadingSpinner}
              />
          </Col>
        </StyledRow>
        {this.renderMovieCards()}
      </Container>
    );
  }
}

export default MoviesList;

const StyledRow = styled(Row)`
  margin-top: 30px;
`;

const NoResults = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  font-size: 40px;
`;
