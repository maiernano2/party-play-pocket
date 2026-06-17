import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import App from './App.tsx'
import './index.css'
import { trackWebVitals } from './utils/analytics'

// Initialize PostHog (EU region)
posthog.init('phc_oursCES3rK6TsN2ibuj6BSZtGtzePrp3BkKLVUGaKSwm', {
  api_host: 'https://eu.i.posthog.com',
  defaults: '2025-05-24',
  person_profiles: 'identified_only',
})

// Initialize Web Vitals tracking
trackWebVitals();

createRoot(document.getElementById("root")!).render(<App />);
