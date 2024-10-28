'use client';

import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();

  return (
    <header role="banner">
      <nav
        className="bg-gradient-to-r from-gray-100 to-white-600 border"
        aria-label="Main navigation"
      >
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-left sm:items-stretch sm:justify-start">
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/')}
                  className="text-black-700 hover:bg-gray-200 rounded hover:text-black py-3 px-4 rounded-md text-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Go to Home"
                >
                  <span aria-hidden="true">🏠</span> Home
                </button>
                <button
                  onClick={() => router.push('/gantt')}
                  className="text-black-700 hover:bg-gray-200 rounded hover:text-black py-3 px-4 rounded-md text-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Go to Project Timeline"
                >
                  <span aria-hidden="true">📅</span> Project Timeline
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
