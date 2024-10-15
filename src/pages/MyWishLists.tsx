import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styled from "styled-components";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import WishListsGrid from "../components/WishListsGrid";
import { useLocation } from "react-router-dom";
import { WishList } from "../interfaces";
import Header from "../components/Header";

export default function MyWishLists() {
  const user = useSelector((state: RootState) => state.user);
  const [wishlists, setWishlists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const fetchWishlists = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, "wishlist"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const fetchedWishlists: any[] = [];
          querySnapshot.forEach((doc) => {
            fetchedWishlists.push({ id: doc.id, ...doc.data() });
          });
          setWishlists(fetchedWishlists);
          console.log("f", fetchedWishlists);
        } catch (error) {
          console.error("Error fetching wishlists:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWishlists();
  }, [user, location.state?.refresh]);

  return (
    <>
      <Header />
      <Container>
        <StyledP>My wishlists</StyledP>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <WishListsDiv>
            <WishListsGrid wishlists={wishlists} />
          </WishListsDiv>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledP = styled.p`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const WishListsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
`;
