import { useFlowContext } from "@/context";
import { AIChat } from "@v1/ai/ai-chat";
import type { ComponentData, PropSchema } from "../types";
interface ComponentBuilderAIChatProps {
  setNewComponentData?: React.Dispatch<React.SetStateAction<ComponentData>>;
}

interface ComponentMetadata {
  name: string;
  description: string;
  keywords: string[];
  props: PropSchema[];
}

export const ComponentBuilderAIChat = ({
  setNewComponentData,
}: ComponentBuilderAIChatProps) => {
  const { user } = useFlowContext();

  const handleMessage = (message: string) => {
    try {
      // Extract component metadata
      const metadataMatch = message.match(/```json\n([\s\S]*?)```/);
      if (metadataMatch?.[1]) {
        const metadata: ComponentMetadata = JSON.parse(metadataMatch[1]);
        setNewComponentData?.((prev) => ({
          ...prev,
          name: metadata.name,
          description: metadata.description,
          keywords: metadata.keywords,
          props: metadata.props,
        }));
      }

      // Extract component code
      const codeBlockMatch = message.match(/```tsx\n([\s\S]*?)```/);
      if (codeBlockMatch?.[1]) {
        const componentCode = codeBlockMatch[1].trim();
        setNewComponentData?.((prev) => ({
          ...prev,
          code: componentCode,
        }));
      }
    } catch (error) {
      console.error("Error processing AI message:", error);
    }
  };

  return (
    <div className="relative h-full w-full bg-gray-a1">
      <AIChat
        userAvatar={user?.avatar_url ?? undefined}
        title="Component Assistant"
        placeholder="Describe the component you want to create..."
        onMessageComplete={handleMessage}
        onError={(error) => {
          console.error("Chat error:", error);
        }}
      />
    </div>
  );
};
