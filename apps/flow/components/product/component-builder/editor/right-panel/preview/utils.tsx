import * as RenComponents from "@ren/ui/components";
import * as RenIcons from "@ren/ui/icons";
import { transformSync } from "@swc/wasm-web";
import React from "react";

export const transformCode = (codeToTransform: string) => {
  try {
    const result = transformSync(codeToTransform, {
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
        },
        transform: {
          react: {
            pragma: "React.createElement",
            pragmaFrag: "React.Fragment",
            throwIfNamespace: true,
            development: false,
            useBuiltins: true,
          },
        },
      },
    });
    return { code: result.code };
  } catch {
    throw new Error("Code transformation failed");
  }
};

export const generatePreview = (transformedCode: string) => {
  try {
    if (!transformedCode || typeof transformedCode !== "string") {
      throw new Error("Invalid code provided");
    }

    const PreviewComponent = new Function(
      "React",
      "Flow",
      `
      try {
        ${transformedCode}
      } catch (err) {
        throw new Error('Preview generation failed: ' + err.message);
      }
      `,
    )(React, CustomBlockUtils);

    return () => (
      <ErrorBoundary
        fallback={(error) => (
          <div className="p-4 bg-crimson-a3 text-crimson-10 rounded-md">
            <h4 className="font-medium">Runtime Error</h4>
            <pre className="mt-2 text-sm whitespace-pre-wrap">
              {error.message}
            </pre>
          </div>
        )}
      >
        <PreviewComponent />
      </ErrorBoundary>
    );
  } catch (error) {
    return () => (
      <div className="p-4 bg-crimson-a3 text-crimson-10 rounded-md">
        <h4 className="font-medium">Preview Error</h4>
        <pre className="mt-2 text-sm whitespace-pre-wrap">
          {(error as Error).message}
        </pre>
      </div>
    );
  }
};

class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: (error: Error) => React.ReactNode;
}> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error as Error);
    }
    return this.props.children;
  }
}

export const CustomBlockUtils = {
  components: {
    ...RenComponents,
    ...RenIcons,
  },
};
