import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '@/src/app/layout';
import '@testing-library/jest-dom';

jest.mock('geist/font/sans', () => ({
  GeistSans: {
    className: 'geist-sans-class'
  }
}));

jest.mock('@/src/css/satoshi.css', () => {});
jest.mock('@/src/css/style.css', () => {});

describe('RootLayout', () => {
  it('renders the RootLayout component with children', () => {
    const childText = 'Test Child';
    render(
      <RootLayout>
        <div>{childText}</div>
      </RootLayout>
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('sets the metadata correctly', () => {
    const defaultUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    expect(metadata.metadataBase).toEqual(new URL(defaultUrl));
    expect(metadata.title).toBe('Next.js and Supabase Starter Kit');
    expect(metadata.description).toBe('The fastest way to build apps with Next.js and Supabase');
  });
});
