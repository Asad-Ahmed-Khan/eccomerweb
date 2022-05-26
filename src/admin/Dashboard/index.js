import React from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fire } from "../../Config/config";

import Home from "./Home";
import AddPost from "./AddPost";
import Navbar from "./Navbar";
import Posts from "./Posts";
import SeePost from "./SeePost";
import EditPost from "./EditPost";

const Dashboard = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(`path`, path);

  //logout User
  const logoutUser = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "RESET_USER" });
        toast.success("You are successfully logged out");
        history.push("/");
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <>
      <Navbar logoutUser={logoutUser} />
      <Switch>
        <Route exact path={path} component={() => <Home />} />
        <Route exact path={`${path}/addPost`} component={() => <AddPost />} />
        <Route exact path={`${path}/posts`} component={() => <Posts />} />
        <Route exact path={`${path}/post/:id`} component={() => <SeePost />} />
        <Route exact path={`${path}/post/:id/edit`} component={() => <EditPost />} />
      </Switch>
    </>
  );
};

export default Dashboard;
