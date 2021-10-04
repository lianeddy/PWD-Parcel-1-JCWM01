<<<<<<< Updated upstream
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>{/* <RegisterPage /> */}</Router>
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