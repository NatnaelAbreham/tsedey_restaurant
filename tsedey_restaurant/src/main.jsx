import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AddMenu from './menu/AddMenu.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddMenu />
  </StrictMode>,
)
