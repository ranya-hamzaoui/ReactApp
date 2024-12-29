import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { AxiosInstance } from '../lib/axios';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../redux/reducers/authReducer';
import { toast } from 'react-toastify';

jest.mock('../lib/axios');
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));
jest.mock('../redux/hooks', () => ({
  useAppDispatch: jest.fn(() => jest.fn()),
}));
jest.mock('../redux/reducers/authReducer', () => ({
  login: jest.fn(),
}));

// Utility function to render the component wrapped with router and redux provider
const renderWithProviders = () => {
  render(
    <Provider store={store}>
      <Router>
        <RegisterComponent />
      </Router>
    </Provider>
  );
};

describe('RegisterComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  test('renders Register form correctly', () => {
    renderWithProviders();
    expect(screen.getByText('Register Form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('form input values update correctly', async () => {
    renderWithProviders();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');

  });

  test.skip('submits the form successfully and navigates to login', async () => {
    const mockNavigate = jest.fn();

    // Mock the AxiosInstance.post to simulate a successful registration response
    (AxiosInstance.post as jest.Mock).mockResolvedValue({
      data: { message: 'Registration successful' },
    });

    renderWithProviders();

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Register/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login')); // Verify that the user is navigated to the login page
  });
});