import React from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Spinner,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const isSearchButtonDisabled = (searchTerm) => {
  if (searchTerm.length < 3) return true;

  return false;
}

const isLoading = (loading) => {
  if (loading) {
    return (
      <Spinner
        color="light"
        type="grow"
        size="sm"
      />
    );
  }

  return(
    <FontAwesomeIcon
      icon={faSearch}
      color="white"
      size="1x"
    />
  );
}

/*
  Controlled inputs. The value of the input is controlled by the state.
  This means the component is not the one changing the state as its value
  changes, but the other way around, thus having the entire control of
  the input on the react side.
*/
const SearchInput = (props) => {
  const {
    handleSearchSubmit,
    handleInputChange,
    loading,
    searchTerm,
  } = props;

  return (
    <form onSubmit={handleSearchSubmit}>
      <InputGroup>
        <Input onChange={handleInputChange} value={searchTerm} />
        <InputGroupAddon addonType="append">
          <Button
            color="primary"
            type="submit"
            disabled={isSearchButtonDisabled(searchTerm)}
          >
          {isLoading(loading)}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}

export default SearchInput;
