'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from './components/Navigation';
import StatisticsCard from './components/StatisticsCard';
import DateInput from './components/DateInput';

export default function Page() {
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!startDate || !endDate || start > end) {
      setMessage(
        '❌ The end date must be later than the start date. Please select a valid date range.'
      );
      setIsCalculated(false);
      return;
    }

    const timeDiff = end.getTime() - start.getTime();
    const totalDaysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const years = Math.floor(totalDaysDiff / 365);
    const months = Math.floor((totalDaysDiff % 365) / 30);
    const days = totalDaysDiff % 30;

    let messageParts = [];

    if (years > 0) {
      messageParts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    }
    if (months > 0) {
      messageParts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
    }
    if (days > 0) {
      messageParts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
    }

    setMessage(
      `⚠️ Notice of delay letter to be sent within ${messageParts.join(', ')}.`
    );
    setIsCalculated(true);
  };

  const handleViewTimeline = () => {
    router.push(`/gantt?startDate=${startDate}&endDate=${endDate}`);
  };

  return (
    <main className="font-ftsystem flex-col box-content items-left justify-top">
      <Navigation />

      <div className="p-8">
        <h1
          className="font-bold text-balance text-black tracking-tight mb-6 sm:text-3xl md:text-3xl lg:text-3xl m-4"
          style={{ color: '#352e9d' }}
        >
          Projects Dashboard
        </h1>

        <section
          className="p-8 pb-8 bg-white m-4 border shadow-sm rounded-2xl"
          aria-labelledby="statistics-heading"
        >
          <h2 id="statistics-heading" className="text-xl font-bold mb-4">
            Statistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <StatisticsCard
              title="Total Revenue"
              value="$891,113,245"
              bgColor="bg-blue-100"
              textColor="text-blue-800"
            />
            <StatisticsCard
              title="Percentage of Projects Delayed"
              value="🔺14%"
              bgColor="bg-green-100"
              textColor="text-green-800"
            />
            <StatisticsCard
              title="Late Penalties (liquidated damages)"
              value="$12,345"
              bgColor="bg-yellow-100"
              textColor="text-yellow-800"
            />
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="bg-white border p-4 pt-6 m-4 rounded-2xl shadow-sm"
          aria-labelledby="delay-calculation-heading"
        >
          <div className="mb-8 mt-4 ml-4">
            <h2
              id="delay-calculation-heading"
              className="text-xl font-bold mb-8"
            >
              Calculate Project Delay
            </h2>
            <div className="flex flex-wrap space-x-4 mb-4 mt-4">


              <div className="flex-initial w-full md:w-1/3 mb-4 mt-4">
                <label htmlFor="project" className="block mb-2 text-sm font-semibold">
                  Project
                </label>
                <select
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  id="project"
                  required
                >
                  <option value="Construction">Construction Stadium</option>
                </select>
              </div>

              <div className="flex-initial w-full md:w-1/3 mb-4 mt-4">
                <label htmlFor="subproject" className="block mb-2 text-sm font-semibold">
                  Sub Project
                </label>
                <select
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  id="subproject"
                  required
                >
                  <option value="Execution">Execution</option>
                </select>
              </div>
            </div>
            <div className="flex-initial w-full mb-8 mt-4 ">
              <label htmlFor="task" className="block mb-2 text-sm font-semibold">
                Task
              </label>
              <select
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                id="task"
                required
              >
                <option value="Signoff">Sign off</option>
              </select>
            </div>



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

          <div className="flex space-x-4 mt-10 mb-12 ml-4">
            <button
              type="submit"
              className="p-3 px-6 bg-indigo-600 text-md font-semibold text-white rounded-md shadow-sm hover:ring hover:ring-indigo-600 hover:ring-2 hover:ring-offset-4 hover:ring-offset-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Calculate Delay"
            >
              Calculate Delay
            </button>
            <button
              type="button"
              onClick={() => {
                setStartDate('');
                setEndDate('');
                setMessage('');
                setIsCalculated(false);
              }}
              className="p-3 px-6 bg-gray-50 text-md font-semibold text-gray rounded-md shadow-sm hover:ring hover:ring-gray-300 hover:ring-2 hover:ring-offset-4 hover:ring-offset-gray-50 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              aria-label="Clear Dates"
            >
              Clear Dates
            </button>
          </div>

          {message && (
            <div
              className={`flex space-x-4 mt-10 mb-12 ml-4 mr-4 justify-between ${isCalculated
                ? 'p-4 text-gray-900 bg-indigo-50'
                : 'p-0 w-3/4 text-red-600'
                } rounded-xl`}
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
                  <span aria-hidden="true">✦</span> View Updated Project Timeline
                </button>
              )}
            </div>
          )}
        </form>

      </div>
    </main>
  );
}
