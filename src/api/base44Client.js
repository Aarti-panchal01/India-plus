import { createClient } from '@base44/sdk'

// Safe client for public app (no login required)
export const base44 = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID || "68fcc10f7e6383fe08f62887",
  requiresAuth: false, // ❌ Disable auth for public dashboard
})
