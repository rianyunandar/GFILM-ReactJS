import React, { useState, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function CreateMovie() {
  const [user] = useContext(UserContext)
  const [input, setInput] = useState({
    title: "",
    description: "",
    year: 0,
    duration: 0,
    genre: "",
    review: "",
    rating: 0,
    image_url: "",
  });

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "title": {
        setInput({ ...input, title: event.target.value });
        break;
      }
      case "description": {
        setInput({ ...input, description: event.target.value });
        break;
      }
      case "year": {
        setInput({ ...input, year: event.target.value });
        break;
      }
      case "duration": {
        setInput({ ...input, duration: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "rating": {
        setInput({ ...input, rating: event.target.value });
        break;
      }
      case "review": {
        setInput({ ...input, review: event.target.value });
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
    let title = input.title;
    let description = input.description;
    let year = parseInt(input.year);
    let duration = parseInt(input.duration);
    let genre = input.genre;
    let review = input.review;
    let rating = parseInt(input.rating);
    let image_url = input.image_url;

    if (
      title.replace(/\s/g, "") !== "" &&
      description.replace(/\s/g, "") !== ""
    ) {
      await axios.post(`https://backendexample.sanbersy.com/api/data-movie`, {
        title: title,
        description: description,
        year: year,
        duration: duration,
        genre: genre,
        review: review,
        rating: rating,
        image_url: image_url,
      },{headers: {"Authorization" : `Bearer ${user.token}`}})
      .then((res) => {
        alert(JSON.stringify(res.data.title)+" saved");
      }).catch((err)=>{
        alert(JSON.stringify(err.response.data))
      })
    }

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
      <Container>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
        <h2 className="mt-5 border-top pt-5 mb-4">Add New Movie</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Input Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={input.title}
              required="true"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Input Year Movie</Form.Label>
            <Form.Control
              type="text"
              name="year"
              placeholder="Movie Year Realease"
              value={input.year}
              onChange={handleChange}
              required="true"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Input Durasi Movie</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              placeholder="Durasi Movie"
              value={input.duration}
              onChange={handleChange}
              required="true"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Input Genre Movie</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              placeholder="Genre Movie"
              value={input.genre}
              onChange={handleChange}
              required="true"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Input Rating Movie</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              min="0"
              max="10"
              placeholder="Rating Movie"
              value={input.rating}
              onChange={handleChange}
              required="true"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Input Deskripsi Movie</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="description"
              placeholder="Deskripsi Movie"
              value={input.description}
              onChange={handleChange}
              required="true"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Input Review Movie</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="review"
              placeholder="Review Movie"
              value={input.review}
              onChange={handleChange}
              required="true"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Input Url Poster</Form.Label>
            <Form.Control
              type="text"
              name="image_url"
              placeholder="URL Poster Movie"
              value={input.image_url}
              onChange={handleChange}
              required="true"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Data
          </Button>
        </Form>
      </Container>
     
    </>
  );
}

export default CreateMovie;