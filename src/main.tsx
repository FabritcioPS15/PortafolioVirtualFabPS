import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import LoadingScreen from './components/LoadingScreen.tsx';
import './index.css';
import './i18n';

const RootComponent = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialProgress, setInitialProgress] = useState(0);
  const [isInitialExiting, setIsInitialExiting] = useState(false);

  useEffect(() => {
    // Simulate initial app loading
    const progressInterval = setInterval(() => {
      setInitialProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 85;
        }
        return prev + Math.random() * 12;
      });
    }, 80);

    // Complete initial loading
    const loadingTimeout = setTimeout(() => {
      setInitialProgress(100);
      
      // Start exit animation
      setTimeout(() => {
        setIsInitialExiting(true);
        
        // Hide loading screen after exit animation
        setTimeout(() => {
          setIsInitialLoading(false);
          setIsInitialExiting(false);
        }, 500); // Duration of improved exit animation
      }, 400);
    }, 1300);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimeout);
    };
  }, []);

  if (isInitialLoading) {
    return (
      <LoadingScreen 
        isLoading={true} 
        message="Iniciando portafolio..." 
        progress={initialProgress}
        isExiting={isInitialExiting}
      />
    );
  }

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<RootComponent />);
