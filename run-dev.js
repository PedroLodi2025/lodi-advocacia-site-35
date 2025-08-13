// Development server that only runs Vite client
import { createServer } from 'vite'

const server = await createServer({
  root: './client',
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
})

await server.listen()
console.log('Vite dev server running on http://localhost:3000')

// Keep process running
process.on('SIGINT', () => {
  server.close()
  process.exit()
})

process.on('SIGTERM', () => {
  server.close()
  process.exit()
})