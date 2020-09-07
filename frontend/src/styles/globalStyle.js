import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
  body {
    font-family: 'Source Sans Pro', sans-serif;

}
.icon{
    display:flex;
    align-items:center;
    justify-content:center;
}
.container{
    width:80%;
    margin:0 auto;
}

  li{
      list-style:none
  }
  .emph{
      font-weight:600;
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
