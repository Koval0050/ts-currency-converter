import styled from "styled-components";

export const CurrenciesListStyle = styled.ul`
  display: flex;
  list-style: none;
  width: 400px;

  .CurrenciesListItem {
    width: 100%;
    padding: 10px 20px;
    text-align: center;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.3);

    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &:hover,
    &:focus {
      background-color: #cecbcb;
    }

    &.active {
      background-color: #16b67f;
    }
  }
`;
