import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


import Layout from "./components/Layout"

import PrivateRoute from './components/PrivateRoute'


import Login from "./pages/Login"
import Register from "./pages/Register"
import Logout from './pages/Logout'


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
        <PrivateRoute exact path="/" component={withLayout(Login)} />
        <PrivateRoute exact path="/reg" component={withLayout(Register)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;
