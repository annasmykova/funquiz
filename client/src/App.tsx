import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/privateRoute'
import { AccountContext } from './contexts/userContext'
import Feedback from './pages/feedback'
import Home from './pages/home'
import Login from './pages/login'
import Quiz from './pages/quiz'
import SignUp from './pages/register'
import './App.css'

function App() {
  const {
    state: { user, loading },
  } = useContext(AccountContext)

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <PrivateRoute isAvailable={!user} loading={loading} exact path="/signup">
        <SignUp />
      </PrivateRoute>
      <PrivateRoute isAvailable={!user} loading={loading} exact path="/login">
        <Login />
      </PrivateRoute>
      <PrivateRoute isAvailable={!!user} loading={loading} exact path="/quiz">
        <Quiz />
      </PrivateRoute>
      <PrivateRoute
        isAvailable={!!user}
        loading={loading}
        exact
        path="/feedback"
      >
        <Feedback />
      </PrivateRoute>
      <Route>
        <div>Not Found</div>
      </Route>
    </Switch>
  )
}

export default App
