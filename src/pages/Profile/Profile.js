import React from "react";
import {
  Switch,
  Route,
  Link,
  Redirect , useLocation } from 'react-router-dom'
import MunuButton from "../../components/MunuButton";


import CreatePlan from './CreatePlan'
import MyList from './MyList'



function Profile() {
  const {pathname} = useLocation()

  return (
    <div className="min-h-screen   bg-blue-100 flex flex-col   ">
   
      <div className="min-w-full p-2  mb-5">
        <Link to={`/profile/my-list`}  >
          <MunuButton
            active={pathname === "/profile/my-list" ? true : false}
            name={"รายการของฉัน"}
          />
        </Link>
        <Link to={`/profile/create-plan`} >
          <MunuButton
            active={pathname === "/profile/create-plan" ? true : false}
            name={"สร้างแผนการเรียน"}
          />
        </Link>
      </div>


      <Switch>
          <Route path="/profile/my-list"  component={MyList} />
          <Route path="/profile/create-plan" component={CreatePlan}/>
          <Route path="/profile">
              <Redirect to="/profile/my-list" />
          </Route>
      </Switch>
     

    </div>
  );
}

export default Profile;
