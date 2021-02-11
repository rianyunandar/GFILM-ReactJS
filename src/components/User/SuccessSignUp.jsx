import React, { useState } from "react"
import { Alert, Button } from 'react-bootstrap'
import {  Link } from "react-router-dom"

const SuccessSignUp = ({ name, email}) => {
    const [show, setShow] = useState(true);
    return (
        <>
            <Alert show={show} variant="success">
        <Alert.Heading>Success Sign UP</Alert.Heading>
        <p>
        Hello
          {/* Hello , <em> {{ name }}</em> */}
          {/* Your Email  <em> {{ email }}</em> success registered
           */}
          Your Account success registered
          Please Check Your Inbox email and verify to get full access
          please <Link to="/login">Login</Link> 
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
        </>
    )
}

export default SuccessSignUp
