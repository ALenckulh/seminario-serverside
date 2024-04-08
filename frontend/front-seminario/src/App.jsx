import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Edit from './Pages/Edit'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/Edit" element={<Edit />} />
      </Routes>
    </Router>
  )
}

export default App
