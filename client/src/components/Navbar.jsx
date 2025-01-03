import React from "react";
import styled from "styled-components";
import Button from "./Buttons/Button";
import { AddRounded, ExploreRounded } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.menu_primary_text};
  font-weight: bold;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");
  return (
    <Container>
      K-GenAI
      {path[1] === "create" ? (
        <Button
          onClick={() => navigate("/")}
          text="Explore Posts"
          leftIcon={<ExploreRounded style={{ fontSize: "20px" }} />}
          type="secondary"
        />
      ) : (
        <Button
          onClick={() => navigate("/create")}
          text="Create New Post"
          leftIcon={<AddRounded style={{ fontSize: "20px" }} />}
        />
      )}
    </Container>
  );
};

export default Navbar;
