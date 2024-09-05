// src/screens/__tests__/DashboardScreen.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import DashboardScreen from '../DashboardScreen';

test('renders dashboard with animal count', () => {
  const { getByText } = render(<DashboardScreen />);
  expect(getByText('Farm Tracker Dashboard')).toBeTruthy();
  expect(getByText('Total Animals: 100')).toBeTruthy();
});
