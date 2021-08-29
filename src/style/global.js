import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
 ${reset};
 
  * {
    margin: 0;
    padding: 0;  
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; //1rem = 10px;
  }

  button {
    border: none;
    cursor: pointer;
    background-color:transparent;
  }

  ${({ theme }) => {
    return css`
      body {
        font-family: ${theme.fonts.family.base};
        font-weight: ${theme.fonts.weight.normal};
        font-size: ${theme.fonts.size.base};
      }
    `;
  }}
`;

export default GlobalStyle;
