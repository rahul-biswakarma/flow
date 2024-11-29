import type { StyleData } from "@/components/panels/style-panel/type";

export const sandPackFilesConfig = ({
  code,
  styleValue,
}: { code: string; styleValue: StyleData }) => ({
  "tsconfig.json": {
    code: `{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": [ "dom", "es2015" ],
    "jsx": "react-jsx"
  }
}`,
  },
  "/App.tsx": {
    code: code,
  },
  "/index.css": {
    code: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    }`,
  },
  "/index.tsx": {
    code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme as ThemeProvider } from "@radix-ui/themes";

import App from "./App";
import "@radix-ui/themes/styles.css";
import "./index.css";


const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ThemeProvider
      accentColor="indigo"
      grayColor="slate"
      panelBackground="translucent"
      radius="medium"
      scaling="100%"
      appearance="dark"
    >
      <App style={${JSON.stringify(styleValue)}} />
    </ThemeProvider>
  </StrictMode>
);`,
  },
  "/public/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="margin: 0px !important">
    <div id="root"></div>
  </body>
</html>`,
  },
  "/package.json": {
    code: JSON.stringify({
      dependencies: {
        react: "^18.0.0",
        "react-dom": "^18.0.0",
        "react-scripts": "^4.0.0",
        "@radix-ui/themes": "^3.1.4",
      },
      devDependencies: {
        "@types/react": "^18.0.0",
        "@types/react-dom": "^18.0.0",
        typescript: "^4.0.0",
      },
      main: "/index.tsx",
    }),
  },
});

export const defaultComponentCode = `import React, {useState} from "react";

export default function App(props): JSX.Element {
  const [counter, setCounter] = useState(0);
  return (
    <div
      style={{
        height: '100%',
        ...props.style,
      }}
    >
      <button
        onClick={() => setCounter(counter + 1)}
        style={{
          background: '#ccc',
          color: '#000',
          padding: '8px 16px',
          borderRadius: '6px',
        }}
      >
        Counter: {counter}
      </button>
    </div>
  );
}



`;
