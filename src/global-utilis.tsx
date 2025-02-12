import styled from "styled-components";

// Define a styled component
export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  &:hover {
    background-color: #45a049;
  }
`;

export const RedButton = styled(Button)`
  background-color: red;
  &:hover {
    background-color: darkred;
  }
`;
