import { RouterProvider } from 'react-router-dom';
import Route from '@/constant/router';
import { useEffect } from 'react';
import useAuthStore from './store/auth.store';

function App() {
  useEffect(() => {
    useAuthStore.getState().loadSession();
  }, []);
  return <RouterProvider router={Route} />;
}

export default App;
