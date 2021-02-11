import React, { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import axios from "axios"
import {useHistory} from "react-router-dom"
import { Form, Button } from 'react-bootstrap'

const ChangePassword = ()=>{
  let history = useHistory()
  const [user] = useContext(UserContext)
  const [input, setInput] = useState({current_password: "", new_password: "", new_confirm_password: ""})
  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post(`https://backendexample.sanbersy.com/api/change-password`, {current_password: input.current_password, new_password: input.new_password, new_confirm_password: input.new_confirm_password}, {headers: {"Authorization" : `Bearer ${user.token}`}})
    .then(res => {
        alert("success")
        setInput({current_password: "", new_password: "", new_confirm_password: ""})
        history.push("/")
      }).catch((err)=>{
        alert("salah input")
        setInput({current_password: "", new_password: "", new_confirm_password: ""})
    })

  }
  
  const handleChange = (event)=>{
    let typeOfInput = event.target.name
    let value = event.target.value
    
    if (typeOfInput === "current_password"){
      setInput({...input, current_password: value})
    }else if (typeOfInput === "new_password"){
      setInput({...input, new_password: value})
    }else if (typeOfInput === "new_confirm_password"){
      setInput({...input, new_confirm_password: value})
    }

  }

  return(
    <>
    <h1>Change Password</h1>
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formCurrentPassword">
          <Form.Label> Password lama: </Form.Label>
          <Form.Control  required="true" type="password" name="current_password" value={input.current_password} onChange={handleChange} placeholder="Enter Old Password" />
    </Form.Group>
    <Form.Group controlId="formNewPassword">
          <Form.Label>Password lama: </Form.Label>
          <Form.Control  required="true" type="password" name="new_password" value={input.new_password} onChange={handleChange}  placeholder="Enter New Password" />
    </Form.Group>
    <Form.Group controlId="formComfrimPassword">
          <Form.Label>konfirmasi password baru: </Form.Label>
          <Form.Control  required="true" type="password" name="new_confirm_password" value={input.new_confirm_password}  onChange={handleChange} placeholder="Enter New Password" />
    </Form.Group>
      
    <Button variant="dark" type="submit">Update Passeord</Button>
    </Form>
  </>
  )
}

export default ChangePassword
