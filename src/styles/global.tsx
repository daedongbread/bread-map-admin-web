import { Global, css } from '@emotion/react';

const style = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  html {
    font-size: 10px;
  }
  body {
    box-sizing: border-box;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-size: 1rem;
    font-weight: normal;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  input[type='file'] {
    position: absolute;
    left: 99999px;
    right: 99999px;
  }
`;

export const GlobalStyle = () => {
  return <Global styles={style} />;
};
