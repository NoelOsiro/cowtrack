import { render, screen } from '@testing-library/react';
import SignIn from '@/src/app/login/page';
import '@testing-library/jest-dom';

// Mocking child components
jest.mock('@/src/components/Layouts/AuthLayout', () => ({ children }) => <div data-testid="AuthLayout">{children}</div>);
jest.mock('@/src/components/common/LogoSection', () => () => <div data-testid="LogoSection">LogoSection</div>);
jest.mock('@/src/components/Forms/SignInForm', () => () => <div data-testid="SignInForm">SignInForm</div>);

describe('SignIn', () => {
  it('renders SignIn component with AuthLayout, LogoSection, and SignInForm', () => {
    render(<SignIn />);

    // Check if AuthLayout is rendered
    expect(screen.getByTestId('AuthLayout')).toBeInTheDocument();

    // Check if LogoSection is rendered
    expect(screen.getByTestId('LogoSection')).toBeInTheDocument();
    expect(screen.getByText('LogoSection')).toBeInTheDocument();

    // Check if SignInForm is rendered
    expect(screen.getByTestId('SignInForm')).toBeInTheDocument();
    expect(screen.getByText('SignInForm')).toBeInTheDocument();
  });
});
