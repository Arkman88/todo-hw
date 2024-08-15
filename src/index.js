import {createRoot} from 'react-dom/client';
import React from 'react';
import App from './components/app'

const root = document.getElementById('todoapp');

createRoot(root).render(
    <App />
)
