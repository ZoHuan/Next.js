"use client";

interface EditorModeSelectorProps {
  mode: "edit" | "preview" | "live";
  onModeChange: (mode: "edit" | "preview" | "live") => void;
}

export default function EditorModeSelector({ mode, onModeChange }: EditorModeSelectorProps) {
  const modes = [
    { key: "edit", label: "编辑", icon: "fa-edit" },
    { key: "preview", label: "预览", icon: "fa-eye" },
    { key: "live", label: "实时预览", icon: "fa-columns" },
  ] as const;

  return (
    <div className='flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-t-md border-b border-gray-200 dark:border-gray-700'>
      {modes.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onModeChange(key)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            mode === key ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <i className={`fa-solid ${icon} mr-1`}></i> {label}
        </button>
      ))}
    </div>
  );
}
