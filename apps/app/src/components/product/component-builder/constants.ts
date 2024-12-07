import type { StyleData } from "@/components/panels/style-panel/type";

export const sandPackFilesConfig = ({
  componentCode,
  style,
}: { componentCode: string; style: StyleData }) => ({
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
    code: componentCode,
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
    code: defaultCodeWrapper(style),
  },
  "/public/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="component-builder-preview-root"></div>
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
import { Button } from "@radix-ui/themes";

export default function App(props): JSX.Element {
  const [counter, setCounter] = useState(0);
  return (
    <div
      style={{
        height: '100%',
        ...props.style,
      }}
    >
      <Button
        onClick={() => setCounter(counter + 1)}
      >
        Counter: {counter}
      </Button>
    </div>
  );
}
`;

export const defaultCodeWrapper = (style?: StyleData) => {
  return `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme as ThemeProvider } from "@radix-ui/themes";

import App from "./App";
import "@radix-ui/themes/styles.css";
import "./index.css";

const root = createRoot(document.getElementById("component-builder-preview-root"));
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
      <App style={${JSON.stringify(style)}} />
    </ThemeProvider>
  </StrictMode>
);`;
};
