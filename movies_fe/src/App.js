import React, { useState, useEffect } from 'react';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import axios from 'axios';
import './App.css';

function App() {
  const [list, setList] = useState(undefined);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const baseURL = process.env.REACT_APP_BACKEND_API;
  console.log('baseURL', baseURL)
  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = () => {
    axios
      .get(`${baseURL}movies/popular`)
      .then(function (response) {
        setIsLoaded(true);
        setList(response.data.results)
      })
      .catch(function (error) {
        setIsLoaded(true);
        setError(error)
      })
  }

  const handleClick = (e, id) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className="App">
      {
        list &&
        <GridList cellHeight={500} cols={5} spacing={0}>
          {list.map((movie) => (
            <GridListTile key={movie.id} cols={1} onClick={(e) => { handleClick(e,movie.id) }}>
              {movie.poster_path ?
                <img src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} /> :
                <div className="no-image">NO IMAGE</div>}
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>
      }
    </div>
  );
}

export default App;
