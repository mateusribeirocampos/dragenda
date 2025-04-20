import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Componente de rastreamento
const NavigationTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Exemplo: Log detalhado
    const trackingData = {
      path: location.pathname,
      searchParams: location.search,
      timestamp: new Date().toISOString()
    };
    
    console.log('Rastreamento de Navegação:', trackingData);
    
    // Performance
    const startTime = Date.now();
    return () => {
      const loadTime = Date.now() - startTime;
      console.log(`Tempo na página: ${loadTime}ms`);
    };
  }, [location]);

  return null;
};

export default NavigationTracker;