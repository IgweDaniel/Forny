import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
  body {
    font-family: 'Source Sans Pro', sans-serif;
    /* height: 100vh; */
}
.icon{
    display:flex;
    align-items:center;
    justify-content:center;
}


  li{
      list-style:none
  }

  a{

      text-decoration:none;
      color: #6b7ddf;
  }

  @media (min-width: 768px) {
 
  }
  @media (min-width: 1024px) {
  }
`;
