import React, { useContext, useState } from "react";
import { Table, Button, Row,Col} from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";

function GameTable() {
  const [user] = useContext(UserContext)
  const { games, setGames } = useContext(DataContext);
  const [search, setSearch] = useState("")
  const [sortType,setSortType] = useState(true)


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
      setGames([...filteredGames])
    }).catch((err)=>{
      alert(JSON.stringify(err.response.data))
    })
 
  }



  
  const handleDelete = async (e) => {
    let ID_GAMES = parseInt(e.target.value);
    let updatedData = games.filter((game) => game.id !== ID_GAMES);
    let x = window.confirm("Are you sure you want to delete?");
    if (x)
        {
    await axios
      .delete(`https://backendexample.sanbersy.com/api/data-game/${ID_GAMES}`,{headers: {"Authorization" : `Bearer ${user.token}`}})
      .then((res) => {
        console.log(res.data);
      }).catch((err)=>{
        alert(JSON.stringify(err.response.data))
      })

    setGames([...updatedData]);}
    else
    {return alert("Delete Canceled")};
  };




  const sortColumn = (field) => {
    setSortType(!sortType)

     const sorted = [...games].sort(function(a,b){
         switch (field) {
             case "name":
                 if (sortType) {
                     return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);
                 }else{
                     return (a.name.toUpperCase() < b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() < a.name.toUpperCase()) ? -1 : 0);
                 }
                 
             case "genre":
                 if (sortType) {
                     return (a.genre.toUpperCase() > b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() > a.genre.toUpperCase()) ? -1 : 0);
                 }else{
                     return (a.genre.toUpperCase() < b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() < a.genre.toUpperCase()) ? -1 : 0);
                 }
                                
             case "platform":
                 if (sortType) {
                     return (a.platform.toUpperCase() > b.platform.toUpperCase()) ? 1 : ((b.platform.toUpperCase() > a.platform.toUpperCase()) ? -1 : 0);
                 }else{
                     return (a.platform.toUpperCase() < b.platform.toUpperCase()) ? 1 : ((b.platform.toUpperCase() < a.platform.toUpperCase()) ? -1 : 0);
                 }
                 
             case "release":
                 if (sortType) {
                     return (a.release.toUpperCase() > b.release.toUpperCase()) ? 1 : ((b.release.toUpperCase() > a.release.toUpperCase()) ? -1 : 0);
                 }else{
                     return (a.release.toUpperCase() < b.release.toUpperCase()) ? 1 : ((b.release.toUpperCase() < a.release.toUpperCase()) ? -1 : 0);
                 }
                 case "singlePlayer":
                    if (sortType) {
                        return (a.singlePlayer > b.singlePlayer) ? 1 : ((b.singlePlayer > a.singlePlayer) ? -1 : 0);
                    }else{
                        return (a.singlePlayer < b.singlePlayer) ? 1 : ((b.singlePlayer < a.singlePlayer) ? -1 : 0);
                    }
                   
                case "multiplayer":
                    if (sortType) {
                        return (a.multiplayer > b.multiplayer) ? 1 : ((b.multiplayer > a.multiplayer) ? -1 : 0);
                    }else{
                        return (a.multiplayer < b.multiplayer) ? 1 : ((b.multiplayer < a.multiplayer) ? -1 : 0);
                    }
                 
         
             default:
                 break;
         }
     })

       setGames(sorted);
   }






  return (
    <>
        <Row>
        <Col xs={3}>
        <Link  to='/add/Game'>
        <Button variant="dark"  size="sm" >Add New Movie</Button></Link>
        </Col>
        <Col xs={9}>
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
      <Table
        striped
        bordered
        hover
        variant="dark"
        className="mt-3"
      >
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={()=>sortColumn("name")}>Titte Game <i class="fas fa-sort"></i></th>
            <th onClick={()=>sortColumn("genre")}>Genre <i class="fas fa-sort"></i></th>
            <th onClick={()=>sortColumn("release")}>Realease <i class="fas fa-sort"></i></th>
            <th onClick={()=>sortColumn("platform")}>Platform <i class="fas fa-sort"></i></th>
            <th onClick={()=>sortColumn("singlePlayer")}>SinglePlayer </th>
            <th onClick={()=>sortColumn("multiplayer")}>MultiPlayer  </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { (
            games !== null &&
            games.map((game) => {
              return (
                <tr key={game.id}>
                <td style={{height:"150px" ,width:"150px" }}><img alt={game.name} class="ImageCard" src={game.image_url}  ></img></td>
                  <td>{game.name}</td>
                  <td>{game.genre === null ? "-" : game.genre}</td>
                  <td>{game.release === null ? "-" : game.release}</td>
                  <td>{game.platform === null ? "-" : game.platform}</td>
                  
                  <td>
                    {game.singlePlayer === null && "-" }
                    {game.singlePlayer === 1 && "Yes" }
                    {game.singlePlayer === 0 && "No" }
                  </td>
                  <td>{game.multiplayer === null && "-" }
                    {game.multiplayer === 1 && "Yes" }
                    {game.multiplayer === 0 && "No" }
                    </td>
                  <td>
                  <Link to={`/edit/Game/${game.id}`}>
                    <Button
                      size="sm"
                      variant="info"
                      className="mr-2"
                      value={game.id}
                      // onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="danger"
                      className="del"
                      value={game.id}
                      onClick={handleDelete}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      </Row>
     
 </>
  );
}

export default GameTable;