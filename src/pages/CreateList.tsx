import styled from "styled-components";
import Header from "../components/Header";
import WishesGrid from "../components/WishesGrid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addToLists } from "../redux/wishlistsSlice";
import { Wish, WishList } from "../interfaces";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/userSlice";

export default function CreateList() {
  const [listName, setListName] = useState<string>("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user?.uid) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch(login(JSON.parse(storedUser)));
      }
    }
  }, [dispatch, user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  const handleCreateWishList = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!user?.uid) {
      console.error("User must be logged in to create a wish list.");
      return;
    }

    if (!listName.trim()) {
      console.error("Wish list name cannot be empty.");
      return;
    }

    setIsCreating(true);
    const newWishList: WishList = {
      userId: user.uid,
      name: listName,
      wishes: wishes,
    };

    try {
      const docRef = await addDoc(collection(db, "wishlist"), newWishList);
      const wishListWithId: WishList = {
        ...newWishList,
        id: docRef.id,
      };

      setIsOwner(true);

      dispatch(addToLists(wishListWithId));

      console.log("Document written with ID: ", docRef.id);
      navigate("/my-wishlists", { state: { refresh: true } });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Container>
      <Header />
      <StyledP>Create Your Wish List</StyledP>
      <Form>
        <InputNameDiv>
          <Label htmlFor="nameInput">Give your Wish List a name</Label>
          <InputName
            id="nameInput"
            value={listName}
            onChange={handleNameChange}
            placeholder="Enter wish list name"
          />
        </InputNameDiv>

        <WishesGrid setWishes={setWishes} wishes={wishes} isOwner={true} />

        <SubmitButton onClick={handleCreateWishList} disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Wish List"}
        </SubmitButton>
      </Form>
    </Container>
  );
}

const Container = styled.div``;

const StyledP = styled.p`
  font-family: "Exo", system-ui;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
  gap: 20px;
`;

const InputNameDiv = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  background-color: #e5d9f2;
  padding: 20px 50px;
  border-radius: 15px;
  width: 600px;
`;

const InputName = styled.input`
  padding: 8px 15px;
  font-size: 20px;
  background-color: #f5efff;
  border: 2px solid #cdc1ff;
  border-radius: 20px;

  &::placeholder {
    font-size: 15px;
    color: #bbb;
  }
`;

const Label = styled.label`
  font-size: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px 30px;
  font-size: 20px;
  color: white;
  background-color: #6a67ce;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 30px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5754a0;
  }

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;
