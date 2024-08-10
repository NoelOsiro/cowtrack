import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountCard from '@/src/components/Cards/CountCard';
import '@testing-library/jest-dom';

describe('CountCard', () => {
  it('renders the CountCard component', () => {
    render(<CountCard />);
    
    // Check if the image is rendered
    const image = screen.getByAltText('launch');
    expect(image).toBeInTheDocument();
    
    // Check if the text "Start Count" is present
    const text = screen.getByText('Start Count');
    expect(text).toBeInTheDocument();
  });

  it('has the correct classes applied', () => {
    render(<CountCard />);
    
    // Check if the top-level div has the correct classes
    const topLevelDiv = screen.getByTestId('count-card');
    expect(topLevelDiv).toHaveClass('rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark');
    
    // Check if the image container div has the correct classes
    const imageContainerDiv = screen.getByAltText('launch').closest('div');
    expect(imageContainerDiv).toHaveClass('relative flex h-22.5 w-22.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 m-auto');
  });

  it('is clickable', () => {
    console.log = jest.fn(); // Mock console.log
    render(<CountCard />);
    
    // Simulate a click event
    const card = screen.getByTestId('count-card');
    fireEvent.click(card);

    // Check if the console.log was called
    expect(console.log).toHaveBeenCalledWith("Clicked on CountCard");
  });
});
