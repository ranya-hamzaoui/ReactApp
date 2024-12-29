import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/ui/button';

// test('renders the Button with the correct label', () => {
//   const onClick = jest.fn();
//   render(<Button label="Click me" onClick={onClick} />);
//   const button = screen.getByText('Click me');
//   expect(button).toBeInTheDocument();
// });

test('fires the onClick function when clicked', () => {
  const onClick = jest.fn();
  render(<Button label="Click me" onClick={onClick} />);
  
  const button = screen.getByText('Click me');
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});