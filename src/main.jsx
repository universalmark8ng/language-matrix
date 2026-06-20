import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MatrixProvider } from './context/MatrixContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MatrixProvider>
      <App />
    </MatrixProvider>
  </React.StrictMode>,
)
