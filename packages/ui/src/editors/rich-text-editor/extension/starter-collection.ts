import StarterKit from "@tiptap/starter-kit";

export const starterExtension = StarterKit.configure({
  bulletList: {
    keepMarks: true,
    keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
  },
  orderedList: {
    keepMarks: true,
    keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
  },
});
