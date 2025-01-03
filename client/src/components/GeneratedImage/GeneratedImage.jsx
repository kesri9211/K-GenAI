import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  min-height: 300px;
  display:flex;
  gap:1rem;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.secondary};
  border-radius: 20px;
  color: ${({ theme }) => theme.arrow + 80};
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  background: ${({ theme }) => theme.black + 50};
  
`;

const GeneratedImage = ({src, loading}) => {
  return (
    <Container>
      {
        // If loading is true, show a CircularProgress component
        loading ? (
          <>
          <CircularProgress sx={{color:"inherit",width:"20px",height:"20px"}}/>
          Generating Your Image...</>
        ) : (
          <>{src ? <Image src={src}/> : <>Write a prompt to generate image</>}</>
        )
      }
    </Container>
  );
};

export default GeneratedImage;
