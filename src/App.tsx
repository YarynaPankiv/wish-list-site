import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateList from "./pages/CreateList";
import GlobalStyle from "./globalStyles";
import Login from "./pages/Login";
import MyWishLists from "./pages/MyWishLists";
import WishListPage from "./pages/WishListPage";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-list" element={<CreateList />} />
        <Route path="/my-wishlists" element={<MyWishLists />}></Route>
        <Route path="/wishlist/:id" element={<WishListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
