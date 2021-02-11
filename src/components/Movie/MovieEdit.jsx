import React, { useState, useEffect,useContext } from 'react'
import { useHistory,Link} from 'react-router-dom'
import { Row, Col, Image, ListGroup , Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { UserContext } from "../../context/UserContext";

const MovieEdit = ({ match }) => {
  let history = useHistory()

  const [user] = useContext(UserContext)
  const [movie, setMovie] = useState({})
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

  useEffect(() => {
    const fetchMovie = async () => {
      
      const { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-movie/${match.params.id}`)
      setMovie(data)
      setInput({
        ...input,
        title: data.title,
        description: data.description,
        year: data.year,
        duration: data.duration,
        genre: data.genre,
        review: data.review,
        rating: data.rating,
        image_url: data.image_url,
      });
    }

    fetchMovie()
   
  }, [])


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let title = input.title;
    let description = input.description;
    let year = parseInt(input.year);
    let duration = parseInt(input.duration);
    let genre = input.genre;
    let review = input.review;
    let rating = parseInt(input.rating);
    let image_url = input.image_url;

    if (title.replace(/\s/g, "") !== "" && genre.replace(/\s/g, "") !== "") {
     
       await axios
          .put(`https://backendexample.sanbersy.com/api/data-movie/${match.params.id}`, {
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
           
            alert("Success Updated")
            window.location.reload();
            // history.push(`/movie/${movie.id}`)
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
      <Link className='btn btn-light my-3' to='/manage/movies'>
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

       <h2 className="mt-5 border-top pt-5 mb-4">Edit Data</h2>
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
          <Form.Label>Input Tahun Film</Form.Label>
          <Form.Control
            type="text"
            name="year"
            placeholder="Realease Yaer"
            value={input.year}
            onChange={handleChange}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Input Durasi Film</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            placeholder="Durasition Film"
            value={input.duration}
            onChange={handleChange}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Input Genre Film</Form.Label>
          <Form.Control
            type="text"
            name="genre"
            placeholder="Genre Film"
            value={input.genre}
            onChange={handleChange}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Input Rating Film</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            min="0"
            max="10"
            placeholder="Rating Film"
            value={input.rating}
            onChange={handleChange}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Input Deskripsi Film</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="description"
            placeholder="Description Film"
            value={input.description}
            onChange={handleChange}
            required="true"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Input Review Film</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="review"
            placeholder="Review Film"
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
            placeholder="URL Poster Film"
            value={input.image_url}
            onChange={handleChange}
            required="true"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Data
        </Button>
      </Form>

    </>
  )
}

export default MovieEdit