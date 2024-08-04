import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from '@/src/components/FormElements/Inputs/Input';

describe('InputField', () => {
  const defaultProps = {
    type: 'text',
    name: 'email',
    placeholder: 'Enter your email',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('renders the input field with the correct label', () => {
    render(<InputField {...defaultProps} />);

    // Check if the label is rendered
    const label = screen.getByTestId('input-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Email');

    // Check if the input field is rendered
    const input = screen.getByTestId('input-field');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter your email');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('calls onChange when the input value changes', () => {
    render(<InputField {...defaultProps} />);

    const input = screen.getByTestId('input-field');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('calls onBlur when the input loses focus', () => {
    render(<InputField {...defaultProps} />);

    const input = screen.getByTestId('input-field');
    fireEvent.blur(input);

    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it('displays error message when touched and error are true', () => {
    const propsWithError = {
      ...defaultProps,
      error: 'Invalid email address',
      touched: true,
    };

    render(<InputField {...propsWithError} />);

    const errorMessage = screen.getByText('Invalid email address');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-500');
  });

  it('does not display error message when touched is false', () => {
    const propsWithoutTouched = {
      ...defaultProps,
      error: 'Invalid email address',
      touched: false,
    };

    render(<InputField {...propsWithoutTouched} />);

    const errorMessage = screen.queryByText('Invalid email address');
    expect(errorMessage).not.toBeInTheDocument();
  });
});
