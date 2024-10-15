import styled from "styled-components";
import { WishList } from "../interfaces";
import { useNavigate } from "react-router-dom";

interface WishListsGridProps {
  wishlists: WishList[];
}

export default function WishListsGrid({ wishlists }: WishListsGridProps) {
  const navigator = useNavigate();
  return (
    <Container>
      {wishlists.map((wishlist) => (
        <WishlistCard
          key={wishlist.id}
          onClick={() => navigator(`/wishlist/${wishlist.id}`)}
        >
          <WishlistName>{wishlist.name}</WishlistName>
          <WishlistImageWrapper>
            {Array.isArray(wishlist.wishes) &&
            wishlist.wishes.length > 0 &&
            wishlist.wishes[0].img ? (
              <WishlistImage
                src={wishlist.wishes[0].img || undefined}
                alt={wishlist.wishes[0].description || "Wishlist image"}
              />
            ) : (
              <PlaceholderImage>No Image</PlaceholderImage>
            )}
          </WishlistImageWrapper>
          <WishlistInfo>
            {Array.isArray(wishlist.wishes) ? (
              <>
                {wishlist.wishes.length} wish
                {wishlist.wishes.length !== 1 && "es"}
              </>
            ) : (
              "0 wishes"
            )}
          </WishlistInfo>
        </WishlistCard>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  /* background-color: #e5d9f2;
  min-height: 500px; */
`;

const WishlistCard = styled.div`
  width: 250px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const WishlistName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 15px 0;
`;

const WishlistImageWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const WishlistImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const PlaceholderImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999;
  width: 100%;
  height: 100%;
`;

const WishlistInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin: 10px 0;
`;
