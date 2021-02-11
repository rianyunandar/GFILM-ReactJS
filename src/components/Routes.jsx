import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../screens/HomeScreen";


import Game from "../screens/GameScreen"
import GameDetail  from "../components/Game/GameDetail"
import GameManage  from "../components/Game/GameManage"
import GameNew  from "../components/Game/GameNew"
import GameEdit  from "../components/Game/GameEdit"

import Movie from "../screens/MovieScreen";
import MovieDetail  from "../components/Movie/MovieDetail"
import MovieManage  from "../components/Movie/MovieManage"
import MovieNew  from "../components/Movie/MovieNew"
import MovieEdit  from "../components/Movie/MovieEdit"

import SuccessSignUp from "../components/User/SuccessSignUp"
import UserRoute from './UserRoutes';
import Login from "../components/User/login";
import SignUP from "../components/User/SignUP";
import ChangePassword from "../components/User/ChangePassword";


const Routes = () => {
  
  return (
    <Switch>
      <Route exact path="/">
        <Home />
       </Route>
      <Route exact path="/Movie">
        <Movie />
      </Route>
      <Route exact path="/Game">
        <Game />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <SignUP />
      </Route>
      <Route exact path="/signup-success">
        <SuccessSignUp />
      </Route>
      <UserRoute path="/manage/movies">
                  <MovieManage />
      </UserRoute>
      <UserRoute path="/manage/games">
                  <GameManage />
      </UserRoute>
      <UserRoute path="/manage/user">
                  <ChangePassword />
      </UserRoute>
      <UserRoute path="/add/Movie">
                  <MovieNew />
      </UserRoute>
      <UserRoute path="/add/Game">
                  <GameNew />
      </UserRoute>
      <UserRoute path="/edit/Movie/:id" component={MovieEdit}/>
               
      <UserRoute path="/edit/Game/:id" component={GameEdit} />

      <Route path='/game/:id' component={GameDetail} />
      <Route path='/movie/:id' component={MovieDetail} />
      
    </Switch>
  );
};

export default Routes;