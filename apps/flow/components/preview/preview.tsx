import { Text } from "@ren/ui/components";
import type { StyleData } from "@ren/ui/panels";
import { useCallback } from "react";
import type { PropSchema } from "../product/component-builder/types";
import { ErrorBoundary, generatePreview } from "./utils";

interface ComponentPreviewProps {
  componentCode: string;
  styleValue: StyleData;
  componentProps: PropSchema[];
}

const PreviewErrorDisplay = ({ error }: { error: string }) => (
  <div className="p-4 bg-crimson-a3 text-crimson-10 rounded-md">
    <Text size="2" weight="medium">
      Preview Error
    </Text>
    <pre className="mt-2 text-sm whitespace-pre-wrap">{error}</pre>
  </div>
);

export const ComponentPreview = ({
  componentCode,
  styleValue,
  componentProps,
}: ComponentPreviewProps) => {
  const renderPreview = useCallback(() => {
    const decodedComponentCode = Buffer.from(componentCode, "base64").toString(
      "utf8",
    );
    const PreviewComponent = decodedComponentCode
      ? generatePreview(decodedComponentCode)
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
  }, [componentCode, styleValue, componentProps]);

  return renderPreview();
};
