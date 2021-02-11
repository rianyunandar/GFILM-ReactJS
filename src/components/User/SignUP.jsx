import React, { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import axios from "axios"
import {useHistory,Link} from "react-router-dom"
import { Form, Button } from 'react-bootstrap'


const Register = () => {
  let history = useHistory()
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({ name: "", email: "", password: "", confirmPassword: "" })

  const handleSubmit = (event) => {
    event.preventDefault()
    input.password !== input.confirmPassword ?
      alert("Passwords don't match") :
      axios.post("https://backendexample.sanbersy.com/api/register", {
        name: input.name,
        email: input.email,
        password: input.password
      }).then(
        (res) => {
          var user = res.data.user
          var token = res.data.token
          var currentUser = { name: user.name, email: user.email, token }
          setUser(currentUser)
          localStorage.setItem("user", JSON.stringify(currentUser))
          alert("Success Registered")
          history.push("/signup-success")
          
        }
      ).catch((err) => {
        alert(JSON.stringify(err.response.data))
      })
  }

  const handleChange = (event) => {
    let value = event.target.value
    let name = event.target.name
    switch (name) {
      case "name": {
        setInput({ ...input, name: value })
        break;
      }
      case "email": {
        setInput({ ...input, email: value })
        break;
      }
      case "password": {
        setInput({ ...input, password: value })
        break;
      }
      case "confirmPassword": {
        setInput({ ...input, confirmPassword: value })
        break;
      }
      default: { break; }
    }
  }

  return (
    <>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control  required="true" type="text" name="name" onChange={handleChange} value={input.name} placeholder="Enter name" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control  required="true" type="email" name="email" onChange={handleChange} value={input.email} placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control  required="true" type="password" name="password" onChange={handleChange} value={input.password} placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control  required="true" type="password" name="confirmPassword" onChange={handleChange} value={input.confirmPassword} placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">SignUp</Button>
        <span>    </span>
        <Link to='/login'>
          <span>Already Have Account?</span>
        </Link>
      </Form>
    </>
  )
}

export default Register
