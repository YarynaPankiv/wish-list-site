import { useState } from "react";
import styled from "styled-components";
import CreateWish from "./CreateWish";
import { Wish } from "../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface WishesGridProps {
  setWishes: React.Dispatch<React.SetStateAction<Wish[]>>;
  wishes: Wish[];
  onChange?: (updatedWishes: Wish[]) => void; // Notify parent about changes
  isOwner: boolean; // New prop to indicate ownership
  ownerName?: string;
  wishlistId?: string;
}

export default function WishesGrid({
  setWishes,
  wishes,
  onChange,
  isOwner,
  ownerName,

  wishlistId, // Receive isOwner prop
}: WishesGridProps) {
  const [isPlusClicked, setIsPlusClicked] = useState<boolean>(false);

  const handleOnPlusClick = () => {
    if (!isPlusClicked) {
      setIsPlusClicked(true);
    }
  };

  const addWish = (newWish: Wish) => {
    const updatedWishes = [...wishes, newWish];
    setWishes(updatedWishes); // Update state
    onChange?.(updatedWishes); // Notify parent of changes
    setIsPlusClicked(false); // Close form
  };

  const handleDelete = (
    wishToDelete: Wish,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const updatedWishes = wishes.filter((wish) => wish !== wishToDelete);
    setWishes(updatedWishes);
    onChange?.(updatedWishes);
  };

  const handleReserveToggle = async (wish: Wish) => {
    if (!wishlistId) {
      console.error("No wishlistId provided. Cannot update Firestore.");
      return; // Exit the function if wishlistId is undefined
    }

    const updatedWishes = wishes.map((w) =>
      w === wish ? { ...w, reserved: !w.reserved } : w
    );
    setWishes(updatedWishes);
    onChange?.(updatedWishes);

    const wishlistRef = doc(db, "wishlist", wishlistId);
    try {
      await updateDoc(wishlistRef, {
        wishes: updatedWishes,
      });
      console.log("Wish reservation updated in Firestore.");
    } catch (error) {
      console.error("Error updating wish reservation in Firestore:", error);
    }
  };

  return (
    <StyledWishesGrid>
      {isPlusClicked && <CreateWish addWish={addWish} />}

      <StyledP2>{isOwner ? "Your wishes" : ownerName}</StyledP2>
      <AllWishes>
        <WishesContainer>
          {wishes.map((wish, index) => (
            <WishItem key={index}>
              {isOwner && (
                <DeleteWishButton
                  onClick={(event) => handleDelete(wish, event)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    width="24"
                    height="24"
                    fill="#333"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </DeleteWishButton>
              )}

              <WishImage src={wish.img || "placeholder.jpg"} alt="wish image" />
              <WishDescription>{wish.description}</WishDescription>
              <WishLink href={wish.link} target="_blank">
                Go to link
              </WishLink>
              {!isOwner && (
                <ReserveCheckboxContainer>
                  <ReserveCheckbox
                    type="checkbox"
                    checked={wish.reserved || false}
                    onChange={() => handleReserveToggle(wish)}
                  />
                  <label>Reserve</label>
                </ReserveCheckboxContainer>
              )}
            </WishItem>
          ))}

          {/* Conditionally show the "Add Wish" button only for the owner */}
          {isOwner && (
            <AddWishRect
              onClick={handleOnPlusClick}
              isClickable={!isPlusClicked}
            >
              <PlusElement1 />
              <PlusElement2 />
            </AddWishRect>
          )}
        </WishesContainer>
      </AllWishes>
    </StyledWishesGrid>
  );
}

const StyledWishesGrid = styled.div`
  background-color: #e5d9f2;
  padding: 30px;
  border-radius: 15px;
  width: 640px;
`;

const WishesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  align-items: center;
`;

const WishItem = styled.div`
  position: relative;
  background-color: aliceblue;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 150px;
  /* height: 200px; */
`;

const WishImage = styled.img`
  width: 150px;
  height: 130px;
  object-fit: cover;
  border-radius: 10px;
`;

const WishDescription = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const WishLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: #295f98;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

interface AddWishRectProps {
  isClickable: boolean;
}

const AddWishRect = styled.div<AddWishRectProps>`
  background-color: aliceblue;
  height: 180px;
  width: 180px;
  border-radius: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.isClickable ? "pointer" : "not-allowed")};
  transition: transform 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

  &:hover {
    border-color: ${(props) => (props.isClickable ? "#a871e0" : "#ccc")};
    color: ${(props) => (props.isClickable ? "#a871e0" : "#ccc")};
    transform: ${(props) => (props.isClickable ? "scale(1.05)" : "none")};
  }
`;

const PlusElement1 = styled.div`
  height: 100px;
  width: 13px;
  background-color: #a5cef1;
  border-radius: 20px;
  position: absolute;
`;

const PlusElement2 = styled.div`
  height: 13px;
  width: 100px;
  background-color: #a5cef1;
  border-radius: 20px;
  position: absolute;
`;

const StyledP2 = styled.p`
  font-size: 25px;
  font-weight: 700;
  margin-top: 5px;
  text-align: center;
`;

const AllWishes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  gap: 30px;
`;

const DeleteWishButton = styled.button`
  position: absolute;
  top: 1px;
  right: 0px;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    fill: #969696;
  }

  &:hover svg {
    fill: #ff6666;
  }
`;

const ReserveCheckboxContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
  font-size: 15px;
`;

const ReserveCheckbox = styled.input`
  transform: scale(1.2);
  cursor: pointer;
`;
