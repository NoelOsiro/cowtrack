import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInForm from '@/src/components/Forms/SignInForm';
import useSignInFormik from '@/src/hooks/useSignInFormik';

// Mocking the child components
jest.mock('@/src/components/FormElements/FormContainer', () => ({ children }) => <div data-testid="FormContainer">{children}</div>);
jest.mock('@/src/components/FormElements/Inputs/Input', () => ({ type, name, placeholder, value, onChange, onBlur, error, touched }) => (
  <div data-testid="InputField">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
    {touched && error && <span>{error}</span>}
  </div>
));
jest.mock('@/src/components/FormElements/Inputs/PasswordInput', () => ({ name, placeholder, value, onChange, onBlur, error, touched }) => (
  <div data-testid="PasswordInputField">
    <input
      type="password"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
    {touched && error && <span>{error}</span>}
  </div>
));
jest.mock('@/src/components/FormElements/Buttons/Submit', () => ({ text }) => <button data-testid="SubmitButton">{text}</button>);

jest.mock('@/src/hooks/useSignInFormik');

describe('SignInForm', () => {
  let formik;

  beforeEach(() => {
    formik = {
      values: { email: '', password: '' },
      errors: { email: '', password: '' },
      touched: { email: false, password: false },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      handleSubmit: jest.fn((e) => e.preventDefault())
    };

    useSignInFormik.mockReturnValue(formik);
  });

  it('renders SignInForm component correctly', () => {
    render(<SignInForm />);

    expect(screen.getByTestId('FormContainer')).toBeInTheDocument();
    expect(screen.getByTestId('InputField')).toBeInTheDocument();
    expect(screen.getByTestId('PasswordInputField')).toBeInTheDocument();
    expect(screen.getByTestId('SubmitButton')).toBeInTheDocument();
  });

  it('calls formik handleChange when input value changes', () => {
    render(<SignInForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('6+ Characters, 1 Capital letter'), { target: { value: 'Password1' } });

    expect(formik.handleChange).toHaveBeenCalledTimes(2);
  });

  it('calls formik handleBlur when input loses focus', () => {
    render(<SignInForm />);

    fireEvent.blur(screen.getByPlaceholderText('Enter your email'));
    fireEvent.blur(screen.getByPlaceholderText('6+ Characters, 1 Capital letter'));

    expect(formik.handleBlur).toHaveBeenCalledTimes(2);
  });

  it('calls formik handleSubmit when form is submitted', () => {
    render(<SignInForm />);

    fireEvent.submit(screen.getByTestId('FormContainer').querySelector('form'));

    expect(formik.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('displays validation errors when touched and error are true', () => {
    formik.errors.email = 'Invalid email address';
    formik.errors.password = 'Password too short';
    formik.touched.email = true;
    formik.touched.password = true;

    render(<SignInForm />);

    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('Password too short')).toBeInTheDocument();
  });

  it('does not display validation errors when touched is false', () => {
    formik.errors.email = 'Invalid email address';
    formik.errors.password = 'Password too short';
    formik.touched.email = false;
    formik.touched.password = false;

    render(<SignInForm />);

    expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
    expect(screen.queryByText('Password too short')).not.toBeInTheDocument();
  });
});
