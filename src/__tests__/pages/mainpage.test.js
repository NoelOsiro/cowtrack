import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from '@/src/app/page';


describe('Index', () => {
  it('renders the component and checks Supabase connection', async () => {
        render(<Index />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
