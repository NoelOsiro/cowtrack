import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DefaultLayout from '@/src/components/Layouts/DefaultLayout';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { createClient } from '@/src/utils/supabase/client';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/src/utils/supabase/client', () => ({
  createClient: jest.fn(),
}));

describe('DefaultLayout', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: mockPush,
    });

    createClient.mockReturnValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ user: null, error: null }),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the DefaultLayout component with children', () => {
    const childText = 'Test Child';
    render(
      <DefaultLayout>
        <div>{childText}</div>
      </DefaultLayout>
    );

    expect(screen.getByText(childText)).toBeInTheDocument();

    // Check if the main structure of DefaultLayout is rendered
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('redirects to sign-in if user is not authenticated', async () => {
    createClient.mockReturnValueOnce({
      auth: {
        getUser: jest.fn().mockResolvedValue({ error: 'User not authenticated' }),
      },
    });

    render(
      <DefaultLayout>
        <div>Test Child</div>
      </DefaultLayout>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/auth/signin');
    });
  });

  it('renders DefaultLayout component with no children', () => {
    render(<DefaultLayout />);

    // Check if the main structure of DefaultLayout is rendered
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders DefaultLayout component with multiple children', () => {
    const firstChildText = 'First Child';
    const secondChildText = 'Second Child';

    render(
      <DefaultLayout>
        <div>{firstChildText}</div>
        <div>{secondChildText}</div>
      </DefaultLayout>
    );

    // Check if both child texts are rendered within the DefaultLayout
    expect(screen.getByText(firstChildText)).toBeInTheDocument();
    expect(screen.getByText(secondChildText)).toBeInTheDocument();

    // Check if the main structure of DefaultLayout is rendered
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders DefaultLayout component with nested children', () => {
    const nestedChildText = 'Nested Child';

    render(
      <DefaultLayout>
        <div>
          <div>{nestedChildText}</div>
        </div>
      </DefaultLayout>
    );

    // Check if the nested child text is rendered within the DefaultLayout
    expect(screen.getByText(nestedChildText)).toBeInTheDocument();

    // Check if the main structure of DefaultLayout is rendered
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('applies the correct classes to the elements', () => {
    const { container } = render(
      <DefaultLayout>
        <div>Test Child</div>
      </DefaultLayout>
    );

    // Check if the top-level div has the correct classes
    const topLevelDiv = container.firstChild;
    expect(topLevelDiv).toHaveClass('flex');
  });
});
