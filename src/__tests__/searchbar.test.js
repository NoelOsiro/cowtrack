import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from "@/src/components//FormElements/SearchBar";

describe('SearchBar', () => {
    const mockOnSearchChange = jest.fn();
  
    it('renders the search bar with the correct initial value', () => {
      const searchQuery = 'Initial Query';
  
      render(<SearchBar searchQuery={searchQuery} onSearchChange={mockOnSearchChange} />);
  
      // Check if the search input is rendered with the correct value
      const searchInput = screen.getByPlaceholderText('Search by Name or Phone');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveValue(searchQuery);
    });
  
    it('renders the heading and label correctly', () => {
      render(<SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />);
  
      // Check if the heading is rendered
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Search');
  
      // Check if the label is rendered
      const label = screen.getByText('Search by Name or Phone');
      expect(label).toBeInTheDocument();
    });
  
    it('calls the onSearchChange function when the input value changes', () => {
      render(<SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />);
  
      // Check if the search input is rendered
      const searchInput = screen.getByPlaceholderText('Search by Name or Phone');
  
      // Simulate typing in the search input
      fireEvent.change(searchInput, { target: { value: 'New Query' } });
  
      // Check if the onSearchChange function is called with the correct value
      expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
      expect(mockOnSearchChange).toHaveBeenCalledWith('New Query');
    });
  
    it('applies the correct styles', () => {
        render(<SearchBar searchQuery="" onSearchChange={mockOnSearchChange} />);
    
        // Check if the container has the correct styles
        const container = screen.getByTestId('search-bar-container');
        expect(container).toHaveClass('rounded-sm', 'border', 'border-stroke', 'bg-white', 'shadow-default', 'dark:border-strokedark', 'dark:bg-boxdark', 'mb-6');
    
        // Check if the heading has the correct styles
        const heading = screen.getByRole('heading', { level: 3 });
        expect(heading).toHaveClass('font-medium', 'text-black', 'dark:text-white');
    
        // Check if the label has the correct styles
        const label = screen.getByText('Search by Name or Phone');
        expect(label).toHaveClass('mb-3', 'block', 'text-sm', 'font-medium', 'text-black', 'dark:text-white');
    
        // Check if the input has the correct styles
        const searchInput = screen.getByPlaceholderText('Search by Name or Phone');
        expect(searchInput).toHaveClass('w-full', 'rounded-lg', 'border-[1.5px]', 'border-stroke', 'bg-transparent', 'px-5', 'py-3', 'text-black', 'outline-none', 'transition', 'focus:border-primary', 'active:border-primary', 'disabled:cursor-default', 'disabled:bg-whiter', 'dark:border-form-strokedark', 'dark:bg-form-input', 'dark:text-white', 'dark:focus:border-primary');
      });
  });