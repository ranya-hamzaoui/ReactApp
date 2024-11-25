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
const router = createBrowserRouter(routes());
const root = ReactDOM.createRoot((document.getElementById('root')!));

root.render(
  <React.StrictMode>
   <Provider store={store}> 
   <PersistGate loading={"loading ...."} persistor={persistor}>

   <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} /> 
     <ToastContainer/>
    </QueryClientProvider>
    </PersistGate>
   </Provider> 
  </React.StrictMode>
);
