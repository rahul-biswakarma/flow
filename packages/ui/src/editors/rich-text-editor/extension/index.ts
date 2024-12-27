import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import {} from "react";
import { starterExtension } from "./starter-collection";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export const getRteExtensions = ({
  placeholder,
}: {
  placeholder?: string;
}) => {
  return [
    starterExtension,
    Highlight,
    Typography,
    CodeBlock,
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Code,
    Placeholder.configure({
      placeholder: placeholder ?? "How can I help you?",
    }),
  ];
};
