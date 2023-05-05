import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toast, ToastContainer } from '@/components/Shared/Toast';
import { useToast } from '@/hooks/useToast';
import { router } from '@/routes';

const App = () => {
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    const handleAxiosError = (event: CustomEvent<string>) => {
      addToast(event.detail, 'error');
    };

    window.addEventListener('axiosError', handleAxiosError as EventListener);
    return () => {
      window.removeEventListener('axiosError', handleAxiosError as EventListener);
    };
  }, [addToast]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer>
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} duration={toast.duration} onClose={() => removeToast(toast.id)} />
        ))}
      </ToastContainer>
    </>
  );
};

export default App;
