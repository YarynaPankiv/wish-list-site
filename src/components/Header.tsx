import styled from "styled-components";
import SpiningGift from "./SpiningGift";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const user = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();

  const navigateTo = () => {
    if (user?.uid) {
      navigator("/my-wishlists");
    } else {
      navigator("/login");
    }
  };

  const navigateToCreate = () => {
    navigator("/create-list");
  };

  console.log(user);

  return (
    <Container>
      <LogoImage src="/logo.png" alt="Logo" />
      <SpiningGift />
      <TryButtonContainer>
        <TryButton onClick={navigateTo}>
          {user?.uid ? "My WishLists" : "Try Now"}
        </TryButton>

        {user?.uid && (
          <TryButton onClick={navigateToCreate}>Create new list</TryButton>
        )}
      </TryButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 40px;
  background-color: #c3c7f3;
  border-radius: 10px;
  position: sticky;
`;

const LogoImage = styled.img`
  height: 30px;
  margin-right: 10px;
`;

const TryButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const TryButton = styled.button`
  padding: 10px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  margin-left: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;
