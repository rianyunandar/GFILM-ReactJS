import React, { useContext, useState } from "react"
import {UserContext} from "../../context/UserContext"
import {useHistory,Link} from "react-router-dom"
import { Form,Button } from 'react-bootstrap'
import axios from "axios"

const Login = () =>{
  let history = useHistory()
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({email: "" , password: ""})

  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post("https://backendexample.sanbersy.com/api/user-login", {
      email: input.email, 
      password: input.password
    }).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        history.push("/")
      }
    ).catch((err)=>{
      alert(JSON.stringify(err.response.data))
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "email":{
        setInput({...input, email: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>
    <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control  required="true" type="email" name="email" onChange={handleChange} value={input.email} placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control required="true"  type="password" name="password" onChange={handleChange} value={input.password} placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">Login</Button>
  <span>    </span>
  <Link to='/signup'>
  <Button variant="primary" >SignUp</Button>
  </Link>
</Form>

     
    </>
  )
}

export default Login
