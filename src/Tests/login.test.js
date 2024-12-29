import { render, screen, fireEvent,waitFor} from '@testing-library/react';
import LoginComponent from '../components/features/auth/LoginComponent';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../redux/reducers/authReducer';
import { Provider } from 'react-redux';
import { AxiosInstance } from '../lib/axios';
import { toast } from 'react-toastify';
import { store } from '../redux/store';

// Mock Axios et Toast
jest.mock('../lib/axios');
jest.mock('react-toastify');

const mockResponse = {
  data: {
    data: {
      user: { id: 1, name: 'John Doe' },
      token: 'mock-token',
      refreshToken: 'mock-refresh-token',
    },
  },
};
const mockErrResponse = new Error('Invalid credentials');
// Fonction utilitaire pour rendre le composant
const renderWithProviders = () => {
  return render(
    <Provider store={store}>
      <Router>
        <LoginComponent />
      </Router>
    </Provider>
  );
};
// Fonction utilitaire pour remplir et soumettre le formulaire
const submitForm = async (email, password) => {
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: email } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: password } });
  //Soumettre le formulaire
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  await waitFor(() => expect(AxiosInstance.post).toHaveBeenCalledTimes(1));
};
test('Render Login Component Correctly', () => {
  renderWithProviders();
  expect(screen.getByText('Login Form')).toBeInTheDocument();
  // Vérifier si les champs du formulaire sont affichés
  // expect(screen.get('Email')).toBeInTheDocument();
  // expect(screen.getByLabelText('password')).toBeInTheDocument();
  // Vérifiez si les champs 'email' et 'password' existent via leurs attributs 'name' ou 'placeholder'
  const emailInput = screen.getByPlaceholderText(/email/i); // Utilisation du placeholder pour trouver l'input
  const passwordInput = screen.getByPlaceholderText(/password/i); // Utilisation du placeholder pour trouver l'input
    // Vérifiez que les éléments existent dans le DOM
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  // Vérifier si le bouton de soumission est présent
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
test('Submits the form with valid credentials', async () => {
  AxiosInstance.post.mockResolvedValue(mockResponse);
  renderWithProviders();
  await submitForm('rania@gmail.com', 'correct');
  // Vérifier que la redirection a bien eu lieu (à simuler selon votre méthode de navigation)
  expect(window.location.pathname).toBe('/home'); // Remplacer avec la méthode réelle si besoin
});
test('Handles error on invalid credentials', async () => {
  renderWithProviders();
  AxiosInstance.post.mockRejectedValueOnce(mockErrResponse);
  await submitForm('rania@gmail.com', 'wrong-password');
  // Attendre que l'erreur soit traitée
  await waitFor(() => expect(toast.error).toHaveBeenCalledWith('inValid Credentials'));
  // Vérifier que le bouton a bien été réactivé après l'échec
  expect(screen.getByRole('button', { name: /login/i })).not.toBeDisabled();
});
test.skip('disables button and shows loading when submit', async () => {
  AxiosInstance.post.mockResolvedValue(mockResponse);
  renderWithProviders();
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'rania@gmail.com' } });
  fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'rania' } });
  const button = screen.getByRole('button', { name: /login/i });
  fireEvent.click(button);
  // Vérifier que le bouton est désactivé et affiche "loading"
  expect(button).toBeDisabled();
  expect(button).toHaveTextContent('...loading');
  // Attendre que la promesse soit résolue
  await waitFor(() => screen.findByText('...loading'));// On attend un changement dans le texte
});

