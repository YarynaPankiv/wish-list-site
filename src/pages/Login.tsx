import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const USER_STORAGE_KEY = "wish-list-user";

export default function Login() {
  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      dispatch(login(userData));
      navigate("/my-wishlists");
    }
  }, [dispatch, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        token: await user.getIdToken(),
      };
      setUser(userData);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      dispatch(login(userData));
      navigate("/my-wishlists");
    } catch (error) {
      console.error("Error during Google login", error);
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>Login</Title>
        <LoginButton onClick={handleGoogleLogin}>Login with Google</LoginButton>
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
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #4285f4;
  color: white;
  &:hover {
    background-color: #357ae8;
  }
`;
