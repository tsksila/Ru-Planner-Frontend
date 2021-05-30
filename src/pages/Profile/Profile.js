import React, { useState } from "react";
import {
  Switch,
  Route,
  Link,
  Redirect } from 'react-router-dom'
import MunuButton from "../../components/MunuButton";



import CreatePlan from './CreatePlan'
import MyList from './MyList'



function Profile() {
  const [menu, setMenu] = useState("mylist");

  return (
    <div className="min-h-screen   bg-blue-100 flex flex-col   ">
   
      <div className="min-w-full p-2  mb-5">
        <Link to={`/profile/my-list`}  onClick={() => setMenu("mylist")}>
          <MunuButton
            active={menu === "mylist" ? true : false}
            name={"รายการของฉัน"}
          />
        </Link>
        <Link to={`/profile/create-plan`} onClick={() => setMenu("create_plan")}>
          <MunuButton
            active={menu === "create_plan" ? true : false}
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
