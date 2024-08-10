import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '@/src/components/Breadcrumbs/Breadcrumb';

describe('Breadcrumb', () => {
  it('renders the page name correctly', () => {
    const pageName = 'Settings';

    render(<Breadcrumb pageName={pageName} />);

    // Check if the page name is rendered in the heading
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(pageName);
  });

  it('renders the dashboard link correctly', () => {
    render(<Breadcrumb pageName="Settings" />);

    // Check if the dashboard link is rendered
    const dashboardLink = screen.getByRole('link', { name: /Dashboard /  });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/');
  });

  it('renders the breadcrumb navigation correctly', () => {
    const pageName = 'Settings';

    render(<Breadcrumb pageName={pageName} />);

    // Check if the breadcrumb navigation contains the correct items
    const breadcrumbItems = screen.getAllByRole('listitem');
    expect(breadcrumbItems).toHaveLength(2); // There should be two items: Dashboard and the current page

    const dashboardItem = screen.getByText('Dashboard /');
    expect(dashboardItem).toBeInTheDocument();

    expect(breadcrumbItems[1]).toBeInTheDocument();
  });

  it('applies the correct styles', () => {
    const pageName = 'Settings';

    render(<Breadcrumb pageName={pageName} />);

    // Check if the heading has the correct styles
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-title-md2', 'font-semibold', 'text-black', 'dark:text-white');

    // Check if the links have the correct styles
    const dashboardLink = screen.getAllByRole('link', { name: /Dashboard / });
    expect(dashboardLink[0]).toHaveClass('font-medium');

    const currentPage = screen.getAllByText(pageName);
    expect(currentPage[1]).toHaveClass('font-medium');
  });
});
