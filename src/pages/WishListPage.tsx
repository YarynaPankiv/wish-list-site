import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Wish, WishList } from "../interfaces";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import WishesGrid from "../components/WishesGrid";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function WishListPage() {
  const { id } = useParams<{ id: string }>();
  const [wishlist, setWishList] = useState<WishList | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false); // New state to track ownership

  const currentUserId = useSelector((state: RootState) => state.user.uid); // Fetch the current user's ID from Redux

  const saveWishesToDB = async () => {
    if (!id) return;

    const wishlistDocRef = doc(db, "wishlist", id);
    try {
      await updateDoc(wishlistDocRef, { wishes });
      console.log("Wishes updated in Firestore.");
      setIsModified(false);
    } catch (error) {
      console.error("Error updating wishes in Firestore:", error);
    }
  };

  const handleWishesChange = (updatedWishes: Wish[]) => {
    setWishes(updatedWishes);
    setIsModified(true);
  };

  useEffect(() => {
    const fetchWishList = async () => {
      if (id) {
        try {
          const docRef = doc(db, "wishlist", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const fetchedWishlist = docSnap.data() as WishList;
            setWishList(fetchedWishlist);
            setWishes(fetchedWishlist.wishes);
            setIsOwner(fetchedWishlist.userId === currentUserId);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWishList();
  }, [id, currentUserId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!wishlist) {
    return <p>No wishlist found.</p>;
  }

  return (
    <>
      <Header />
      <Container>
        <Title>{wishlist.name}</Title>
        <WishesGrid
          setWishes={setWishes}
          wishes={wishes}
          onChange={handleWishesChange}
          isOwner={isOwner}
          wishlistId={id}
        />
        {isModified && isOwner && (
          <SaveButton onClick={saveWishesToDB}>Save Changes</SaveButton>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #6a67ce;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #5754a0;
  }
`;
