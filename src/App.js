

import { Link } from "react-router-dom";

import React, { Component, useEffect, useState } from 'react'

import { Home } from './Components/Home'
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'
import SubNavbar from "./Components/SubNavbar";
import { ProductsContextProvider } from "./Global/ProductsContext";
import { NotFound } from './Components/NotFound'
import { auth, db } from './Config/config'
import { CartContextProvider } from './Global/CartContext'
import {Cart} from './Components/Cart'
import { AddProducts } from './Components/AddProducts'
import { Cashout } from './Components/Cashout'
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./admin/Dashboard/";
import SeePost from "./admin/Dashboard/SeePost";
import Admin from "./admin";
import Posts from "./Components/Posts";
import { fire } from "./Config/config"
import Offline from "./Components/Offline";
import { Redirect } from "react-router-dom";


const App = () => {
  // state = {
  //   user : null,
  //   userId: null,
  // }


  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.auth.user);

  // // getting user info for navigation bar
  // auth.onAuthStateChanged(user => {
  //     if (user) {
  //         db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
  //             this.setState({
  //                 user: snapshot?.data()?.Name || 'user',
  //                 userId: snapshot?.id,
  //             })
  //         })
  //     }
  //     else {
  //         this.setState({
  //             user: null,
  //             userId: null,
  //         })
  //     }
  // })
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [onLine, setOnLine] = useState(true);
  // const [user, setUser] = useState('');

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('onAuthStateChanged', user)
        if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });
      }
    });
  }, []);

  // useEffect(() => {
  //   setOnLine(navigator.onLine);
  //   if (!onLine) dispatch({ type: "RESET_USER" });
  // }, [navigator.onLine]);

  if (!onLine) {
    return <Offline />;
  }
  console.log('user', user);

  const adminRoutes = () => {
    return <>
      {/* {!pathname.includes("/") ?  */}
      <Navbar />
      {/* : null} */}
      {/* <Route path={""}> */}
      <Route exact path={"/"} component={() => <Home />} />
      <Route path={"/posts"} component={() => <Posts />} />
      <Route exact path={"/post/:id/:title"} component={() => <SeePost />} />
      <Route path={"/admin"} component={() => <Admin />} />
      {/* </Route> */}
    </>
  }

  const userRoutes = () => {
    return <>
      {/* {isLoggedIn && !pathname.includes("/admin") ?  */}
      <SubNavbar />
      {/* : null} */}
      {/* home */}
      <Route exact path='/' component={() => <Home user={this.state.user} />} />
      {/* signup */}
      <Route path="/signup" component={Signup} />
      {/* login */}
      <Route path="/login" component={Login} />
      {/* cart products */}
      <Route path="/cartproducts" component={() => <Cart user={'user'} />} />
      {/* add products */}
      <Route path="/addproducts" children={props => <AddProducts {...props} userId={'userId'} />} />
      {/* cashout */}
      <Route path='/cashout' component={() => <Cashout user={'user'} />} />
      <Route component={NotFound} />
      <Redirect to={'/'} />
    </>
  }

  return (
    <ProductsContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Switch>
            {!pathname.includes("/") ? <Navbar /> : null}
            {isLoggedIn && pathname.includes("/admin") ? <SubNavbar /> : null}
            <Route exact path={"/"} component={() => <Home />} />
            <Route path={"/posts"} component={() => <Posts />} />
            <Route exact path={"/post/:id/:title"} component={() => <SeePost />} />
            <Route path={"/admin"} component={() => <Admin />} />

            {/* home */}
            <Route exact path='/' component={() => <Home user={'user'} />} />
            {/* signup */}
            <Route path="/signup" component={Signup} />
            {/* login */}
            <Route path="/login" component={Login} />
            {/* cart products */}
            <Route path="/cartproducts" component={() => <Cart user={'user'} />} />
            {/* add products */}
            <Route path="/addproducts" children={props => <AddProducts {...props} userId={'userId'} />} />
            {/* cashout */}
            <Route path='/cashout' component={() => <Cashout user={'user'} />} />
            {/* <Route component={NotFound} /> */}
            <Redirect to={'/'} />

          </Switch>
        </BrowserRouter>
      </CartContextProvider>
    </ProductsContextProvider>
  )


}

export default App
