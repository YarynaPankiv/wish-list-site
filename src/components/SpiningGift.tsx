import styled from "styled-components";
import { useEffect, useState } from "react";

export default function SpiningGift() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setPosition(scrollPosition * 0.5); // Змінює цей коефіцієнт, щоб налаштувати чутливість
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Circle style={{ transform: `translateY(${position}px)` }}>
      <GiftLogo src="/gift.png" alt="Gift" />
    </Circle>
  );
}

const Circle = styled.div`
  border-radius: 50%;
  background-color: #da61da;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
`;

const GiftLogo = styled.img`
  width: 25px;
  animation: rotate 5s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
