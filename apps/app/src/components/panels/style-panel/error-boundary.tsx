import { Button } from "@v1/ui/button";
import { Text } from "@v1/ui/text";
import { toast } from "@v1/ui/toast";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  errorCount: number;
}

export class StylePanelErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorCount: 0,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true, errorCount: 0 };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState((prev) => ({
      errorCount: prev.errorCount + 1,
    }));

    if (this.state.errorCount >= 3) {
      toast.error("Need help? Ask our AI assistant!", {
        action: {
          label: "Open Chat",
          onClick: () => {
            // Trigger chat open
          },
        },
      });
    }

    this.props.onError?.(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <Text className="text-red-9">
            Something went wrong with the style panel.
          </Text>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
