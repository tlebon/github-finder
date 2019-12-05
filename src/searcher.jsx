import React from "react";
import TextField from '@material-ui/core/TextField';

const SearchBar = ({ handleChange, term }) => {

  return (
    <div>
      <TextField
        onChange={(event) => handleChange(event)}
        placeholder="enter search term"
        value={term}
        variant="outlined">
      </TextField>
    </div>
  )
};
export default SearchBar;
