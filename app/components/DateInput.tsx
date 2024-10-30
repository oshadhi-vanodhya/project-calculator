interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function DateInput({
  id,
  label,
  value,
  onChange,
  required = false,
}: DateInputProps) {
  return (
    <div className="mb-8 mt-4 flex-auto">
      <label
        htmlFor={id}
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2.5">
        <input
          type="date"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block  flex-initial sm:w-screen md:w-1/2 lg:w-1/4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:border-indigo-500 transition duration-150 ease-in-out"
          required={required}
          aria-required={required}
          aria-label={label}
        />
      </div>

    </div>
  );
}
