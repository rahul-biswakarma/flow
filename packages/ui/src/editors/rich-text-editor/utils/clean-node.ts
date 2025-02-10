import type { RichTextEditor } from "../types";

export const cleanNodes = (editor: RichTextEditor) => {
  const doc = editor.state.doc;

  doc.descendants((node, pos) => {
    if (node.attrs.error) {
      const to = pos + node.nodeSize;

      editor.chain().focus().deleteRange({ from: pos, to }).run();
    }

    return true;
  });
};
