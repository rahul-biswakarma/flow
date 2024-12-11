import { useAIChat } from "@/ai";
import { Button } from "@v1/ui/button";
import { Dialog } from "@v1/ui/dialog";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { RichTextEditor } from "@v1/ui/rte";
import { useEffect, useRef, useState } from "react";

export const CodeReviewDialog = ({
  children,
  createHandler,
  componentCode,
}: {
  children: React.ReactNode;
  createHandler: () => void;
  componentCode: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (isModalOpen) {
    return (
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        createHandler={createHandler}
        componentCode={componentCode}
      >
        {children}
      </Modal>
    );
  }
  return <div onClick={() => setIsModalOpen(true)}>{children}</div>;
};

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  componentCode,
  createHandler,
  children,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  children: React.ReactNode;
  componentCode: string;
  createHandler: () => void;
}) => {
  // 0: don't show, 1: show publish button, 2: show ignore and acknowledge buttons
  const [showActionItem, setShowActionItem] = useState<0 | 1 | 2>(0);
  const contentRef = useRef<string>("");

  const { submitMessage, messages, isLoading } = useAIChat({
    api: "/api/ai/rv",
    onFinish: () => {
      const response = contentRef.current;
      if (response?.includes("data-good-job")) {
        setShowActionItem(1);
      } else {
        setShowActionItem(2);
      }
    },
  });

  useEffect(() => {
    contentRef.current = messages[1]?.content.trim() ?? "";
  }, [messages]);

  const reviewMessage = messages[1]?.content.trim();

  const onClose = () => {
    setIsModalOpen(false);
    setShowActionItem(0);
  };

  return (
    <Dialog.Root open={isModalOpen}>
      <Dialog.Trigger onClick={() => setIsModalOpen(true)}>
        {children}
      </Dialog.Trigger>
      <Dialog.Content
        className="p-0 rounded-sm"
        size="2"
        maxWidth="700px"
        minHeight="200px"
      >
        <Dialog.Title
          className="flex gap-1.5 items-center relative p-4 pt-5 border-b border-gray-6 font-medium text-[16px] mb-0"
          as="h6"
        >
          <Icons.GitMerge className="!w-[25px] !h-[25px] !text-purple-10" />{" "}
          Code Review
          <Dialog.Close className="absolute top-6 right-4">
            <IconButton onClick={onClose} color="gray" variant="ghost">
              <Icons.X />
            </IconButton>
          </Dialog.Close>
        </Dialog.Title>
        <div className="relative h-full justify-between gap-4 min-h-[300px]">
          <RichTextEditor
            readOnly
            content={
              reviewMessage ??
              "We will review your code to ensure it meets the required guidelines. Please click on the button below to start the review."
            }
          />
        </div>
        <div className="flex gap-4 p-4 justify-end items-center border-t border-gray-6">
          {showActionItem === 2 && (
            <>
              <Button
                onClick={async () => {
                  onClose();
                  await createHandler();
                }}
                variant="ghost"
                color="crimson"
              >
                <Icons.MoodWrr /> Ignore, Go ahead
              </Button>
              <Button onClick={() => setIsModalOpen(false)} variant="surface">
                <Icons.ThumbsUp /> I'll address them
              </Button>
            </>
          )}
          {showActionItem === 1 && (
            <Button
              onClick={() => {
                onClose();
                createHandler();
              }}
              variant="surface"
            >
              <Icons.Award />
              Publish
            </Button>
          )}
          {showActionItem === 0 && (
            <Button
              onClick={() => {
                submitMessage(componentCode);
              }}
              loading={isLoading}
              variant="surface"
              color="grass"
            >
              <Icons.EyeCode />
              Begin Review
            </Button>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
