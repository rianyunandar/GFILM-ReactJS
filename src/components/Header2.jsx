import React, { useState, useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom';
import { Row, Col, Navbar, Nav, Container } from 'react-bootstrap'
import { UserContext } from "../context/UserContext"

const Header = () => {
    const history = useHistory()
    const [user, setUser] = useContext(UserContext)

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem("user")
        history.push("/login")
    }


    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const hideSidebar = () => setSidebar(false);
    return (
        <>
            <Row className="sticky-nav">
                <Col md={12}>
                    <header >
                        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect >
                            <Container>
                                {user &&
                                        <Nav.Link onClick={showSidebar}>
                                            <span class="navbar-toggler-icon"></span>
                                        </Nav.Link>}

                                <Navbar.Brand >
                                    <LinkContainer to='/'>
                                        <img alt="" src="/logo.png" width="45" height="30" className="d-inline-block align-top" />
                                    </LinkContainer>
                                </Navbar.Brand>

                                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                                <Navbar.Collapse id='basic-navbar-nav'>
                                    <Nav className='ml-auto centerText'>
                                        <LinkContainer to='/movie'>
                                            <Nav.Link>
                                                <i className='fas fa-film'></i> Movie
                                    </Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to='/game'>
                                            <Nav.Link>
                                                <i className='fas fa-gamepad'></i> Game
                                      </Nav.Link>
                                        </LinkContainer>
                                        {user === null &&
                                            <LinkContainer to='/login'>
                                                <Nav.Link>
                                                    <i className='fas fa-user'></i> Sign In
                                     </Nav.Link>
                                            </LinkContainer>}
                                        {user &&
                                            <Nav.Link onClick={function(event){handleLogout();hideSidebar()}}>
                                                <i className='fas fa-user'></i> Log Out
                                       </Nav.Link>}

                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </header>
                </Col>
            </Row>

            <Row>
                <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
                    
                    <ul className='nav-menu-items' >
                    <li>
                           <div className="centerText profil"><i class="fas fa-user fa-3x"></i></div> 
                           {user && <h6 className="profil centerText"> {(user.name).slice(0,10)}</h6>}
                            </li>
                            <li>
                            <LinkContainer to='/manage/user'>
                            <Nav.Link>
                                    <i className='fas fa-user'></i> Change Password
                            </Nav.Link>
                            </LinkContainer>
                        </li>
                        
                        <li>
                            <LinkContainer to='/manage/movies'>
                            <Nav.Link>
                                    <i className='fas fa-film'></i> Manage Movie
                            </Nav.Link>
                            </LinkContainer>
                        </li>

                        <li>
                            <LinkContainer to='/manage/games'>
                                <Nav.Link>
                                    <i className='fas fa-gamepad'></i> Manage Game
                            </Nav.Link>
                            </LinkContainer>
                        </li>


                    </ul>
                </nav>
            </Row>


        </>
    )
}

export default Header