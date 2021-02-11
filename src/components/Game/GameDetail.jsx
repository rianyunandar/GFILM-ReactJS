import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import axios from 'axios'

const ProductScreen = ({ match }) => {
  const [game, setGame] = useState({})
  console.log(match)
  useEffect(() => {
    const fetchGame = async () => {
      
      const { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-game/${match.params.id}`)
      setGame(data)
      console.log(data)
    }

    fetchGame()
  }, [])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image className="ImageDetail" src={game.image_url} alt={game.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{game.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
            <h4>{game.release}</h4>
            </ListGroup.Item>
            <ListGroup.Item>Genre: {game.genre}</ListGroup.Item>
            <ListGroup.Item>Single Player: {game.singlePlayer === 1 ? `yes` : `no`}</ListGroup.Item>
            <ListGroup.Item>Multi Player: {game.multiplayer === 1 ? `yes` : `no`}</ListGroup.Item>
            <ListGroup.Item>Platform: {game.platform}</ListGroup.Item>
          </ListGroup>
        </Col>
       
      </Row>

      
    </>
  )
}

export default ProductScreen