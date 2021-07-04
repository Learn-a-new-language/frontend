// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e

import { UNIT_SIZE, FONT_SIZE } from './variables'

export default `
  html {
    height: 100%;
    background-color: var(--white-smoke);
    color: var(--sonic-silver);
    font-family: 'Barlow Semi Condensed', sans-serif;
    box-sizing: border-box;
    font-size: 62.5%;
    
    --font-size-xxsm: ${FONT_SIZE.xxsm};
    --font-size-xsm: ${FONT_SIZE.xsm};
    --font-size-sm: ${FONT_SIZE.sm};
    --font-size-md: ${FONT_SIZE.md};
    --font-size-lg: ${FONT_SIZE.lg};
    --font-size-xlg: ${FONT_SIZE.xlg};
    --size-xsm: ${UNIT_SIZE.xsm};
    --size-sm: ${UNIT_SIZE.sm};
    --size-md: ${UNIT_SIZE.md};
    --size-lg: ${UNIT_SIZE.lg};
    --size-xlg: ${UNIT_SIZE.xlg};
    --white: #fff;
    --white-smoke: #f5f5f5;
    --cool-gray: #8f99b9;
    --granite-gray: #666;
    --arsenic: #444;
    --jet: #333;
  }
  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    height: 100%;
    font-size: 1.2rem;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: var(--sonic-silver);
    text-decoration: none;
    cursor: pointer;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  input,
  button {
    border: none;
    outline: none;
  }
  input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  button {
    padding: 0;
    line-height: 1;
    font-family: inherit;
    color: inherit;
    text-transform: inherit;
    font-weight: inherit;
    text-align: inherit;
    background: transparent;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    font-family: 'Barlow Semi Condensed', sans-serif
  }
  p {
    margin: 0;
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
    text-align: center;
    width: 100%;
  }
  th {
    text-align: left;
  }
`
