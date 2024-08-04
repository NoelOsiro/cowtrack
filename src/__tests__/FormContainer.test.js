import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormContainer from '@/src/components/FormElements/FormContainer';
import { ToastContainer } from 'react-toastify';

describe('FormContainer', () => {
  it('renders FormContainer component with children', () => {
    const childText = 'This is a child component';

    render(
      <FormContainer>
        <div>{childText}</div>
      </FormContainer>
    );

    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('CowTrack')).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('renders ToastContainer component', () => {
    const { container } = render(
        <FormContainer>
          <div>Child</div>
        </FormContainer>
      );

    const formContainer = container.firstChild;
    const innerDiv = formContainer.firstChild;
    const toastDiv = innerDiv.firstChild;
    expect(toastDiv).toHaveClass('Toastify');

  });

  it('applies correct styles to the elements', () => {
    const { container } = render(
      <FormContainer>
        <div>Child</div>
      </FormContainer>
    );

    const formContainer = container.firstChild;
    expect(formContainer).toHaveClass('w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2');

    const innerDiv = formContainer.firstChild;
    expect(innerDiv).toHaveClass('w-full p-4 sm:p-12.5 xl:p-17.5');

    const loginText = screen.getByText('Log In');
    expect(loginText).toHaveClass('mb-1.5 block font-medium');

    const titleText = screen.getByText('CowTrack');
    expect(titleText).toHaveClass('mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2');
  });
});
