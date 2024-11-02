import { useState, useRef, useEffect } from 'react'; // Importing React hooks for managing state and effects

// Defining the properties that the CustomDropdown component will accept
interface CustomDropdownProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
  value: string;
  required?: boolean;
  placeholder?: string;
}

// Defining the CustomDropdown component using TypeScript
const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  onChange, // Function to call when an option is selected
  value, // The currently selected value
  required = true,
}) => {
  const [selected, setSelected] = useState<string | null>(value);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to toggle the dropdown open/close
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Function to handle when an option is clicked
  const handleOptionClick = (option: string) => {
    setSelected(option); // Set the selected option
    setIsOpen(false); // Close the dropdown
    onChange(option); // Call the onChange function with the selected option
  };

  // Handling keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // Enter or space key toggles the dropdown
      if (isOpen) {
        const selectedOption = options[focusedIndex]; // Get the currently focused option
        handleOptionClick(selectedOption); // Select it
      } else {
        toggleDropdown(); // Open the dropdown
      }
      event.preventDefault(); // Prevent default action
    }

    // If the dropdown is open, allow navigation with arrow keys
    if (isOpen) {
      const optionsCount = options.length; // Get the number of options

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setFocusedIndex((prevIndex) => (prevIndex + 1) % optionsCount); // Move focus down
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex(
          (prevIndex) => (prevIndex - 1 + optionsCount) % optionsCount
        ); // Move focus up
      } else if (event.key === 'Escape') {
        setIsOpen(false); // Close the dropdown
      }
    }
  };

  // Effect to close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  // Render the dropdown component
  return (
    <div className="relative mb-4 pb-4">
      {' '}
      {/* Container for the dropdown */}
      <label
        className={`block mb-2 text-sm font-semibold ${required ? '' : ''}`}
      >
        {label} {/* Display the label */}
        {required && ' '}
      </label>
      <div>
        <div
          className="flex justify-between w-full items-center p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          required={required}
          aria-required={required}
          role="button"
          aria-label={`Select ${label}`}
        >
          <span>{selected || 'Select an option'}</span>{' '}
          {/* Show selected option or placeholder */}
          {/* Dropdown icon */}
          <svg
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 10l5 5 5-5"
            />
          </svg>
        </div>
        {/* Render options when the dropdown is open */}
        {isOpen && (
          <div
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
            role="listbox"
            ref={dropdownRef}
            aria-label={`Options for ${label}`}
          >
            {options.map((option, index) => (
              <div
                key={option}
                className={`cursor-pointer p-4 ${focusedIndex === index
                    ? 'bg-gray-50 hover:font-semibold hover:bg-gray-50 hover:text-indigo-600'
                    : ''
                  }`}
                role="option"
                tabIndex={0}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => setFocusedIndex(index)}
                aria-selected={focusedIndex === index}
              >
                {option} {/* Display the option */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
