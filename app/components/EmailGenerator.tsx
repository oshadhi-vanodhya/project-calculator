import { useEffect, useState } from 'react';
import './EmailGenerator.css'; // Adjust the path as necessary


interface EmailGeneratorProps {
  startDate: string;
  endDate: string;
  project: string;
  subProject: string;
  activity: string;
  clientName: string; // **New prop for client name**
  onClose: () => void;
}

export default function EmailGenerator({
  startDate,
  endDate,
  project,
  subProject,
  activity,
  clientName,
  onClose,
}: EmailGeneratorProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const generateEmail = async () => {
      setIsLoading(true);
      setError('');

      try {
        const timeDiff = new Date(endDate).getTime() - new Date(startDate).getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const response = await fetch('/api/generate-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ project, subProject, activity, startDate, endDate, daysDiff }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate email');
        }

        const data = await response.json();
        setEmail(data.email);
      } catch {
        setError('Failed to generate email. Please try again.');
        setEmail('');
      } finally {
        setIsLoading(false);
      }
    };

    generateEmail();
  }, [startDate, endDate, project, subProject, activity, clientName]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (

    <div
      className="fixed right-0 top-0 h-full w-1/3 bg-white border-l border-gray-200 shadow-lg p-4 overflow-y-auto"
      role="dialog"
      aria-labelledby="email-generator-title"
      aria-modal="true"
      tabIndex={0} // Make the div focusable
    >
      <header className="flex justify-between items-center mb-6 mt-4">
        <h2 id="email-generator-title" className="text-xl font-bold flex items-center gap-2 text-indigo-800 ml-4">
          <span>✨ AI Email Generator</span>
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close panel"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </header>

      <div className="mt-4 ml-4" aria-live="polite">
        {isLoading ? (
          <div className="flex items-center justify-center pt-8">
            <div className="gradient-spinner spin" aria-hidden="true"></div>
            <span className="text-md font-semibold ml-4">Generating email...</span>
          </div>
        ) : error ? (
          <div className="text-red-600 p-4 rounded-lg bg-red-50" role="alert">
            {error}
          </div>
        ) : (
          <>
            {email ? (
              <div className="bg-gray-100 p-6 text-black-800 rounded-lg">
                <pre className="whitespace-pre-wrap font-sans text-sm text-left">
                  {email}
                </pre>
              </div>
            ) : (
              <div>No email generated yet.</div>
            )}
            <button
              onClick={() => navigator.clipboard.writeText(email)}
              className="mt-4 w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              disabled={!email} // **Disable button if no email**
              aria-label="Copy email to clipboard"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy to Clipboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}
