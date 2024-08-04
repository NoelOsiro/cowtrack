import { render, screen } from '@testing-library/react';
import AuthLayout from '@/src/components/Layouts/AuthLayout';
import '@testing-library/jest-dom';

describe('AuthLayout', () => {
  it('renders the AuthLayout component with children', () => {
    const childText = 'Test Child';
    render(
      <AuthLayout>
        <div>{childText}</div>
      </AuthLayout>
    );

    expect(screen.getByText(childText)).toBeInTheDocument();

    // Check if the main structure of AuthLayout is rendered
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  it('renders AuthLayout component with no children', () => {
    render(<AuthLayout />);

    // Check if the main structure of AuthLayout is rendered
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  it('renders AuthLayout component with multiple children', () => {
    const firstChildText = 'First Child';
    const secondChildText = 'Second Child';

    render(
      <AuthLayout>
        <div>{firstChildText}</div>
        <div>{secondChildText}</div>
      </AuthLayout>
    );

    // Check if both child texts are rendered within the AuthLayout
    expect(screen.getByText(firstChildText)).toBeInTheDocument();
    expect(screen.getByText(secondChildText)).toBeInTheDocument();

    // Check if the main structure of AuthLayout is rendered
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  it('renders AuthLayout component with nested children', () => {
    const nestedChildText = 'Nested Child';

    render(
      <AuthLayout>
        <div>
          <div>{nestedChildText}</div>
        </div>
      </AuthLayout>
    );

    // Check if the nested child text is rendered within the AuthLayout
    expect(screen.getByText(nestedChildText)).toBeInTheDocument();

    // Check if the main structure of AuthLayout is rendered
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  it('applies the correct classes to the elements', () => {
    render(
      <AuthLayout>
        <div>Test Child</div>
      </AuthLayout>
    );

    // Check if the top-level div has the correct classes
    const topLevelDiv = screen.getByRole('main').parentElement.parentElement;
    expect(topLevelDiv).toHaveClass('flex items-center justify-center min-h-screen');
  });

});
