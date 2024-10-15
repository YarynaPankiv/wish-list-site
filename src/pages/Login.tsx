import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      dispatch(login(userData));
      navigate("/my-wishlists");
    }
  }, [dispatch]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(login(userData));
    } catch (error) {
      console.error("Error during Google login", error);
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>Login with Google</Title>
        <LoginButton onClick={handleGoogleLogin}>Login</LoginButton>
      </LoginBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4285f4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #357ae8;
  }
`;

const UserInfo = styled.div`
  img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 20px;
    margin-bottom: 5px;
  }
  p {
    font-size: 16px;
    color: gray;
  }
`;
