import React from "react";
import {Route, Switch ,Redirect } from "react-router-dom"


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
 
      <Switch>
  
        <Route  path="/login" component={Login} exact  />
        <Route  path="/register" component={Register} />
        <Route  path="/logout" component={Logout} />


        <PrivateRoute  path="/profile" component={withLayout(Profile)}    />
        <PrivateRoute  path="/community" component={withLayout(Community)} />
        <PrivateRoute  path="/shedule" component={withLayout(Shedule)} />

        <PrivateRoute path="/">
           <Redirect to="/profile" /> 
        </PrivateRoute>

      </Switch>

  );
}

export default App;
