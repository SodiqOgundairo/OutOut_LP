import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
// import { Route, BrowserRouter as Router } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom"

// import './index.css'
import "./assets/css/index.css"
import "./assets/css/style.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <Router>
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </Router>
)
