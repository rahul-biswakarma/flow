import { Text } from "@ren/ui/components";
import initSwc from "@swc/wasm-web";
import { useEffect, useState } from "react";
import { useComponentBuilderContext } from "../../../context";
import { generatePreview, transformCode } from "./utils";

const PreviewErrorDisplay = ({ error }: { error: string }) => (
  <div className="p-4 bg-crimson-a3 text-crimson-10 rounded-md">
    <Text size="2" weight="medium">
      Preview Error
    </Text>
    <pre className="mt-2 text-sm whitespace-pre-wrap">{error}</pre>
  </div>
);

export const Preview = () => {
  const { componentCode, isAIGenerating } = useComponentBuilderContext();
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

  if (!initialized) {
    return <Text>Loading preview...</Text>;
  }

  const PreviewComponent = transformedCode
    ? generatePreview(transformedCode)
    : null;

  return (
    <div className="p-4">
      {error ? (
        <PreviewErrorDisplay error={error} />
      ) : isAIGenerating ? (
        <Text>Generating preview...</Text>
      ) : PreviewComponent ? (
        <PreviewComponent />
      ) : (
        <Text>No preview available</Text>
      )}
    </div>
  );
};
