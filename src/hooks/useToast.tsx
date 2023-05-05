import React, { createContext, ReactNode, useContext, useState } from 'react';

type ToastProps = {
  id: number;
  message: string;
  type: string;
  duration: number;
};

type ToastContextProps = {
  toasts: ToastProps[];
  addToast: (message: string, type: string, duration?: number) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

type ToastProviderProps = {
  children: ReactNode;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (message: string, type: string, duration = 3000) => {
    const id = Date.now();
    setToasts(prevToasts => [
      ...prevToasts,
      {
        id,
        message,
        type,
        duration,
      },
    ]);
  };

  const removeToast = (id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>;
};
