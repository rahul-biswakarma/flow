import * as RenComponents from "@ren/ui/components";
import { Heading } from "@ren/ui/components";
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
      return () => (
        <div className="p-4 bg-crimson-a3 text-crimson-10 rounded-md">
          <Heading as="h4" className="font-medium">
            Preview Error
          </Heading>
          <pre className="mt-2 text-sm">Invalid code provided</pre>
        </div>
      );
    }

    const PreviewComponent = new Function(
      "React",
      "Flow",
      `
      try {
        ${transformedCode}

        const ComponentFn = (() => {
          try {
            if (typeof App !== 'undefined') return App;
            if (typeof FlowComponent !== 'undefined') return FlowComponent;
            if (typeof exports !== 'undefined' && exports.default) return exports.default;
            return null;
          } catch (err) {
            console.error('Error finding component:', err);
            return null;
          }
        })();

        if (!ComponentFn) {
          throw new Error('No valid component found');
        }

        return function SafePreview(props) {
          try {
            const { style, ...restProps } = props;
            const combinedProps = {
              ...restProps,
              style: {
                ...style,
                ...(ComponentFn.defaultProps?.style || {})
              }
            };

            return React.createElement(ComponentFn, combinedProps);
          } catch (err) {
            console.error('Error rendering component:', err);
            return React.createElement('div', { className: 'custom-block-error' },
              React.createElement('h4', null, 'Runtime Error'),
              React.createElement('pre', null, err.message)
            );
          }
        }
      } catch (err) {
        console.error('Error in preview setup:', err);
        return function ErrorComponent() {
          return React.createElement('div', { className: 'custom-block-error' },
            React.createElement('h4', null, 'Error in preview'),
            React.createElement('pre', null, err.message)
          );
        }
      }
      `,
    )(React, CustomBlockUtils);

    return PreviewComponent;
  } catch (error) {
    console.error("Fatal preview error:", error);
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

export class ErrorBoundary extends React.Component<{
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
