import styled from 'styled-components';

export const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;

  button {
    border-radius: 0 0 20px 20px;
    border: 1px solid lightblue;
    margin-bottom: 5px;
    background-color: green;
    color: black;

    font-weight: bold;
  }

  .btn-purchase {
    width: 100%;
    font-size: 15px;
  }

  .btn-purchase: hover{
    background-color: white;
  }

  .btn-close{
    background-color: red;
    color: silver;
    width: 100%;
    font-size: 15px;
  }

  .btn-close:hover {
    background-color: white;
    color: black;
`;
