import React, { useState, useEffect } from 'react'
import { Row, Col,Button } from 'react-bootstrap'
import Game from '../components/Game/Game'
import axios from 'axios'

const HomeScreen = () => {
  const [games, setGame]  = useState([])
  const [search, setSearch] = useState("")

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

const submitSearch = async (e) =>{
    e.preventDefault()
    await axios.get(`https://backendexample.sanbersy.com/api/data-game`)
    .then(res => {
      let resGames = res.data.map(el=>{ return {
                        id : el.id,
                        created_at : el.created_at,
                        updated_at : el.updated_at,
                        name : el.name,
                        genre : el.genre,
                        singlePlayer : el.singlePlayer,
                        multiplayer : el.multiplayer,
                        platform : el.platform,
                        release : el.release,
                        image_url : el.image_url
        }
      })

      let filteredGames  = resGames.filter(o => o.name.toLowerCase().includes(search.toLowerCase())
                                    || o.release.toString().toLowerCase().includes(search.toLowerCase())
                                    || o.genre.toLowerCase().includes(search.toLowerCase())
                                    || o.platform.toString().toLowerCase().includes(search.toLowerCase()))
      setGame([...filteredGames])
    }).catch((err)=>{
      alert(JSON.stringify(err.response.data))
    })
 
  }

  useEffect(() => {
    
    const fetchGames =async () =>{
      const {data}= await axios.get('https://backendexample.sanbersy.com/api/data-game');

      setGame(data);
  }

    fetchGames();

}, [])
return (
    <>
      <h1>All Game</h1>
      <Row>
        <Col xs={12}>
        <div >
        <form onSubmit={submitSearch}>
          <input type="text" value={search}  placeholder="Tittle/Genre/Plafrom" 
          onChange={handleChangeSearch} style={{width:"90%"}}/>
          <span> </span>
          <Button variant="dark"  size="sm" >search</Button>
        </form>
        </div>
        </Col>
        </Row>
      <Row>
        {games.map((game) => (
          <Col key={game.id} sm={12} md={6} lg={4} xl={3}>
            <Game game={game} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen