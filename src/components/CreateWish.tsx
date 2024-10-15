import { useRef, useState } from "react";
import styled from "styled-components";
import { Wish } from "../interfaces";
import { storage } from "../firebaseConfig"; // Import storage from your Firebase config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface CreateWishProps {
  addWish: (newWish: Wish) => void;
}

export default function CreateWish({ addWish }: CreateWishProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the image file
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const handleAddImageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Set preview image
      setImageFile(file); // Store the file for Firebase upload
    }
  };

  const handleSaveClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!description) {
      alert("Please provide a description.");
      return;
    }

    setUploading(true);

    let imageUrl = null;
    if (imageFile) {
      try {
        // Create a reference in Firebase Storage
        const storageRef = ref(storage, `wishes/${imageFile.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, imageFile);

        // Get the uploaded image URL
        imageUrl = await getDownloadURL(uploadTask.ref);
        console.log("Uploaded image URL:", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const newWish: Wish = {
      description: description,
      link: link,
      img: imageUrl || null, // Use uploaded image URL or null if no image
    };

    addWish(newWish);
    setUploading(false);
  };

  return (
    <Overlay>
      <Container>
        <CloseButton onClick={() => console.log("Close modal")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width="24"
            height="24"
            fill="#333"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </CloseButton>

        <StyledP>Add your wish</StyledP>
        <Form>
          <InputDiv>
            <Label htmlFor="about-input">About the wish</Label>
            <InputLink
              id="about-input"
              placeholder="Enter details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputDiv>
          <InputDiv className="link">
            <Label htmlFor="link-input">Link to wish</Label>
            <InputLink
              id="link-input"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </InputDiv>
          <ButtonAndImageWrapper>
            <AddImgBtn onClick={handleAddImageClick}>Add an image</AddImgBtn>
            {image && <ImagePreview src={image} alt="Selected wish" />}
          </ButtonAndImageWrapper>
          <SaveBtn onClick={handleSaveClick} disabled={uploading}>
            {uploading ? "Saving..." : "Save"}
          </SaveBtn>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form>
      </Container>
    </Overlay>
  );
}

// Styled components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  height: auto;
  width: 500px;
  background-color: aliceblue;
  border-radius: 30px;
  position: relative;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    fill: #333;
  }

  &:hover svg {
    fill: #ff6666;
  }
`;

const StyledP = styled.p`
  font-family: "Exo", system-ui;
  font-size: 25px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const InputLink = styled.input`
  padding: 8px 15px;
  background-color: #f5efff;
  border: 2px solid #cdc1ff;
  border-radius: 20px;
  width: 250px;
  &::placeholder {
    color: #bbb;
  }
`;

const Label = styled.label`
  font-size: 18px;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  &.link {
    gap: 40px;
  }
`;

const ButtonAndImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
`;

const AddImgBtn = styled.button`
  font-family: inherit;
  font-size: 16px;
  background-color: #a594f9;
  border: 2px solid #8321eb;
  padding: 8px 20px;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;

  cursor: pointer;
`;

const SaveBtn = styled.button`
  margin-top: 30px;
  font-family: inherit;
  font-size: 16px;
  background-color: #295f98;
  border: none;
  padding: 10px 30px;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;

  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #484bc9;
  }

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

const ImagePreview = styled.img`
  max-width: 150px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
