import { useEffect, useState } from 'react';

interface EmailGeneratorProps {
  startDate: string;
  endDate: string;
  project: string;
  subProject: string;
  activity: string;
  clientName: string; // New prop for client name
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

        const prompt = `Generate a professional project delay notification email with the following details:
          - Project: ${project}
          - Sub-project: ${subProject}
          - Activity: ${activity}
          - Planned Start Date: ${startDate}
          - Actual Start Date: ${endDate}
          - Delay: ${daysDiff} days

          The email should include:
          1. A professional greeting
          2. Clear explanation of the delay
          3. Impact assessment
          4. Mitigation steps
          5. Next actions
          6. Professional closing

          Format the email with proper spacing and bullet points.`;

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
        console.log('Generated Email:', data.email); // Log the email content
        setEmail(data.email);
        console.log('Email state:', email);

      } catch (error) {
        setError('Failed to generate email. Please try again.');
        setEmail('');

      } finally {
        setIsLoading(false);
      }
    };

    generateEmail();
  }, [startDate, endDate, project, subProject, activity, clientName]);

  return (
    <div className="fixed right-0 top-0 h-full w-1/3 bg-white border-l border-gray-200 shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>AI Email Generator</span>
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
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-2">Generating email...</span>
          </div>
        ) : error ? (
          <div className="text-red-600 p-4 rounded-lg bg-red-50">
            {error}
          </div>
        ) : (
          <>

            {email ? (
              <div className="bg-gray-50 p-4 rounded-lg">
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
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
