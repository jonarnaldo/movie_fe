import React from 'react';
import './searchBar.css';

function SearchBar({ handleChange, handleSubmit, input}) {
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label>
        Search:
        <input className="search-input" type="text" value={input} onChange={handleChange} />
      </label>
    </form>
  );
}

export default SearchBar;