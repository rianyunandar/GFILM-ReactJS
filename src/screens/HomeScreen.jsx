import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Game from '../components/Game/Game'
import Movie from '../components/Movie/Movie'
import axios from 'axios'

const HomeScreen = () => {
  const [movies,setMovie]  = useState([])
  const [games, setGame]  = useState([])




  useEffect(() => {
    
  
      const fetchMovies =async () =>{
        
        const {data}= await axios.get('https://backendexample.sanbersy.com/api/data-movie');

        let sorted = data.sort(function(a,b){
                         
          return (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0);
        })

       

        const slicedata = sorted.slice(sorted.lenght-4,4)
        setMovie(slicedata);
    }

    const fetchGames =async () =>{
      const {data}= await axios.get('https://backendexample.sanbersy.com/api/data-game');

      let sorted = data.sort(function(a,b){
                         
        return (a.release < b.release) ? 1 : ((b.release < a.release) ? -1 : 0);
      })

    
      const slicedata = sorted.slice(sorted.lenght-4,4)
      setGame(slicedata);
  }

    fetchMovies();
    fetchGames();

}, [])
return (
    <>
      <h1>Latest Movie</h1>
      <Row>
        {
          
        movies.map((movie) => (
          
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Movie movie={movie} />
          </Col>
        ))
        
        }
      </Row>

      <h1>Latest Game</h1>
      <Row>
        {games.map((game) => (
          <Col key={game.id} sm={12} md={6} lg={4} xl={3}>
            <Game game={game} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen