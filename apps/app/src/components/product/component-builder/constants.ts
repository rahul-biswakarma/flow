export const sandPackFilesConfig = (appCode: string) => ({
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
    code: appCode,
  },
  "/index.tsx": {
    code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
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
  <body>
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

export default function App(): JSX.Element {
  const [counter, setCounter] = useState(0);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
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
