import React from "react";
import { BrowserRouter as Router,  Route,  } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from './components/Layout'


const AppRoute = ({component:Component ,layout:Layout ,...rest}) => (
  <Route exact {...rest} render={props=> (
    <Layout> <Component {...props}></Component> </Layout>
  )}></Route>
)

function App() {
  return (
    <Router>


        <AppRoute  path='/' layout={MainLayout} component={Login}/>
        <AppRoute  path='/reg' layout={MainLayout} component={Register}/>

        <Route exact path="/login"  component={Login} />
        <Route exact path="/register"  component={Register} />



    </Router>

  );
}

export default App