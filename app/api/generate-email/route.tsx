import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { project, subProject, activity, startDate, endDate, daysDiff } = body;

    const prompt = `Generate a professional project delay notification email with the following details:
    - Project: ${project}
    - Sub-project: ${subProject}
    - Activity: ${activity}
    - Planned Start Date: ${startDate}
    - Actual Start Date: ${endDate}
    - Delay: ${daysDiff} days`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional project manager writing a delay notification email.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from OpenAI API:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate email from OpenAI API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json(
        { error: 'No email generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({ email: data.choices[0].message.content });
  } catch (error) {
    console.error('Error generating email:', error);
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}
