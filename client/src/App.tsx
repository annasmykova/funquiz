import React, {useContext} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from "./components/privateRoute";
import {AccountContext} from "./contexts/userContext";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/register";
import './App.css';

function App() {
  const { state: { user } } = useContext((AccountContext))
  return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute isAvailable={!user} exact path="/signup">
          <SignUp />
        </PrivateRoute>
        <PrivateRoute isAvailable={!user} exact path="/login">
          <Login />
        </PrivateRoute>
        <PrivateRoute isAvailable={!!user} exact path="/quiz">
          <Login />
        </PrivateRoute>
        <Route>
          <div>Not Found</div>
        </Route>
      </Switch>
  );
}

export default App;
