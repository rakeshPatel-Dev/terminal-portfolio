/// <reference types="vite/client" />

declare module "*.txt" {
  const content: string;
  export default content;
}

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    id: string;
    name: string;
    colors: {
      body: string;
      scrollHandle: string;
      scrollHandleHover: string;
      primary: string;
      secondary: string;
      text: {
        100: string;
        200: string;
        300: string;
      };
    };
  }
}
