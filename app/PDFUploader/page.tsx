// PDFUploader.tsx

'use client';

import { useState } from 'react';

interface PDFUploaderProps {
  onDatesExtracted: (startDate: string, endDate: string) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onDatesExtracted }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      // Here you would integrate your AI service for date extraction
      // For example, using a hypothetical API call
      const response = await fetch('/api/extract-dates', {
        method: 'POST',
        body: file,
      });
      const data = await response.json();

      // Assuming the response contains startDate and endDate
      const { startDate, endDate } = data;
      onDatesExtracted(startDate, endDate);
    } catch (error) {
      setError('Failed to extract dates from the PDF.');
    }
  };

  return (
    <div className="mb-4">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="button"
        onClick={handleUpload}
        className="mt-2 p-2 bg-blue-600 text-white rounded"
        disabled={!file}
      >
        Upload PDF
      </button>
    </div>
  );
};

export default PDFUploader;
