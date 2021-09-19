import styled from 'styled-components';

export const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;

  button {
    border-radius: 0 0 20px 20px;
    border: 1px solid lightblue;
    margin-top: 10px;
    background-color: green;
    color: black;
    font-weight: bold;
    width: 100%;
  }
  
  .btn-close{
    background-color: red;
    color: silver;
    font-size: 15px;
  }

  .btn-close:hover {
    background-color: white;
    color: black;
  }
`;