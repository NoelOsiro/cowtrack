import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import  SubmitButton  from '@/src/app/login/submit-button';
import { useFormStatus } from 'react-dom';

// Mock the useFormStatus hook
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn(),
}));

describe('SubmitButton', () => {
  const defaultProps = {
    children: 'Submit',
    pendingText: 'Submitting...',
    formAction: '/submit',
  };

  it('renders SubmitButton component with default text', () => {
    useFormStatus.mockReturnValue({ pending: false, action: null });

    render(<SubmitButton {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Submit');
    expect(button).not.toHaveAttribute('aria-disabled', 'true');
  });

  it('renders SubmitButton component with pending text when pending', () => {
    useFormStatus.mockReturnValue({ pending: true, action: '/submit' });

    render(<SubmitButton {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Submitting...');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders SubmitButton component with default text when action does not match', () => {
    useFormStatus.mockReturnValue({ pending: true, action: '/different-action' });

    render(<SubmitButton {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Submit');
    expect(button).not.toHaveAttribute('aria-disabled', 'false');
  });

  it('passes additional props to the button element', () => {
    useFormStatus.mockReturnValue({ pending: false, action: null });

    render(<SubmitButton {...defaultProps} className="custom-class" data-testid="submit-button" />);

    const button = screen.getByTestId('submit-button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
