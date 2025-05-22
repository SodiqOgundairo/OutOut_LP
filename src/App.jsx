import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Privacy from "./pages/Privacy"
import HomeNew from "./pages/HomeNew"
import Header from "./components/Header"

function App() {
  return (
    <main className="h-screen overflow-hidden overflow-y-clip  ">
      {/* <Header /> */}
      <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/old-home" element={<Home />} />
        <Route path="/" element={<HomeNew />} />
      </Routes>
    </main>
  )
}

export default App
