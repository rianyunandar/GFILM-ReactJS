import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import MovieRating from './MovieRating'

const Movie = ({ movie }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/movie/${movie.id}`}>
        <Card.Img className='ImageCard' src={movie.image_url} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/movie/${movie.id}`}>
          <Card.Title as='div'>
            <strong>{movie.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <MovieRating
            value={movie.rating}
          />
        </Card.Text>

        <Card.Text as='h6'>Genre : {movie.genre}</Card.Text>
        <Card.Text as='h6'>Year : {movie.year}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Movie