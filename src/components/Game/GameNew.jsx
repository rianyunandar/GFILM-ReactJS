import React, { useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function CreateGame() {
  const [user] = useContext(UserContext)
  const [input, setInput] = useState({
    name: "",
    genre: "",
    release: 0,
    platform: "",
    singlePlayer: 0,
    multiplayer: 0,
    image_url: "",
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    let name = input.name;
    let genre = input.genre;
    let release = parseInt(input.release);
    let platform = input.platform;
    let singlePlayer = parseInt(input.singlePlayer);
    let multiplayer = parseInt(input.multiplayer);
    let image_url = input.image_url;

    if (name.replace(/\s/g, "") !== "" && genre.replace(/\s/g, "") !== "") {
       await axios
        .post(`https://backendexample.sanbersy.com/api/data-game`, {
          name: name,
          genre: genre,
          release: release,
          platform: platform,
          singlePlayer: singlePlayer,
          multiplayer: multiplayer,
          image_url:image_url
        },{headers: {"Authorization" : `Bearer ${user.token}`}})
      .then((res) => {
        alert(JSON.stringify(res.data.name)+" saved");
      }).catch((err)=>{
        alert(JSON.stringify(err.response.data))
      })
    }

    setInput({
        name: "",
        genre: "",
        release: 0,
        platform: "",
        singlePlayer: 0,
        multiplayer: 0,
        image_url:""
      });
  };
  return (
    <>
      <Container>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
        <h2 className="mt-5 border-top pt-5 mb-4">Add New Game</h2>
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
          Submit Data
        </Button>
      </Form>
      </Container>
     
    </>
  );
}

export default CreateGame