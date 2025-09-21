import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { trackWebVitals } from './utils/analytics'

// Initialize Web Vitals tracking
trackWebVitals();

createRoot(document.getElementById("root")!).render(<App />);
