import React, { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { UserContext } from "../../context/UserContext";
import { Table, Button,  Row,Col} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

function MovieTable() {
  const [user] = useContext(UserContext)
  const { movies, setMovies } = useContext(DataContext);
  const [search, setSearch] = useState("")
  const [sortType,setSortType] = useState(true)


  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  const submitSearch = async (e) => {
    e.preventDefault();
    await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
    .then(res => {
        let resMovies = res.data.map(el=>{ return {
            id: el.id,
            created_at: el.created_at,
            updated_at: el.updated_at,
            title: el.title,
            description: el.description,
            year: el.year,
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
            image_url: el.image_url
          }
        })

        let filteredMovies = resMovies.filter(o => o.title.toLowerCase().includes(search.toLowerCase())
        || o.year.toString().toLowerCase().includes(search.toLowerCase())
        || o.genre.toLowerCase().includes(search.toLowerCase())
        || o.rating.toString().toLowerCase().includes(search.toLowerCase()))


        setMovies([...filteredMovies])
      }).catch((err)=>{
        alert(JSON.stringify(err.response.data))
      })
  
}

const sortColumn = (field) => {
  setSortType(!sortType)

   const sorted = [...movies].sort(function(a,b){
       switch (field) {
           case "title":
               if (sortType) {
                   return (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() > a.title.toUpperCase()) ? -1 : 0);
               }else{
                   return (a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() < a.title.toUpperCase()) ? -1 : 0);
               }
              
           case "description":
               if (sortType) {
                   return (a.description.toUpperCase() > b.description.toUpperCase()) ? 1 : ((b.description.toUpperCase() > a.description.toUpperCase()) ? -1 : 0);
               }else{
                   return (a.description.toUpperCase() < b.description.toUpperCase()) ? 1 : ((b.description.toUpperCase() < a.description.toUpperCase()) ? -1 : 0);
               }
           
           case "year":
               if (sortType) {
                   return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);
               }else{
                   return (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0);
               }
             
           case "duration":
               if (sortType) {
                   return (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0);
               }else{
                   return (a.duration < b.duration) ? 1 : ((b.duration < a.duration) ? -1 : 0);
               }
              
           case "genre":
               if (sortType) {
                   return (a.genre.toUpperCase() > b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() > a.genre.toUpperCase()) ? -1 : 0);
               }else{
                   return (a.genre.toUpperCase() < b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() < a.genre.toUpperCase()) ? -1 : 0);
               }
             
           case "rating":
               if (sortType) {
                   return (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0);
               }else{
                   return (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0);
               }
            
       
           default:
               break;
       }
   })

     setMovies(sorted);
 }


  const handleDelete = async (e) => {
    let ID_MOVIES = parseInt(e.target.value);
    let updatedData = movies.filter((movie) => movie.id !== ID_MOVIES);

    let x = window.confirm("Are you sure you want to delete?");
      if (x)
          {
            await axios
            .delete(`https://backendexample.sanbersy.com/api/data-movie/${ID_MOVIES}`,{headers: {"Authorization" : `Bearer ${user.token}`}})
            .then((res) => {
              console.log(res.data);
            }).catch((err)=>{
              alert(JSON.stringify(err.response.data))
            })
      
          setMovies([...updatedData]);
          }
      else
        {return alert("Delete Canceled")};
   
  };

  


  return (
    <>
    <Row>
        <Col xs={3}>
        <Link  to='/add/Movie'>
        <Button variant="dark"  size="sm" >Add New Movie</Button></Link>
        </Col>
        <Col xs={9}>
        <form onSubmit={submitSearch}>
          <input type="text" value={search}  placeholder="Tittle/Genre/Year/Rating" onChange={handleChangeSearch} style={{width:"90%"}}/>
         <span> </span>
          <Button variant="dark"  size="sm" >search</Button>
        </form>
        </Col>
        </Row>
    
    <Row>
      <Table
        striped
        bordered
        hover
        variant= "dark"
        className="mt-3"
      >
        <thead>
          <tr>
            <th>Poster</th>
            <th onClick={()=>sortColumn("title")}>Title <i class="fas fa-sort"></i></th>
            <th onClick={()=>sortColumn("year")}>Year <i class="fas fa-sort"></i></th>
            <th onClick={()=>sortColumn("duration")}>Duration <i class="fas fa-sort"></i></th>
            <th onClick={()=>sortColumn("genre")}>Genre <i class="fas fa-sort"></i></th>
            <th onClick={()=>sortColumn("rating")}>Rating <i class="fas fa-sort"></i></th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { (
            movies !== null &&
            movies.map((movie) => {
              return (
                  <tr key={movie.id}>
                  <td style={{height:"150px" ,width:"150px" }}><img  alt={movie.title} class="ImageCard"  src={movie.image_url}  ></img></td>
                  <td>{movie.title}</td>
                  <td>{movie.year === null ? "-" : movie.year}</td>
                  <td>{movie.duration === null ? "-" : movie.duration}</td>
                  <td>{movie.genre === null ? "-" : movie.genre}</td>
                  <td>{movie.rating === null ? "-" : movie.genre}</td>
                  <td>
                    <div style={{overflow:"hidden",height:"150px" }}>{movie.description}</div>
                    </td>
                  <td>
                  <Link to={`/edit/Movie/${movie.id}`}>
                    <Button
                      size="sm"
                      variant="info"
                      className="mr-2"
                      value={movie.id}
                      // onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="danger"
                      className="del"
                      value={movie.id}
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

export default MovieTable;