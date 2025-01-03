import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Buttons/Button";
import TextInput from "../Inputs/TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { GenerateImage, CreatePost } from "../../api/index.js";
import {useNavigate} from "react-router-dom";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 4rem;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
`;

const ImageForm = ({
  post,
  setPost,
  createPostLoading,
  setCreatePostLoading,
  generateImageLoading,
  setgenerateImageLoading,
}) => {
  const navigate= useNavigate();
  const [error, setError]= useState("");

  const generateImageFun = async () => {
    setgenerateImageLoading(true);
    // Call the API to generate the image
    await GenerateImage({ prompt: post.prompt })
      .then((res) => {
        setPost({
          ...post,
          photo: `data:image/jpeg;base64,${res?.data?.photo}`,
        });
        setgenerateImageLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setgenerateImageLoading(false);
      });
  };

  const createPostFun = async() => {
    setCreatePostLoading(true);
    // Call the API to create the post
    await CreatePost( post )
    .then((res) => {
      navigate("/");
      setCreatePostLoading(true);
    })
    .catch((error) => {
      setError(error?.response?.data?.message);
      setCreatePostLoading(true);
    });
  };
  return (
    <Form>
      <Top>
        <Title>Generate Image With Prompt</Title>
        <Desc>Write your prompt according to the image you want</Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name"
          name="name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image you want to generate..."
          name="name"
          rows="8"
          textArea
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        ** You can post the AI generated image to the Community **
      </Body>
      <Actions>
        <Button
          text="Generate Image"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={() => generateImageFun()}
        ></Button>
        <Button
          text="Post Image"
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={post.name === "" || post.prompt === ""}
          onClick={() => createPostFun()}
        ></Button>
      </Actions>
    </Form>
  );
};

export default ImageForm;
