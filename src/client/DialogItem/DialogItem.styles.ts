import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;

  button {
    border-radius: 0 0 20px 20px;
    border: 1px solid lightblue;
    margin-bottom: 5px;
    background-color: green;
    color: black;
    font-weight: bold;
  }

  .btn-close{
    background-color: red;
  }

  .btn-close:hover {
    background-color: white;
  }

  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0; 
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;
