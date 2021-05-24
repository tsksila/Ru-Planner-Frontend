import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


import Layout from "./components/Layout"
import PrivateRoute from './components/PrivateRoute'


import Login from "./pages/Login"
import Register from "./pages/Register"
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import Shedule from './pages/Shedule'
import Community from './pages/Community'


function App() {
  const withLayout = (Component) => (props) =>
    (
      <Layout>
        <Component {...props} />
      </Layout>
    );

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/profile" component={withLayout(Profile)} />
        <PrivateRoute exact path="/community" component={withLayout(Community)} />
        <PrivateRoute exact path="/shedule" component={withLayout(Shedule)} />

        
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={Logout} />


        <PrivateRoute exact path="/" component={withLayout(Profile)} />
      </Switch>
    </Router>
  );
}

export default App;
