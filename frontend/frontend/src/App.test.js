import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header correctly', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/EduHash/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
