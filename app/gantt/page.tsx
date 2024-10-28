'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Gantt from 'react-gantt-antd';
import 'react-gantt-antd/lib/css/style.css';
import Navigation from '../components/Navigation';

export default function GanttPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const start = startDate ? new Date(startDate) : new Date('2024-10-01');
  const end = endDate ? new Date(endDate) : new Date('2024-12-15');

  const projects = [
    {
      id: 'project1',
      title: 'Initiation',
      tasks: [
        {
          id: 'title1',
          name: 'Initiation',
          title: 'Initiate',
          start: new Date('2024-10-01'),
          end: new Date('2024-10-11'),
        },
      ],
      isOpen: false,
    },
    {
      id: 'project3',
      title: 'Planning & Design',
      tasks: [
        {
          id: 'title2',
          name: 'Planning',
          title: 'Planning & Execution',
          start: new Date('2024-10-11'),
          end: new Date('2024-12-01'),
        },
      ],
      isOpen: false,
    },
    {
      id: 'project4',
      title: 'Execution',
      tasks: [
        {
          id: 'title3',
          title: 'Wiring',
          start: new Date('2024-10-26'),
          end: new Date('2024-12-15'),
        },
      ],
      projects: [
        {
          id: 'sub_project1',
          title: 'Installation',
          tasks: [
            {
              id: 'title5',
              title: 'Completion',
              start,
              end,
            },
          ],
        },
        {
          id: 'sub_project2',
          title: 'Signoff',
          tasks: [
            {
              id: 'title4',
              title: 'Send Notice of Delay',
              start,
              end,
            },
          ],
        },
      ],
      isOpen: true,
    },
  ];

  return (
    <div className="flex flex-col items-left justify-center bg-gray-100">
      <Navigation />

      <div className="p-8">
        <div
          className="flex flex-col box-content items-left justify-center p-4 m-4 rounded-2xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            minHeight: '120px',
          }}
          role="banner"
        >
          <h1 className="text-4xl font-semibold text-balance tracking-tight sm:text-4xl m-4 text-white">
            Project Timeline
          </h1>
        </div>

        <div
          className="bg-white p-4 pt-8 m-4 rounded shadow-md shadow-sm rounded-2xl"
          style={{ height: '100vh' }}
          role="main"
          aria-label="Gantt Chart Timeline"
        >
          <Gantt
            start={new Date('2024-10-01')}
            end={new Date('2026-10-01')}
            now={new Date('2024-10-26')}
            zoom={2}
            sideWidth={300}
            projects={projects}
            scrollToNow
          />
        </div>
      </div>
    </div>
  );
}
