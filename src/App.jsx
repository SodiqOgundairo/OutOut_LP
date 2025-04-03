import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Privacy from "./pages/Privacy"

function App() {
  return (
    <>
      <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/" element={<Home />} />
        
      </Routes>
    </>
  )
}

export default App
