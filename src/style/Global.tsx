import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'
import { w95, w952 } from './fonts'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: "w95";
    font-style: normal;
    font-weight: normal;
    src: local("w95"), local("w952"), url(${w95}) format("woff"), url(${w952}) format("woff2");
  }

  * {
    font-family: "w95", monospace;
  }
  .token,
  code {
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  }

  p {
    font-size: 1rem;
    line-height: 1.625rem;
  }

  body {

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
