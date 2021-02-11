import React, { useState, useEffect,useContext } from 'react'
import { useHistory,Link} from 'react-router-dom'
import { Row, Col, Image, ListGroup , Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { UserContext } from "../../context/UserContext";

const GameEdit = ({ match }) => {
  let history = useHistory()
  const [user] = useContext(UserContext)
  const [game, setGame] = useState({})
  const [input, setInput] = useState({
    name: "",
    genre: "",
    release: 0,
    platform: "",
    singlePlayer: 0,
    multiplayer: 0,
    image_url: "",
  });
  useEffect(() => {
    const fetchMovie = async () => {
      
      const { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-game/${match.params.id}`)
      setGame(data)
      setInput({
        ...input,
        name: data.name,
        genre: data.genre,
        release: data.release,
        platform: data.platform,
        singlePlayer: data.singlePlayer,
        multiplayer: data.multiplayer,
        image_url: data.image_url,
      });
    }

    fetchMovie()
   
  }, [])


  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "name": {
        setInput({ ...input, name: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "release": {
        setInput({ ...input, release: event.target.value });
        break;
      }
      case "platform": {
        setInput({ ...input, platform: event.target.value });
        break;
      }
      case "singlePlayer": {
        setInput({ ...input, singlePlayer: event.target.value });
        break;
      }
      case "multiplayer": {
        setInput({ ...input, multiplayer: event.target.value });
        break;
      }
      case "image_url": {
        setInput({ ...input, image_url: event.target.value });
        break;
      }

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = input.name;
    let genre = input.genre;
    let release = parseInt(input.release);
    let platform = input.platform;
    let singlePlayer = parseInt(input.singlePlayer);
    let multiplayer = parseInt(input.multiplayer);
    let image_url = input.image_url;

    if (name.replace(/\s/g, "") !== "" && genre.replace(/\s/g, "") !== "") {
     
      await axios
      .put(`https://backendexample.sanbersy.com/api/data-game/${match.params.id}`, {
        name: name,
        genre: genre,
        release: release,
        platform: platform,
        singlePlayer: singlePlayer,
        multiplayer: multiplayer,
        image_url:image_url
        
      },{headers: {"Authorization" : `Bearer ${user.token}`}})
          .then((res) => {
            // alert("Success Updated")
            // history.push(`/game/${game.id}`)
            alert("Success Updated")
            window.location.reload();
        }).catch((err)=>{
          alert(JSON.stringify(err.response.data))
        })
      
    }else{ alert("tidak ada data yang berubah ")}
   
    setInput({
        title: "",
        description: "",
        year: 0,
        duration: 0,
        genre: "",
        review: "",
        rating: 0,
        image_url: "",
      });
  };



  return (
    <>
      <Link className='btn btn-light my-3' to='/manage/movies'>
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


       <h2 className="mt-5 border-top pt-5 mb-4">Edit Data</h2>
       <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Input Nama Game</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title Game"
            name="name"
            onChange={handleChange}
            value={input.name}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Input Genre Game</Form.Label>
          <Form.Control
            type="text"
            placeholder="Genre Game"
            name="genre"
            onChange={handleChange}
            value={input.genre}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Input Game Year Realease</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tahun Rilis Game"
            name="release"
            onChange={handleChange}
            value={input.release}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Platform</Form.Label>
          <Form.Control
            type="text"
            placeholder="Platform Game"
            name="platform"
            onChange={handleChange}
            value={input.platform}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Single Player</Form.Label>
          <Form.Control
            type="number"
            placeholder="Single Player"
            name="singlePlayer"
            onChange={handleChange}
            value={input.singlePlayer}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Multi Player</Form.Label>
          <Form.Control
            type="number"
            placeholder="Multi Player"
            name="multiplayer"
            onChange={handleChange}
            value={input.multiplayer}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>image_url</Form.Label>
          <Form.Control
            type="text"
            placeholder="image_url"
            name="image_url"
            onChange={handleChange}
            value={input.image_url}
            required="true"
          />
        </Form.Group>


        <Button variant="dark" type="submit">
         Update Data
        </Button>
      </Form>

    </>
  )
}

export default GameEdit