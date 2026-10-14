import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'staging') {
    const url = loadEnv(mode, process.cwd(), 'VITE_').VITE_API_URL?.trim()
    if (!url) throw new Error('Staging requires explicit VITE_API_URL; no production fallback is permitted.')
    let parsed: URL
    try {
      parsed = new URL(url)
    } catch {
      throw new Error('Staging requires a valid API URL; values omitted.')
    }
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname.replace(/\/$/, '') !== '/api') {
      throw new Error('Staging requires an HTTPS API base ending in /api; values omitted.')
    }
  }
  return { plugins: [react()] }
})
