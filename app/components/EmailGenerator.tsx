import { useEffect, useState } from 'react';

interface EmailGeneratorProps {
  startDate: string;
  endDate: string;
  project: string;
  subProject: string;
  activity: string;
  onClose: () => void;
}

const emailTemplates = {
  default: (
    clientName: string,
    daysDiff: number,
    project: string,
    subProject: string,
    activity: string,
    startDate: string,
    endDate: string
  ) => `
    Subject: Project Delay Notification for ${project}

    Dear ${clientName},

    I hope this message finds you well.

    I am writing to inform you about a delay in the ${project}, specifically concerning the ${subProject} related to the activity of ${activity}. The details are as follows:

    - **Planned Start Date:** ${startDate}
    - **Actual Start Date:** ${endDate}
    - **Delay Duration:** ${daysDiff} days

    **Explanation of the Delay**
    The delay has been caused by [insert clear explanation of the reasons for the delay, e.g., unforeseen circumstances, supply chain issues, or resource availability]. We understand the importance of timely project delivery and sincerely apologize for this setback.

    **Impact Assessment**
    This delay will impact the overall project timeline in the following ways:
    - [Bullet point detailing specific impacts, e.g., delays in subsequent phases, potential cost implications, etc.]
    - [Another bullet point if necessary]

    **Mitigation Steps**
    To address this situation, we are implementing the following mitigation steps:
    - [Bullet point detailing the actions being taken, e.g., reallocating resources, increasing work hours, engaging additional contractors, etc.]
    - [Another bullet point if necessary]

    **Next Actions**
    We are committed to keeping you updated on our progress. The next steps include:
    - [Bullet point indicating what the client can expect next, e.g., regular updates, scheduled meetings, etc.]
    - [Another bullet point if necessary]

    Thank you for your understanding and support during this challenging time. Please feel free to reach out if you have any questions or require further clarification.

    Best regards,

    [Your Name]  
    Project Manager  
    [Your Company]  
    [Your Contact Information]
  `,
};

export default function EmailGenerator({
  startDate,
  endDate,
  project,
  subProject,
  activity,
  onClose,
}: EmailGeneratorProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const generateEmail = () => {
      setIsLoading(true);
      setError('');

      try {
        const timeDiff =
          new Date(endDate).getTime() - new Date(startDate).getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const clientName = '[Client Name]'; // Replace with actual client name logic

        // Generate the email content using the template
        const emailContent = emailTemplates.default(
          clientName,
          daysDiff,
          project,
          subProject,
          activity,
          startDate,
          endDate
        );

        setEmail(emailContent);
      } catch (error) {
        setError('Failed to generate email. Please try again.');
        setEmail('');
      } finally {
        setIsLoading(false);
      }
    };

    generateEmail();
  }, [startDate, endDate, project, subProject, activity]);

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
          <div className="text-red-600 p-4 rounded-lg bg-red-50">{error}</div>
        ) : (
          <>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap font-sans text-sm text-left">
                {email.replace(/\*\*(.*?)\*\*/g, '**$1**')}
              </pre>
            </div>
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
