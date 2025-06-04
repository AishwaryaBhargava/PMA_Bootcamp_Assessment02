import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "/PMA_Bootcamp_Assessment02/",
  plugins: [react()],
})
