import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Type,
  Code,
} from "lucide-react";
import { useEffect } from "react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 mb-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bold") ? "bg-blue-100 text-blue-600" : ""
        }`}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("italic") ? "bg-blue-100 text-blue-600" : ""
        }`}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("underline") ? "bg-blue-100 text-blue-600" : ""
        }`}
        title="Underline"
      >
        <Type size={18} className="underline" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bulletList") ? "bg-blue-100 text-blue-600" : ""
        }`}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("orderedList") ? "bg-blue-100 text-blue-600" : ""
        }`}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("blockquote") ? "bg-blue-100 text-blue-600" : ""
        }`}
        title="Blockquote"
      >
        <Quote size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("codeBlock") ? "bg-blue-100 text-blue-600" : ""
        }`}
        title="Code Block"
      >
        <Code size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={setLink}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("link") ? "bg-blue-100 text-blue-600" : ""
        }`}
        title="Link"
      >
        <LinkIcon size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 ml-auto" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-200"
        title="Undo"
      >
        <Undo size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-200"
        title="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function Editor({ data = "", onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
    ],
    content: data,
    onUpdate: ({ editor }) => {
      // Compatibility wrapper for the existing onChange signature
      onChange(null, { getData: () => editor.getHTML() });
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  // Keep editor content in sync with external data if it changes
  useEffect(() => {
    if (editor && data !== editor.getHTML()) {
      editor.commands.setContent(data);
    }
  }, [data, editor]);

  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:border-gray-400 transition-colors">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

