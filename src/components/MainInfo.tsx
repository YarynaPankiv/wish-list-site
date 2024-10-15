import styled from "styled-components";
import { Link } from "react-router-dom";

export default function MainInfo() {
  return (
    <Container>
      <CreateListButton to="/login">Create list</CreateListButton>
      <StyledP>Make your own wish list</StyledP>
      <StyledP2>Share it with friends</StyledP2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const StyledP = styled.p`
  font-family: "Anton", sans-serif;
  font-size: 40px;
  font-weight: 100;
  margin-bottom: 0;
`;

const StyledP2 = styled.p`
  font-family: "Exo", system-ui;
  font-size: 30px;
  margin: 0;
`;

const CreateListButton = styled(Link)`
  border: 2px solid #b992e0;
  border-radius: 40px;
  font-size: 25px;
  font-family: "Maven Pro", sans-serif;
  padding: 10px 20px;
  color: #b992e0;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

  &:hover {
    border-color: #a871e0;
    color: #a871e0;
    transform: scale(1.05);
  }
`;
