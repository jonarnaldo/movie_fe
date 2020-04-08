import React, { useState, useEffect } from 'react';
import { GridList, GridListTile, GridListTileBar, Container } from '@material-ui/core';
import axios from 'axios';
import './App.css';
import SearchBar from './components/searchBar';
import { isEmpty } from 'lodash';

function App() {
  const [list, setList] = useState(undefined);
  const [detail, setDetail] = useState(undefined);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState('');

  const baseURL = process.env.REACT_APP_BACKEND_API;
  
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

  const getDetail = (id) => {
    axios
    .get(`${baseURL}movies/movie/${id}`)
    .then(function (response) {
      setIsLoaded(true);
      setDetail(response.data)
    })
    .catch(function (error) {
      setIsLoaded(true);
      setError(error)
    })
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const handleSubmit = (event) => {
    setDetail(null)
    event.preventDefault();
  }

  const handleClick = (e, id) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    getDetail(id);
  }

  return (
    <div className="App">
      <div className="App-header">
        <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} input={input} />
      </div>
      { 
        !isEmpty(detail) && 
        <Container>
          <div className="details">
            <div className='poster'>
              {detail.poster_path ?
                <img src={`http://image.tmdb.org/t/p/w342${detail.poster_path}`} alt={detail.title} /> :
                <div className='no-image-detail'>NO IMAGE</div>}
            </div>
            <div className='details-info'>
              <ul className='details-list'>
                <li>tagline: {detail.tagline}</li>
                <li>budget: &#36;{parseInt(`${detail.budget}`, 10).toLocaleString('en-US')}</li>
                <li>budget: &#36;{parseInt(`${detail.revenue}`, 10).toLocaleString('en-US')}</li>
                <li>genres: { detail.genres.map(genre => genre.name) }</li>
                <li>release date: {detail.release_date}</li>
                <li>run time: {detail.runtime}</li>
                <li>vote_average: {detail.vote_average}</li>
                <li>overview: {detail.overview}</li>
              </ul>
            </div>
          </div>
        </Container>
      }
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
