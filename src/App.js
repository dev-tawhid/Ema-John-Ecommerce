import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/productDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
export const  UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h2>Login: {loggedInUser.email}</h2>
      <Header></Header>
      <Router>
        <Switch>
        <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/shipment">
                <Shipment></Shipment>
            </Route>
            <Route path="/login">
                <Login></Login>
            </Route>
           
            <Route path="/product/:productKey">
                <ProductDetail></ProductDetail>
            </Route>
            <Route exact path="/">
                <Shop></Shop>
            </Route>
            <Route path="*">
                <NotFound></NotFound>
            </Route>
        </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
