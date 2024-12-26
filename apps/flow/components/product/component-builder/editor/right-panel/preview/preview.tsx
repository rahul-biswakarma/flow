import { Text, ThemeProvider } from "@ren/ui/components";
import initSwc from "@swc/wasm-web";
import { useCallback, useEffect, useState } from "react";
import { useComponentBuilderContext } from "../../../context";
import { ErrorBoundary, generatePreview, transformCode } from "./utils";

const PreviewErrorDisplay = ({ error }: { error: string }) => (
  <div className="p-4 bg-crimson-a3 text-crimson-10 rounded-md">
    <Text size="2" weight="medium">
      Preview Error
    </Text>
    <pre className="mt-2 text-sm whitespace-pre-wrap">{error}</pre>
  </div>
);

export const Preview = () => {
  const {
    componentCode,
    isAIGenerating,
    styleValue,
    componentProps,
    themeValue,
  } = useComponentBuilderContext();
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [transformedCode, setTransformedCode] = useState<string | null>(null);

  useEffect(() => {
    async function importAndRunSwcOnMount() {
      await initSwc();
      setInitialized(true);
    }
    importAndRunSwcOnMount();
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    try {
      const { code: transformedCode } = transformCode(componentCode);
      setTransformedCode(transformedCode);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(String(e));
      }
    }
  }, [componentCode, initialized]);

  const renderPreview = useCallback(() => {
    if (!initialized) {
      return <Text>Loading preview...</Text>;
    }

    if (error) {
      return <PreviewErrorDisplay error={error} />;
    }

    if (isAIGenerating) {
      return <Text>Generating preview...</Text>;
    }

    const PreviewComponent = transformedCode
      ? generatePreview(transformedCode)
      : null;

    if (!PreviewComponent) {
      return <Text>No preview available</Text>;
    }

    return (
      <ErrorBoundary
        fallback={(error) => <PreviewErrorDisplay error={error.message} />}
      >
        <PreviewComponent style={styleValue || {}} {...componentProps} />
      </ErrorBoundary>
    );
  }, [
    initialized,
    error,
    isAIGenerating,
    transformedCode,
    styleValue,
    componentProps,
  ]);

  return (
    <div className="w-full h-full min-h-full">
      <ThemeProvider
        style={{
          width: "100%",
          height: "100%",
        }}
        {...themeValue}
      >
        <div className="p-4 flex justify-center items-center h-full w-full">
          {renderPreview()}
        </div>
      </ThemeProvider>
    </div>
  );
};
