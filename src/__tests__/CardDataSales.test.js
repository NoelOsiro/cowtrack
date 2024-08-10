import React from 'react';
import { render, screen } from '@testing-library/react';
import CardDataStats from '@/src/components/Cards/CardDataStats';
import '@testing-library/jest-dom';

describe('CardDataStats', () => {
  it('renders the CardDataStats component with given props', () => {
    render(
      <CardDataStats title="Sample Title" total="123" rate="5%" levelUp>
        <div>Icon</div>
      </CardDataStats>
    );

    // Check if the title is rendered
    expect(screen.getByText('Sample Title')).toBeInTheDocument();

    // Check if the total is rendered
    expect(screen.getByText('123')).toBeInTheDocument();

    // Check if the rate is rendered
    expect(screen.getByText('5%')).toBeInTheDocument();

    // Check if the child element is rendered
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('applies the correct classes for levelUp', () => {
    render(
      <CardDataStats title="Sample Title" total="123" rate="5%" levelUp>
        <div>Icon</div>
      </CardDataStats>
    );

    // Check if the rate span has the correct class for levelUp
    expect(screen.getByText('5%')).toHaveClass('text-meta-3');
  });

  it('applies the correct classes for levelDown', () => {
    render(
      <CardDataStats title="Sample Title" total="123" rate="5%" levelDown>
        <div>Icon</div>
      </CardDataStats>
    );

    // Check if the rate span has the correct class for levelDown
    expect(screen.getByText('5%')).toHaveClass('text-meta-5');
  });

  it('renders the levelUp SVG when levelUp is true', () => {
    render(
      <CardDataStats title="Sample Title" total="123" rate="5%" levelUp>
        <div>Icon</div>
      </CardDataStats>
    );

    // Check if the levelUp SVG is rendered
    expect(screen.getByTestId('level-up-svg')).toBeInTheDocument();
  });

  it('renders the levelDown SVG when levelDown is true', () => {
    render(
      <CardDataStats title="Sample Title" total="123" rate="5%" levelDown>
        <div>Icon</div>
      </CardDataStats>
    );

    // Check if the levelDown SVG is rendered
    expect(screen.getByTestId('level-down-svg')).toBeInTheDocument();
  });

  it('does not render SVG when neither levelUp nor levelDown are true', () => {
    render(
      <CardDataStats title="Sample Title" total="123" rate="5%">
        <div>Icon</div>
      </CardDataStats>
    );

    // Check that neither the levelUp nor levelDown SVGs are rendered
    expect(screen.queryByTestId('level-up-svg')).not.toBeInTheDocument();
    expect(screen.queryByTestId('level-down-svg')).not.toBeInTheDocument();
  });
});
