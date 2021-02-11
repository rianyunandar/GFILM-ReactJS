import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header2'
import Footer from './components/Footer'
import Routes from './components/Routes'

import {UserProvider} from "./context/UserContext"
import {DataProvider} from "./context/DataContext"

const App = () => {
  return (
    <>
    <UserProvider>
   
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
        <DataProvider>
            <Routes />
          </DataProvider>
        </Container>
      </main>
      <Footer />
      </Router>
     
      </UserProvider>
    </>
  );
}

export default App;
