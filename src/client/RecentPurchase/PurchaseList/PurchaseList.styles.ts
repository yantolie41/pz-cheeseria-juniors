import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  border: 3px solid green;
  div {
    flex: 1;
  }
  
  li {
    display: inline-block;
    font-size: 12px;
  }
  
  h5 {
    postition: relative;
    float: left;
    display: inline-block;
  }

  .container {
    background-color: #f2f2f2;
    padding: 5px 20px 15px 20px;
    border: 1px solid lightgrey;
    border-radius: 3px;
  }
  span.price {
    float: right;
  }

  button {
    border-radius: 0 0 20px 20px;
    border: 1px solid lightblue;
    margin-bottom: 5px;
    background-color: green;
    color: black;
    font-weight: bold;
  }

 
`;