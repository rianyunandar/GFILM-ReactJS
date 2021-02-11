import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Game = ({ game }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/game/${game.id}`}>
        <Card.Img className='ImageCard' src={game.image_url} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/game/${game.id}`}>
          <Card.Title as='div'>
            <strong>{game.name}</strong>
          </Card.Title>
        </Link>

        
        <Card.Text as='h6'>release : {game.release}</Card.Text>
        <Card.Text as='h6'>platform : {game.platform}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Game