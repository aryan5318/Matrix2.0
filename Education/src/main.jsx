import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from './index.jsx'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline>
      
    <Index />
    
    </CssBaseline>
  </StrictMode>,
  
)
