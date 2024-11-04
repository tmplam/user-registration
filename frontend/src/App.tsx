import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Home, Login, Profile, Register } from '@/pages';
import { DefaultLayout } from '@/layouts';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useUserStore } from '@/store';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  const { getAccessToken } = useUserStore();

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
