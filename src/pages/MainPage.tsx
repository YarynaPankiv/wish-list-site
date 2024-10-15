import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // хук для перенаправлення
import Header from "../components/Header";
import MainInfo from "../components/MainInfo";
import { login, logout } from "../redux/userSlice";
import { RootState } from "../redux/store";

const MainPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(login(userData));
      navigate("/my-wishlists");
    }
  }, [dispatch, navigate]);

  return (
    <Fragment>
      <Header />
      <MainInfo />
    </Fragment>
  );
};

export default MainPage;
