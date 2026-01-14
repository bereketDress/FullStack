import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

//Main: Connects React app to the HTML page (the bridge between React and the browser)
//Render means = Convert React code (JSX) into actual HTML that appears on the screen

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
