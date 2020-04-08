import React from 'react';
import './searchBar.css';

function SearchBar({ handleChange, handleSubmit, input}) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search:
        <input type="text" value={input} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default SearchBar;