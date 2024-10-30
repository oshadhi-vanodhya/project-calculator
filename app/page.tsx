'use client';

// Importing necessary React hooks and components
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from './components/Navigation';
import StatisticsCard from './components/StatisticsCard';
import DateInput from './components/DateInput';
import CustomDropdown from './components/Customdropdown';


// Main function component for the page
export default function Page() {
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCalculated, setIsCalculated] = useState(false); // Tracks if delay has been calculated
  const [project, setProject] = useState('');
  const [subProject, setSubProject] = useState('');
  const [activity, setActivity] = useState('');

  const router = useRouter(); // Creating a router instance for navigation

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert string dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validation: Ensure start date is before end date
    if (!startDate || !endDate || start > end) {
      setMessage(
        '❌ The end date must be later than the start date. Please select a valid date range.'
      );
      setIsCalculated(false); // Reset calculation state
      return;
    }

    // Validation: Ensure all required fields are filled
    if (!project || !subProject || !activity) {
      setMessage('❌ Please fill out all required fields.');
      setIsCalculated(false); // Reset calculation state
      return;
    }

    // Calculate the difference between start and end dates
    const timeDiff = end.getTime() - start.getTime(); // Time difference in milliseconds
    const totalDaysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days

    // Break down the total days into years, months, and days
    const years = Math.floor(totalDaysDiff / 365);
    const months = Math.floor((totalDaysDiff % 365) / 30);
    const days = totalDaysDiff % 30;

    // Message to display the delay
    let messageParts = [];
    if (years > 0)
      messageParts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    if (months > 0)
      messageParts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
    if (days > 0) messageParts.push(`${days} ${days === 1 ? 'day' : 'days'}`);

    setMessage(
      `⚠️ Notice of delay letter to be sent within ${messageParts.join(', ')}.`
    );
    setIsCalculated(true);
  };

  // Function to navigate to the timeline page
  const handleViewTimeline = () => {
    router.push(`/gantt?startDate=${startDate}&endDate=${endDate}`);
  };

  // Handle dropdown selection changes
  const handleDropdownChange1 = (value: string) => setProject(value);
  const handleDropdownChange2 = (value: string) => setSubProject(value);
  const handleDropdownChange3 = (value: string) => setActivity(value);

  // Options for the dropdown menus
  const options1 = [
    'Construction Stadium',
    'Construction Studio',
    'Underground metro railway project',
  ];
  const options2 = ['Execution', 'Planning', 'Initiation'];
  const options3 = ['Sign-Off', 'Final Delivery'];

  return (
    <main className="font-ftsystem flex-col box-content items-left justify-top">
      <Navigation />
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
        {/* Main heading of the page */}
        <h1
          className="mb-6 m-4 text-3xl font-bold text-balance text-black tracking-tight md:text-2xl lg:text-3xl xl:text-3xl"
          style={{ color: '#190fac' }}
        >
          Projects Dashboard
        </h1>
        {/* Section for displaying statistics */}
        <section
          className="p-8 pb-8 bg-white m-4 border shadow-sm rounded-2xl"
          aria-labelledby="statistics-heading"
        >
          <h2
            id="statistics-heading"
            className="text-xl font-bold mb-8 xl:text-2xl"
          >
            Statistics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <StatisticsCard
              title="Total Revenue"
              value="$891.0M"
              bgColor="bg-blue-100"
              textColor="text-blue-800"
            />
            <StatisticsCard
              title="Percentage of Projects Delayed"
              value="🔺14%"
              bgColor="bg-green-100"
              textColor="text-green-700"
            />
            <StatisticsCard
              title="Late Penalties (liquidated damages)"
              value="$64.9M"
              bgColor="bg-yellow-100"
              textColor="text-yellow-600"
            />
          </div>
        </section>

        {/* Form for calculating project delay */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border p-4 pt-6 m-4 rounded-2xl shadow-sm"
          aria-labelledby="delay-calculation-heading"
        >
          <div className="mb-8 mt-4 ml-4">
            <h2
              id="delay-calculation-heading"
              className="text-xl font-bold mb-8 xl:text-2xl"
            >
              Update Project Details
            </h2>
            <div className="flex gap-4 mb-0 mt-4">
              <div className="w-full md:w-1/2">
                {/* Dropdowns for project, sub-project, and activity selection */}
                <CustomDropdown
                  label="Project"
                  options={options1}
                  onChange={handleDropdownChange1}
                  value={project}
                  required
                />
                <CustomDropdown
                  label="Sub Project"
                  options={options2}
                  onChange={handleDropdownChange2}
                  value={subProject}
                  required
                />
                <CustomDropdown
                  label="Activity"
                  options={options3}
                  onChange={handleDropdownChange3}
                  value={activity}
                  required
                />
              </div>
            </div>

            {/* Date input fields for start and end dates */}
            <DateInput
              id="start-date"
              label="Planned Start Date"
              value={startDate}
              onChange={setStartDate}
              required
            />
            <DateInput
              id="end-date"
              label="Actual Start Date"
              value={endDate}
              onChange={setEndDate}
              required
            />
          </div>

          {/* Buttons for submitting the form or clearing the input */}
          <div className="flex space-x-4 mt-10 mb-12 ml-4">
            <button
              type="submit"
              className="p-3 px-6 bg-indigo-600 text-md font-semibold text-white rounded-md shadow-sm hover:ring hover:ring-indigo-600 hover:ring-2 hover:ring-offset-4 hover:ring-offset-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Calculate Delay"
            >
              ⏰ Calculate Delay
            </button>
            <button
              type="button"
              onClick={() => {
                // Reset all fields to empty
                setStartDate('');
                setEndDate('');
                setMessage('');
                setIsCalculated(false);
                setProject('');
                setSubProject('');
                setActivity('');
              }}
              className="p-3 px-6 bg-gray-50 text-md font-semibold text-gray rounded-md shadow-sm hover:ring hover:ring-gray-300 hover:ring-2 hover:ring-offset-4 hover:ring-offset-gray-50 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              aria-label="Clear Form"
            >
              ✨ Clear
            </button>
          </div>

          {/* Display the result message after calculation */}
          {message && (
            <div
              className={`flex space-x-4 mt-10 mb-12 ml-4 mr-4 justify-between ${
                isCalculated
                  ? 'p-4 text-gray-900 bg-indigo-50'
                  : 'p-0 w-3/4 text-red-600'
              }`}
              role="alert"
              aria-live="polite"
            >
              <p className="text-lg font-semibold mt-3">{message}</p>
              {isCalculated && (
                <button
                  type="button"
                  onClick={handleViewTimeline}
                  className="p-3 px-6 bg-indigo-100 border border-solid border-indigo-300 text-md font-semibold text-blue-800 rounded-md leading-6 shadow-sm hover:bg-indigo-50 hover:ring hover:ring-indigo-600 hover:ring-3 hover:ring-offset-4 hover:ring-offset-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="View Updated Project Timeline"
                >
                  <span aria-hidden="true">✦</span> View Updated Project
                  Timeline
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
