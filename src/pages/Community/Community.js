import React from "react";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import MunuButton from "../../components/MunuButton";


import Course from "../Community/CourseCommunity";
import Plan from "../Community/PlanCommunity";

function Community() {
    const { pathname } = useLocation();
  return (
    <div className="min-h-screen   bg-blue-100 flex flex-col   ">
      <div className="min-w-full p-2  mb-5">
        <Link to={`/community/course-community`}>
          <MunuButton
            active={pathname === "/community/course-community" ? true : false}
            name={"รายวิชา"}
          />
        </Link>
        <Link to={`/community/Plan`}>
          <MunuButton
            active={pathname === "/community/Plan" ? true : false}
            name={"แผนการเรียน"}
          />
        </Link>
      </div>

      <Switch>
        <Route path="/community/course-community">
          <Course />
        </Route>

        <Route path="/community/Plan">
          <Plan />
        </Route>

        {/* <Route path="/profile">
          <Redirect to="/community/course-community" />
        </Route> */}

      </Switch>
    </div>
  );
}

export default Community;
