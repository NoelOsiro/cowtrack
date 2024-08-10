
import { render, screen  } from '@testing-library/react';
import CountPage from '@/src/app/count/page';
import '@testing-library/jest-dom';


// Mock the imported components
jest.mock('@/src/components/Layouts/DefaultLayout', () => ({ children }) => <div data-testid="default-layout">{children}</div>);
jest.mock('@/src/components/Breadcrumbs/Breadcrumb', () => ({ pageName }) => <div data-testid="breadcrumb">{pageName}</div>);
jest.mock('@/src/components/Cards/CardDataStats', () => ({ title, total, rate, levelUp, children }) => (
  <div data-testid="card-data-stats">
    <div>{title}</div>
    <div>{total}</div>
    <div>{rate}</div>
    <div>{levelUp && 'Level Up'}</div>
    <div>{children}</div>
  </div>
));
jest.mock('@/src/components/Cards/CountCard', () => () => <div data-testid="count-card">Count Card</div>);

describe('CountPage', () => {
  it('renders the CountPage component with all elements', async () => {
    render(<CountPage />);
    // Check if DefaultLayout is rendered
    expect(screen.getByTestId('default-layout')).toBeInTheDocument();
    // Check if Breadcrumb is rendered with the correct pageName
    expect(screen.getByTestId('breadcrumb')).toHaveTextContent('Count');
    // Check if CardDataStats is rendered with the correct props
    const cardDataStats = screen.getByTestId('card-data-stats');
    expect(cardDataStats).toBeInTheDocument();
    expect(cardDataStats).toHaveTextContent('Total count');
    expect(cardDataStats).toHaveTextContent('2623');
    expect(cardDataStats).toHaveTextContent('0.43%');
    expect(cardDataStats).toHaveTextContent('Level Up');
    // Check if EyeSvg is rendered inside CardDataStats
    const eyeSvg = cardDataStats.querySelector('svg');
    expect(eyeSvg).toBeInTheDocument();
    // Check if CountCard is rendered
    expect(screen.getByTestId('count-card')).toBeInTheDocument();
  });
});
