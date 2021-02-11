import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import axios from 'axios'

const ProductScreen = ({ match }) => {
  const [movie, setMovie] = useState({})
  useEffect(() => {
    const fetchMovie = async () => {
      
      const { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-movie/${match.params.id}`)
      setMovie(data)
    }

    fetchMovie()
  }, [])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image className="ImageDetail" src={movie.image_url} alt={movie.title} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{movie.title}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
            <h4>{movie.year}</h4>
            </ListGroup.Item>
            <ListGroup.Item>Genre: {movie.genre}</ListGroup.Item>
            <ListGroup.Item>Rating: {movie.rating}</ListGroup.Item>
            <ListGroup.Item>Duration: {movie.duration}</ListGroup.Item>
          </ListGroup>
        </Col>
       </Row>
       <Row>
       <Col md={12}>
       <ListGroup.Item>
              <h3>Description</h3>
              {movie.description}
            </ListGroup.Item>
            <ListGroup.Item>
            <h3>Review</h3>
              {movie.review}
            </ListGroup.Item>
         </Col>
       </Row>
    </>
  )
}

export default ProductScreen