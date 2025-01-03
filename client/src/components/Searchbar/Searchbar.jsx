import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  max-width: 550px;
  display: flex;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 12px 16px;
  cursor: pointer;
  align-items: center;
`;

const Searchbar = ({ search, setSearch }) => {
  return (
    <SearchBarContainer>
      <SearchOutlined />
      <input
        type="text"
        placeholder="Search with prompt or name..."
        style={{
          border: "none",
          outline: "none",
          marginLeft: "10px",
          width: "100%",
          background: "transparent",
          color: "inherit",
          fontSize: "16px",
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </SearchBarContainer>
  );
};

export default Searchbar;
