<<<<<<< Updated upstream
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import EditProfile from "./components/EditProfile";
import UserProfile from "./components/UserProfile";


function App() {
  return (
    <>
      <Router>
        <Route path="/profile" component={UserProfile} />
        <Route path="/Edit" component={EditProfile} />
      </Router>
    </>
  );
}
=======
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from './pages/Profile';

const App = () => {
  return <Profile/>;
};
>>>>>>> Stashed changes

export default App