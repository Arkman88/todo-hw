import { createRoot } from 'react-dom/client'

import App from './components/app'

import './styles.css'

const root = document.getElementById('todoapp')

createRoot(root).render(<App />)
