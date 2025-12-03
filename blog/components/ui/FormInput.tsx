interface FormInputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function FormInput({ label, type, name, placeholder, value, onChange, required = false, error, className = "" }: FormInputProps) {
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500 focus:ring-red-500 dark:border-red-400"
            : "border-gray-300 focus:ring-blue-500 dark:border-gray-700 dark:focus:ring-blue-400"
        } ${className}`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
      {error && <p className='mt-1 text-red-500 dark:text-red-400 text-xs'>{error}</p>}
    </div>
  );
}
