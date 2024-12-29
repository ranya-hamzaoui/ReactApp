import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import {routes} from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient();
const router = createBrowserRouter(routes(),{
  future: {
    v7_relativeSplatPath: true, // Enables relative paths in nested routes
    v7_fetcherPersist: true,   // Retains fetcher state during navigation
    v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
    v7_partialHydration: true, // Supports partial hydration for server-side rendering
    v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
  },
});
const root = ReactDOM.createRoot((document.getElementById('root')!));

root.render(
  <React.StrictMode>
   <Provider store={store}> 
   <PersistGate loading={"loading ...."} persistor={persistor}>

   <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} future={{ v7_startTransition: true }} /> 
     <ToastContainer/>
    </QueryClientProvider>
    </PersistGate>
   </Provider> 
  </React.StrictMode>
);
