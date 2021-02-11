import React, { useState, useEffect } from 'react'
import { Row, Col,Button } from 'react-bootstrap'
import Movie from '../components/Movie/Movie'
import axios from 'axios'

const HomeScreen = () => {
  const [movies,setMovie]  = useState([])
  const [search, setSearch] = useState("")


  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  const submitSearch = async (e) => {
    e.preventDefault();
    await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
    .then(res => {
        let resMovies = res.data.map(el=>{ return {
            id: el.id,
            created_at: el.created_at,
            updated_at: el.updated_at,
            title: el.title,
            description: el.description,
            year: el.year,
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
            image_url: el.image_url
          }
        })

        let filteredMovies = resMovies.filter(o => o.title.toLowerCase().includes(search.toLowerCase())
        || o.year.toString().toLowerCase().includes(search.toLowerCase())
        || o.genre.toLowerCase().includes(search.toLowerCase())
        || o.rating.toString().toLowerCase().includes(search.toLowerCase()))


        setMovie([...filteredMovies])
      }).catch((err)=>{
        alert(JSON.stringify(err.response.data))
      })
  
}
  useEffect(() => {

      const fetchMovies =async () =>{
        const {data}= await axios.get('https://backendexample.sanbersy.com/api/data-movie');
        setMovie(data);
    }

    fetchMovies();

}, [])
return (
    <>
      <h1>All Movie</h1>
      <Row>
        <Col xs={12}>
        <form onSubmit={submitSearch}>
          <input type="text" value={search}  placeholder="Tittle/Genre/Year/Rating" onChange={handleChangeSearch} style={{width:"90%"}}/>
         <span> </span>
          <Button variant="dark"  size="sm" >search</Button>
        </form>
        </Col>
        </Row>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Movie movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen